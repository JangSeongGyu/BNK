<?php

namespace App\MyDefined\Repository\SuperMarket;

use App\MyDefined\ValueObject\General\DateValueObject;
use App\MyDefined\ValueObject\SuperMarket\CheckInquiryNoValueObject;
use App\MyDefined\ValueObject\General\YearMonthValueObject;

use App\Exceptions\NotExistsErrorResponseException;

use Illuminate\Support\Facades\DB;

final class GetRepository implements GetRepoInterface{
    public function getBacklogData()
    {
        $rows = DB::connection('supermarket')
        ->table('TT_出荷指示')
        ->select("*")
        ->whereNull('出荷日')
        ->get();
        if($rows == []){
            throw new NotExistsErrorResponseException();
        }
        return $rows;
    }

    public function getBizlogi(DateValueObject $DateVO)
    {
        $rows = DB::connection('supermarket')
        ->select("EXEC dbo.sp_GetBizlogi '$DateVO->value'"); 
        if($rows == []){
            throw new NotExistsErrorResponseException();
        }
        return $rows;
    }

    public function getAllDataByShipmentDate(DateValueObject $DateVO)
    {
        $rows = DB::connection('supermarket')
        ->table('TT_出荷指示')
        ->select("*")
        ->where('出荷日', '=', $DateVO->value)
        ->get();
        if($rows == []){
            throw new NotExistsErrorResponseException();
        }
        return $rows;
    }

    public function getAllDataByBetween(DateValueObject $StartDateVO, DateValueObject $EndDateVO)
    {
        $rows = DB::connection('supermarket')
        ->table('TT_出荷指示')
        ->select("*")
        ->whereBetween('出荷日', [$StartDateVO->value, $EndDateVO->value])
        ->get();
        if($rows == []){
            throw new NotExistsErrorResponseException();
        }
        return $rows;
    }


    public function getShipmentCountByBetween(DateValueObject $StartDateVO, DateValueObject $EndDateVO)
    {
        $rows = DB::connection('supermarket')
        ->table('TT_出荷指示')
        ->select('出荷日')
        ->selectRaw('COUNT(*) AS 件数')
        ->whereBetween('出荷日', [$StartDateVO->value, $EndDateVO->value])
        ->groupBy('出荷日')
        ->get();
        if($rows == []){
            throw new NotExistsErrorResponseException();
        }
        return $rows;
    }

    public function getAllDataByInquiryNo(DateValueObject $DateVO, CheckInquiryNoValueObject $InquiryNoVO)
    {
        $rows = DB::connection('supermarket')
        ->table('TT_出荷指示')
        ->select("*")
        ->where('出荷日', '=', $DateVO->value)
        ->where('問い合わせ番号', '=', $InquiryNoVO->inquiryNo)
        ->where('同梱連番', '=', $InquiryNoVO->includeNo)
        ->get();
        if($rows == []){
            throw new NotExistsErrorResponseException();
        }
        return $rows;
    }

    public function getMonthlyNumber()
    {
        $rows = DB::connection('supermarket')
        ->table('TM_月次番号')
        ->select("*")
        ->get();
        if($rows == []){
            throw new NotExistsErrorResponseException();
        }
        return $rows;
    }

    public function getAllDataByMonth(YearMonthValueObject $YearMonthVO)
    {
        $rows = DB::connection('supermarket')
        ->table('TT_出荷指示')
        ->select("*")
        ->whereBetween('納品予定日', [$YearMonthVO->startDate, $YearMonthVO->endDate])
        ->get();
        if($rows == []){
            throw new NotExistsErrorResponseException();
        }
        return $rows;
    }
    
    public function getAllData()
    {
        $rows = DB::connection('supermarket')
        ->table('TT_出荷指示')
        ->select("*")
        ->get();
        if($rows == []){
            throw new NotExistsErrorResponseException();
        }
        return $rows;
    }
}
?>