<?php

namespace App\MyDefined\Entity\Taxi;

use App\MyDefined\ValueObject\General\DateValueObject;

final class UpdateTsubushiEntity{
    public $shipmentDate;

    private function __construct()
    {

    }

    public static function reconstructFromUseCase(DateValueObject $DateVO): UpdateTsubushiEntity 
    {
        $TsubushiEntity = new self();
        $TsubushiEntity->shipmentDate = $DateVO->value;
        return $TsubushiEntity;
    }
}
?>