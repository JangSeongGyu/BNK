<?php

namespace App\MyDefined\Entity\Taxi;

use App\MyDefined\ValueObject\General\SagawaInquiryNoValueObject;
use App\MyDefined\ValueObject\Taxi\ShipmentNoValueObject;
use App\MyDefined\ValueObject\General\DateValueObject;

final class UpdateInquiryNoEntity{
    public $inquiryNo;
    public $shipmentNo;
    public $shipmentDate;

    private function __construct()
    {

    }

    public static function reconstructFromUseCase(
        SagawaInquiryNoValueObject $SagawaInquiryNoVO,
        ShipmentNoValueObject $ShipmentNoVO,
        DateValueObject $DateVO
    ): UpdateInquiryNoEntity 
    {
        $selfEntity = new self();
        $selfEntity->inquiryNo = $SagawaInquiryNoVO->value;
        $selfEntity->shipmentNo = $ShipmentNoVO->value;
        $selfEntity->shipmentDate = $DateVO->value;
        return $selfEntity;
    }
}
?>