<?php

namespace App\MyDefined\Repository\Taxi;

use App\MyDefined\ValueObject\General\DateValueObject;
use App\MyDefined\ValueObject\Taxi\CheckInquiryNoValueObject;
use App\MyDefined\ValueObject\General\YearMonthValueObject;
use App\MyDefined\ValueObject\Taxi\CheckingTypeValueObject;

use App\MyDefined\Entity\Taxi\GetAllDataByInquiryNoEntity;
use App\MyDefined\Entity\Taxi\GetQRDataEntity;
use App\MyDefined\Entity\Taxi\GetJOBTicketEntity;
use App\MyDefined\Entity\Taxi\GetTotalPickEntity;
use App\MyDefined\Entity\Taxi\PostTeamsWebhookEntity;
use App\MyDefined\Entity\Taxi\PostTeamsWebhookMentionerEntity;

use App\Exceptions\NotExistsErrorResponseException;
use Illuminate\Support\Facades\DB;

final class GetRepository implements GetRepoInterface{
    public function getOrderData()
    {
        $rows = DB::connection('taxi')
        ->table('VT_SFOrder')
        ->select("*")
        ->get();
        if($rows == '[]'){
            throw new NotExistsErrorResponseException();
        }
        return $rows;
    }

    public function getShipmentCountByBetween(DateValueObject $StartDateVO, DateValueObject $EndDateVO)
    {
        $rows = DB::connection('taxi')
        ->table('TT_出荷指示')
        ->select('出荷日')
        ->selectRaw('COUNT(*) AS 件数')
        ->whereBetween('出荷日', [$StartDateVO->value, $EndDateVO->value])
        ->groupBy('出荷日')
        ->get();
        if($rows == '[]'){
            throw new NotExistsErrorResponseException();
        }
        return $rows;
    }

    public function getBacklogData()
    {
        $rows = DB::connection('taxi')
        ->table('VT_未処理件数')
        ->select("*")
        ->get();
        if($rows == '[]'){
            throw new NotExistsErrorResponseException();
        }
        return $rows;
    }

    public function getBizlogi(DateValueObject $DateVO)
    {
        $rows = DB::connection('taxi')
        ->select("EXEC dbo.sp_GetBizlogi '$DateVO->value'"); 
        if(!$rows){
            throw new NotExistsErrorResponseException();
        }
        return $rows;
    }

    public function getQRData(DateValueObject $DateVO): GetQRDataEntity
    {
        $rows = DB::connection('taxi')
        ->table('TT_出荷指示')
        ->select("*")
        ->where('出荷日', '=', $DateVO->value)
        ->get();
        if($rows == '[]'){
            throw new NotExistsErrorResponseException();
        }

        return GetQRDataEntity::reconstructViewWKFromRepository($rows);
    }

    public function getJOBTicket(DateValueObject $DateVO): GetJOBTicketEntity
    {
        $rows = DB::connection('taxi')
        ->table('TT_出荷指示')
        ->select("*")
        ->where('出荷日', '=', $DateVO->value)
        ->get();
        if($rows == '[]'){
            throw new NotExistsErrorResponseException();
        }

        return GetJOBTicketEntity::reconstructViewWKFromRepository($rows);
    }

    public function getTotalPick(DateValueObject $DateVO): GetTotalPickEntity
    {
        $rows = DB::connection('taxi')
        ->table('TT_出荷指示')
        ->select("*")
        ->where('出荷日', '=', $DateVO->value)
        ->get();
        if($rows == '[]'){
            throw new NotExistsErrorResponseException();
        }

        return GetTotalPickEntity::reconstructViewWKFromRepository($rows);
    }

    public function getAllDataByShipmentDate(DateValueObject $DateVO)
    {
        $rows = DB::connection('taxi')
        ->table('TT_出荷指示')
        ->select("*")
        ->where('出荷日', '=', $DateVO->value)
        ->get();
        if($rows == '[]'){
            throw new NotExistsErrorResponseException();
        }
        return $rows;
    }

    public function getAllDataByBetween(DateValueObject $StartDateVO, DateValueObject $EndDateVO)
    {
        $rows = DB::connection('taxi')
        ->table('TT_出荷指示')
        ->select("*")
        ->whereBetween('出荷日', [$StartDateVO->value, $EndDateVO->value])
        ->get();
        if($rows == '[]'){
            throw new NotExistsErrorResponseException();
        }
        return $rows;
    }

    public function getAllDataByInquiryNo(
        DateValueObject $DateVO
        , CheckInquiryNoValueObject $InquiryNoVO
        , CheckingTypeValueObject $checkingTypeVO
    ): GetAllDataByInquiryNoEntity
    {
        $rows = DB::connection('taxi')
        ->table('TT_出荷指示')
        ->select("*")
        ->where('出荷日', '=', $DateVO->value)
        ->where('問い合わせ番号', '=', $InquiryNoVO->inquiryNo)
        ->where('同梱連番', '=', $InquiryNoVO->includeNo)
        ->get();
        if($rows == '[]'){
            throw new NotExistsErrorResponseException();
        }
        return GetAllDataByInquiryNoEntity::reconstructViewWKFromRepository($rows, $checkingTypeVO);
    }

    public function getMonthlyNumber()
    {
        $rows = DB::connection('taxi')
        ->table('TM_月次番号')
        ->select("*")
        ->get();
        if($rows == '[]'){
            throw new NotExistsErrorResponseException();
        }
        return $rows;
    }

    public function getAllDataByMonth(YearMonthValueObject $YearMonthVO)
    {
        $rows = DB::connection('taxi')
        ->table('TT_出荷指示')
        ->select("*")
        ->whereBetween('納品予定日', [$YearMonthVO->startDate, $YearMonthVO->endDate])
        ->get();
        if($rows == '[]'){
            throw new NotExistsErrorResponseException();
        }
        return $rows;
    }
    
    public function getAllData()
    {
        $rows = DB::connection('taxi')
        ->table('TT_出荷指示')
        ->select("*")
        ->get();
        if($rows == '[]'){
            throw new NotExistsErrorResponseException();
        }
        return $rows;
    }

    public function getWebhook(string $webhookCategory): PostTeamsWebhookEntity
    {
        $rows = DB::connection('taxi')
        ->table('TM_Webhook')
        ->select("*")
        ->where('カテゴリ', '=', $webhookCategory)
        ->get();
        if($rows == '[]'){
            throw new NotExistsErrorResponseException();
        }
        return PostTeamsWebhookEntity::reconstructFromRepository($rows);
    }

    public function getWebhookMentioner(string $webhookCategory): PostTeamsWebhookMentionerEntity
    {
        $rows = DB::connection('taxi')
        ->table('TM_Webhookメンション')
        ->select("*")
        ->where('カテゴリ', '=', $webhookCategory)
        ->get();
        if($rows == '[]'){
            throw new NotExistsErrorResponseException();
        }
        return PostTeamsWebhookMentionerEntity::reconstructFromRepository($rows);
    }
}
?>