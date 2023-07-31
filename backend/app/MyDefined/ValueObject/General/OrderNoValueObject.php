<?php

namespace App\MyDefined\ValueObject\General;
use App\MyDefined\ValueObject\ValueObject;

use App\Exceptions\InvalidValueErrorResponseException;

class OrderNoValueObject extends ValueObject
{
    private function __construct()
    {

    }
    /**
     * @param string $orderNo
     */
    public static function create(string $orderNo): OrderNoValueObject
    {
        $instance = new OrderNoValueObject();
        $instance->value = $instance->validate($orderNo);
        return $instance;
    }

    private function validate(string $orderNo)
    {
        if(!preg_match('/^B[0-9]{8}$/', $orderNo)){
            throw new InvalidValueErrorResponseException('受注番号: ' . $orderNo);
        }
        return $orderNo;
    }

}
?>