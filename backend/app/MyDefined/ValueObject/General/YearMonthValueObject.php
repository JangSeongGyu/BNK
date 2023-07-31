<?php

namespace App\MyDefined\ValueObject\General;
use App\MyDefined\ValueObject\ValueObject;

use App\Exceptions\InvalidValueErrorResponseException;

class YearMonthValueObject extends ValueObject
{
    public $startDate;
    public $endDate;

    private function __construct()
    {

    }
    
    /**
     * @param string $yearMonth
     */
    public static function create(string $yearMonth): YearMonthValueObject
    {
        $instance = new YearMonthValueObject();
        $instance->value = $instance->validate($yearMonth);
        $instance->startDate = date('Y-m-d',strtotime($instance->value .' first day of this month'));
        $instance->endDate = date('Y-m-d',strtotime($instance->value .' last day of this month'));
        return $instance;
    }

    private function validate(string $yearMonth)
    {
        if(!preg_match('/^[0-9]{4}[-\/][0-9]{2}$/', $yearMonth)){
            throw new InvalidValueErrorResponseException('年月: ' . $yearMonth);
        }
        else{
            // ハイフンに統一
            $yearMonth = str_replace('/', '-', $yearMonth);
        }

        list($year, $month) = explode('-', $yearMonth);
        if(!checkdate($month, 1, $year)){
            throw new InvalidValueErrorResponseException('年月: ' . $yearMonth);
        }
        return $yearMonth;
    }

}
?>