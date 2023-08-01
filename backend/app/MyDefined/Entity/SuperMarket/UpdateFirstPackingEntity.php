<?php

namespace App\MyDefined\Entity\SuperMarket;

use App\MyDefined\ValueObject\General\DateValueObject;
use App\MyDefined\ValueObject\SuperMarket\CheckInquiryNoValueObject;

final class UpdateFirstPackingEntity{
    public $shipmentDate;
    public $inputBarcode;


    private function __construct()
    {

    }

    public static function reconstructFromUseCase(DateValueObject $DateVO, CheckInquiryNoValueObject $InquiryNoVO): UpdateFirstPackingEntity 
    {
        $selfEntity = new self();
        $selfEntity->shipmentDate = $DateVO->value;
        $selfEntity->inputBarcode = $InquiryNoVO->value;
        return $selfEntity;
    }
}
?>