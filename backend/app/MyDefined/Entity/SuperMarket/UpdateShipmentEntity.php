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
        $selfEntity = new self();
        $selfEntity->shipmentDate = $DateVO->value;
        return $selfEntity;
    }
}
?>