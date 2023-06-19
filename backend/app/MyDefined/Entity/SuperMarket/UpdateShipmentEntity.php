<?php

namespace App\MyDefined\Entity\SuperMarket;

use App\MyDefined\ValueObject\General\DateValueObject;

final class UpdateShipmentEntity{
    public $shipmentDate;

    private function __construct()
    {

    }

    public static function reconstructFromUseCase(DateValueObject $DateVO): UpdateShipmentEntity 
    {
        $ShipmentEntity = new self();
        $ShipmentEntity->shipmentDate = $DateVO->value;
        return $ShipmentEntity;
    }
}
?>