<?php

namespace App\MyDefined\Entity\Taxi;

use App\MyDefined\ValueObject\General\DateValueObject;
use App\MyDefined\ValueObject\Taxi\CheckInquiryNoValueObject;

final class UpdateFirstPackingEntity{
    public $shipmentDate;
    public $inputBarcode;


    private function __construct()
    {

    }

    public static function reconstructFromUseCase(DateValueObject $DateVO, CheckInquiryNoValueObject $InquiryNoVO): UpdateFirstPackingEntity 
    {
        $FirstPackingEntity = new self();
        $FirstPackingEntity->shipmentDate = $DateVO->value;
        $FirstPackingEntity->inputBarcode = $InquiryNoVO->value;
        return $FirstPackingEntity;
    }
}
?>