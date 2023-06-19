<?php

namespace App\MyDefined\Repository\SuperMarket;

use App\MyDefined\ValueObject\General\DateValueObject;

interface GetRepoInterface{
    public function getBizlogi(DateValueObject $DateVO);
    public function getNumberOfChecking(DateValueObject $DateVO);
    public function getCheckItem(DateValueObject $DateVO);
    public function getExistanceOfInquiryNo(DateValueObject $DateVO);
}
?>