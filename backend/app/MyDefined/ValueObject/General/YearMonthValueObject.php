<?php

namespace App\MyDefined\ValueObject\General;
use App\MyDefined\ValueObject\ValueObject;

use App\Exceptions\InvalidValueErrorResponseException;

class YearMonthValueObject extends ValueObject
{
    /**
     * @param string $yearMonth
     */
    public static function create(string $yearMonth): YearMonthValueObject
    {
        $instance = new YearMonthValueObject();
        $instance->validate($yearMonth);
        $instance->value = $yearMonth;
        return $instance;
    }

    public function validate(string $yearMonth)
    {
        if(!preg_match('[0-9]{4}[-/][0-9]{2}', $yearMonth)){
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
        return;
    }

}
?>