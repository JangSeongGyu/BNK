<?php

namespace App\MyDefined\ValueObject\General;
use App\MyDefined\ValueObject\ValueObject;

use App\Exceptions\InvalidValueErrorResponseException;

class OrderNoValueObject extends ValueObject
{
    /**
     * @param string $orderNo
     */
    public static function create(string $orderNo): OrderNoValueObject
    {
        $instance = new OrderNoValueObject();
        $instance->validate($orderNo);
        $instance->value = $orderNo;
        return $instance;
    }

    private function validate(string $orderNo)
    {
        if(!preg_match('B[0-9]{8}', $orderNo)){
            throw new InvalidValueErrorResponseException('受注番号: ' . $orderNo);
        }
        return;
    }

}
?>