<?php

namespace App\MyDefined\Entity\Taxi;

use App\MyDefined\ValueObject\General\YearMonthValueObject;
use App\MyDefined\ValueObject\General\OrderNoValueObject;

final class CreateMonthlyNumberEntity{
    public $yearMonth;
    public $orderNo;


    private function __construct()
    {

    }

    public static function reconstructFromUseCase(YearMonthValueObject $YearMonthVO, OrderNoValueObject $OrderNoVO): CreateMonthlyNumberEntity 
    {
        $selfEntity = new self();
        $selfEntity->yearMonth = $YearMonthVO->value;
        $selfEntity->orderNo = $OrderNoVO->value;
        return $selfEntity;
    }
}
?>