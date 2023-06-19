<?php

namespace App\MyDefined\Repository\SuperMarket;

use App\MyDefined\Entity\General\UserEntity;
use App\MyDefined\Entity\SuperMarket\CreateMonthlyNumberEntity;

use Illuminate\Support\Facades\DB;
use PDO;

use App\Exceptions\RoutingResponseExceptions;

final class CreateRepository implements CreateRepoInterface{

    public function createOrderData(UserEntity $UserEntity){
        $pdo = DB::connection('supermarket')->getpdo();

        // 月次番号を登録
        $transaction = $pdo->prepare("{CALL dbo.sp_CreateOrderData(?,?,?,?,?)}"); 
        $transaction->bindParam(1, $msgCD, PDO::PARAM_STR|PDO::PARAM_INPUT_OUTPUT, 50);
        $transaction->bindParam(2, $msgParam1, PDO::PARAM_STR|PDO::PARAM_INPUT_OUTPUT, 2500);
        $transaction->bindParam(3, $msgParam2, PDO::PARAM_STR|PDO::PARAM_INPUT_OUTPUT, 2500);
        $transaction->bindParam(4, $msgParam3, PDO::PARAM_STR|PDO::PARAM_INPUT_OUTPUT, 2500);
        $transaction->bindParam(5, $UserEntity->name, PDO::PARAM_STR);
        $transaction->execute();

        if(!$msgCD){
            RoutingResponseExceptions::Routing($msgCD, $msgParam1 . $msgParam2 . $msgParam3);
        }

        return;  
    }

    public function createMonthlyNumber(UserEntity $UserEntity, CreateMonthlyNumberEntity $MonthlyNumberEntity)
    {
        return;
    }
}
?>