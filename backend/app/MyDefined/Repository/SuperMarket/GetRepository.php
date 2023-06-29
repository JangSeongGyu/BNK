<?php

namespace App\MyDefined\Repository\SuperMarket;

use App\MyDefined\ValueObject\General\DateValueObject;
use App\MyDefined\ValueObject\SuperMarket\CheckInquiryNoValueObject;
use App\MyDefined\ValueObject\General\YearMonthValueObject;

use App\Exceptions\NotExistsErrorResponseException;

use Illuminate\Support\Facades\DB;
use PDO;

final class GetRepository implements GetRepoInterface{

    public function getBizlogi(DateValueObject $DateVO)
    {
        $rows = DB::connection('supermarket')->select("EXEC dbo.sp_GetBizlogi '$DateVO->value'"); 
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
        ->where('出荷日', '=', $DateVO->value); 
        if($rows == []){
            throw new NotExistsErrorResponseException();
        }
        return $rows;
    }

    public function getCheckingProgress1st(DateValueObject $DateVO)
    {
        $rows = DB::connection('supermarket')->select("EXEC dbo.sp_GetCheckingProgress1st '$DateVO->value'"); 
        if($rows == []){
            throw new NotExistsErrorResponseException();
        }
        return $rows;
    }

    public function getCheckingItem(DateValueObject $DateVO, CheckInquiryNoValueObject $InquiryNoVO)
    {
        $rows = DB::connection('supermarket')->select("EXEC dbo.sp_GetCheckingItem '$DateVO->value' '$InquiryNoVO->value'"); 
        if($rows == []){
            throw new NotExistsErrorResponseException();
        }
        return $rows;
    }

    public function getCheckingProgress2nd(DateValueObject $DateVO)
    {
        $rows = DB::connection('supermarket')->select("EXEC dbo.sp_GetCheckingProgress2nd '$DateVO->value'"); 
        if($rows == []){
            throw new NotExistsErrorResponseException();
        }
        return $rows;
    }

    public function getMonthlyNumber()
    {
        $rows = DB::connection('supermarket')
        ->table('TM_月次番号')
        ->select("*"); 

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
        ->whereBetween('納品予定日', [$YearMonthVO->startDate, $YearMonthVO->endDate]);
        if($rows == []){
            throw new NotExistsErrorResponseException();
        }
        return $rows;
    }
    
    public function getAllData()
    {
        $rows = DB::connection('supermarket')
        ->table('TT_出荷指示')
        ->select("*");
        if($rows == []){
            throw new NotExistsErrorResponseException();
        }
        return $rows;
    }
}
?>