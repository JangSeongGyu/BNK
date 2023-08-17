<?php

namespace App\MyDefined\Repository\SuperMarket;

use App\MyDefined\ValueObject\General\DateValueObject;
use App\MyDefined\ValueObject\General\YearMonthValueObject;
use App\MyDefined\ValueObject\SuperMarket\CheckInquiryNoValueObject;
use App\MyDefined\ValueObject\SuperMarket\CheckingTypeValueObject;
use App\MyDefined\Entity\SuperMarket\GetAllDataByInquiryNoEntity;
use App\MyDefined\Entity\SuperMarket\PostTeamsWebhookEntity;
use App\MyDefined\Entity\SuperMarket\PostTeamsWebhookMentionerEntity;

interface GetRepoInterface{
    public function getOrderData();
    public function getShipmentCountByBetween(DateValueObject $StartDateVO, DateValueObject $EndDateVO);
    public function getBacklogData();
    public function getBizlogi(DateValueObject $DateVO);
    public function getQRData(DateValueObject $DateVO);
    public function getAllDataByShipmentDate(DateValueObject $DateVO);
    public function getAllDataByBetween(DateValueObject $StartDateVO, DateValueObject $EndDateVO);
    public function getAllDataByInquiryNo(
        DateValueObject $DateVO
        , CheckInquiryNoValueObject $InquiryNoVO
        , CheckingTypeValueObject $CheckingTypeVO
    ): GetAllDataByInquiryNoEntity;
    public function getMonthlyNumber();
    public function getAllDataByMonth(YearMonthValueObject $YearMonthVO);
    public function getAllData();
    public function getWebhook(string $webhookCategory):PostTeamsWebhookEntity;
    public function getWebhookMentioner(string $webhookCategory):PostTeamsWebhookMentionerEntity;
}
?>