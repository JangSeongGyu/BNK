<?php

namespace App\MyDefined\Entity\SuperMarket;

use App\MyDefined\ValueObject\General\DateValueObject;
use App\MyDefined\ValueObject\SuperMarket\CheckInquiryNoValueObject;

final class UpdateSecondPackingEntity{
    public $shipmentDate;
    public $inputBarcode;


    private function __construct()
    {

    }

    public static function reconstructFromUseCase(DateValueObject $DateVO, CheckInquiryNoValueObject $InquiryNoVO): UpdateSecondPackingEntity 
    {
        $SecondPackingEntity = new self();
        $SecondPackingEntity->shipmentDate = $DateVO->value;
        $SecondPackingEntity->inputBarcode = $InquiryNoVO->value;
        return $SecondPackingEntity;
    }
}
?>