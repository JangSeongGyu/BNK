<?php

namespace App\MyDefined\Repository\SuperMarket;

use App\MyDefined\ValueObject\General\DateValueObject;

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
}
?>