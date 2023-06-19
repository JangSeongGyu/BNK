<?php

namespace App\MyDefined\Entity\SuperMarket;

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
        $MonthlyNumberEntity = new self();
        $MonthlyNumberEntity->yearMonth = $YearMonthVO->value;
        $MonthlyNumberEntity->orderNo = $OrderNoVO->value;
        return $MonthlyNumberEntity;
    }
}
?>