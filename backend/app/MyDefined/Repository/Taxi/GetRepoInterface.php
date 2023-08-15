<?php

namespace App\MyDefined\Repository\Taxi;

use App\MyDefined\ValueObject\General\DateValueObject;
use App\MyDefined\ValueObject\General\YearMonthValueObject;
use App\MyDefined\ValueObject\Taxi\CheckInquiryNoValueObject;
use App\MyDefined\ValueObject\Taxi\CheckingTypeValueObject;
use App\MyDefined\Entity\Taxi\GetQRDataEntity;
use App\MyDefined\Entity\Taxi\GetJOBTicketEntity;
use App\MyDefined\Entity\Taxi\GetTotalPickEntity;
use App\MyDefined\Entity\Taxi\GetAllDataByInquiryNoEntity;
use App\MyDefined\Entity\Taxi\PostTeamsWebhookEntity;
use App\MyDefined\Entity\Taxi\PostTeamsWebhookMentionerEntity;

interface GetRepoInterface{
    public function getOrderData();
    public function getShipmentCountByBetween(DateValueObject $StartDateVO, DateValueObject $EndDateVO);
    public function getBacklogData();
    public function getBizlogi(DateValueObject $DateVO);
    public function getQRData(DateValueObject $DateVO): GetQRDataEntity;
    public function getJOBTicket(DateValueObject $DateVO): GetJOBTicketEntity;
    public function getTotalPick(DateValueObject $DateVO): GetTotalPickEntity;
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