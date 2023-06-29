<?php

namespace App\MyDefined\Repository\SuperMarket;

use App\MyDefined\ValueObject\General\DateValueObject;
use App\MyDefined\ValueObject\General\YearMonthValueObject;
use App\MyDefined\ValueObject\SuperMarket\CheckInquiryNoValueObject;

interface GetRepoInterface{
    public function getBizlogi(DateValueObject $DateVO);
    public function getAllDataByShipmentDate(DateValueObject $DateVO);
    public function getCheckingProgress1st(DateValueObject $DateVO);
    public function getCheckingItem(DateValueObject $DateVO, CheckInquiryNoValueObject $InquiryNoVO);
    public function getCheckingProgress2nd(DateValueObject $DateVO);
    public function getMonthlyNumber();
    public function getAllDataByMonth(YearMonthValueObject $YearMonthVO);
    public function getAllData();

}
?>