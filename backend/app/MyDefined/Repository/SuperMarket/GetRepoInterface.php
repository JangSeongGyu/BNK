<?php

namespace App\MyDefined\Repository\SuperMarket;

use App\MyDefined\ValueObject\General\DateValueObject;
use App\MyDefined\ValueObject\General\YearMonthValueObject;
use App\MyDefined\ValueObject\SuperMarket\CheckInquiryNoValueObject;

interface GetRepoInterface{
    public function getBacklogData();
    public function getBizlogi(DateValueObject $DateVO);
    public function getAllDataByShipmentDate(DateValueObject $DateVO);
    public function getAllDataByBetween(DateValueObject $StartDateVO, DateValueObject $EndDateVO);
    public function getShipmentCountByBetween(DateValueObject $StartDateVO, DateValueObject $EndDateVO);
    public function getAllDataByInquiryNo(DateValueObject $DateVO, CheckInquiryNoValueObject $InquiryNoVO);
    public function getMonthlyNumber();
    public function getAllDataByMonth(YearMonthValueObject $YearMonthVO);
    public function getAllData();
}
?>