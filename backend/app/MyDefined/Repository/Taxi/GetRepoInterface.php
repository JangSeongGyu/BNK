<?php

namespace App\MyDefined\Repository\Taxi;

use App\MyDefined\ValueObject\General\DateValueObject;
use App\MyDefined\ValueObject\General\YearMonthValueObject;
use App\MyDefined\ValueObject\Taxi\CheckInquiryNoValueObject;

interface GetRepoInterface{
    public function getBacklogData();
    public function getBizlogi(DateValueObject $DateVO);
    public function getAllDataByShipmentDate(DateValueObject $DateVO);
    public function getAllDataByBetween(DateValueObject $StartDateVO, DateValueObject $EndDateVO);
    public function getCheckingProgress1st(DateValueObject $DateVO);
    public function getCheckingProgress2nd(DateValueObject $DateVO);
    public function getMonthlyNumber();
    public function getAllDataByMonth(YearMonthValueObject $YearMonthVO);
    public function getAllData();
}
?>