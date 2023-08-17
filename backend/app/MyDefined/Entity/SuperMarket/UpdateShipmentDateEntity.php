<?php

namespace App\MyDefined\Entity\SuperMarket;

use App\MyDefined\ValueObject\General\DateValueObject;

use App\Exceptions\ConflictErrorResponseException;
use Illuminate\Support\Collection;

final class UpdateShipmentDateEntity{
    public $shipmentDate;
    public $changeShipmentDate;

    private function __construct()
    {

    }

    public static function reconstructFromUseCase(Collection $currentData, DateValueObject $DateVO, DateValueObject $ChangeDateVO): UpdateShipmentDateEntity 
    {
        $selfEntity = new self();
        $selfEntity->validate($currentData);
        $selfEntity->shipmentDate = $DateVO->value;
        $selfEntity->changeShipmentDate = $ChangeDateVO->value;
        return $selfEntity;
    }

    private function validate($currentData)
    {
        foreach($currentData as $key => $record){
            if($currentData[$key]->出荷指示フラグ == 1){
                throw new ConflictErrorResponseException();
            }
        }
        return;
    }
}
?>