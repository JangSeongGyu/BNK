<?php

namespace App\MyDefined\ValueObject\General;
use App\MyDefined\ValueObject\ValueObject;

use App\Exceptions\InvalidValueErrorResponseException;

class DateValueObject extends ValueObject
{
    private function __construct()
    {

    }
    /**
     * @param string $date
     */
    public static function create(string $date): DateValueObject
    {
        $instance = new DateValueObject();
        $instance->value = $instance->validate($date);
        return $instance;
    }

    private function validate(string $date)
    {
        if(!preg_match('/[0-9]{4}[-\/][0-9]{2}[-\/][0-9]{2}/', $date)){
            throw new InvalidValueErrorResponseException('日付: ' . $date);
        }
        else{
            // ハイフンに統一
            $date = str_replace('/', '-', $date);
        }

        list($year, $month, $day) = explode('-', $date);
        if(!checkdate($month, $day, $year)){
            throw new InvalidValueErrorResponseException('日付: ' . $date);
        }
        return $date;
    }

}
?>