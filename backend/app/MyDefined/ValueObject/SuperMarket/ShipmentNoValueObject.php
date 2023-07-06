<?php

namespace App\MyDefined\ValueObject\SuperMarket;
use App\MyDefined\ValueObject\ValueObject;

use App\Exceptions\InvalidValueErrorResponseException;

final class ShipmentNoValueObject extends ValueObject
{
    private function __construct()
    {

    }
    /**
     * @param string $shipmentNo
     */
    public static function create(string $shipmentNo): ShipmentNoValueObject
    {
        $instance = new ShipmentNoValueObject();
        $instance->value = $instance->validate($shipmentNo);
        return $instance;
    }

    private function validate(string $shipmentNo)
    {
        if(!preg_match('/SM[0-9]{8}-[0-9]{4}/', $shipmentNo)){
            throw new InvalidValueErrorResponseException('出荷番号: ' . $shipmentNo);
        }
        return;
    }
}
?>