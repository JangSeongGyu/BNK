<?php

namespace App\MyDefined\Entity\Taxi;

use App\MyDefined\ValueObject\General\DateValueObject;
use App\MyDefined\ValueObject\Taxi\PouchTypeValueObject;

final class UpdateShipmentEntity{
    public $shipmentDate;
    public $pouch;

    private function __construct()
    {

    }

    public static function reconstructFromUseCase(DateValueObject $DateVO, PouchTypeValueObject $PouchTypeVO): UpdateShipmentEntity 
    {
        $selfEntity = new self();
        $selfEntity->shipmentDate = $DateVO->value;
        $selfEntity->pouch = $PouchTypeVO->value;
        return $selfEntity;
    }
}
?>