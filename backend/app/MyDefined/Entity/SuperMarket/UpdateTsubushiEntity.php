<?php

namespace App\MyDefined\Entity\SuperMarket;

use App\MyDefined\ValueObject\General\DateValueObject;

final class UpdateTsubushiEntity{
    public $shipmentDate;

    private function __construct()
    {

    }

    public static function reconstructFromUseCase(DateValueObject $DateVO): UpdateTsubushiEntity 
    {
        $selfEntity = new self();
        $selfEntity->shipmentDate = $DateVO->value;
        return $selfEntity;
    }
}
?>