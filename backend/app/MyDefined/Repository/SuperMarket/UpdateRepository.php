<?php

namespace App\MyDefined\Repository\SuperMarket;

use App\MyDefined\Entity\General\UserEntity;
use App\MyDefined\Entity\SuperMarket\UpdateShipmentEntity;
use App\MyDefined\Entity\SuperMarket\UpdateShipmentDateEntity;
use App\MyDefined\Entity\SuperMarket\UpdateInquiryNoEntity;
use App\MyDefined\Entity\SuperMarket\UpdateTsubushiEntity;
use App\MyDefined\Entity\SuperMarket\UpdateFirstPackingEntity;
use App\MyDefined\Entity\SuperMarket\UpdateSecondPackingEntity;

use Illuminate\Support\Facades\DB;
use PDO;

use App\Exceptions\RoutingResponseExceptions;

final class UpdateRepository implements UpdateRepoInterface{
    public function updateShipment(UserEntity $UserEntity, UpdateShipmentEntity $ShipmentEntity){
        $pdo = DB::connection('supermarket')->getpdo();

        // 指定出荷日でUpdate
        $transaction = $pdo->prepare("{CALL dbo.sp_UpdateShipment(?,?,?,?,?,?)}"); 
        $transaction->bindParam(1, $msgCD, PDO::PARAM_STR|PDO::PARAM_INPUT_OUTPUT, 50);
        $transaction->bindParam(2, $msgParam1, PDO::PARAM_STR|PDO::PARAM_INPUT_OUTPUT, 2500);
        $transaction->bindParam(3, $msgParam2, PDO::PARAM_STR|PDO::PARAM_INPUT_OUTPUT, 2500);
        $transaction->bindParam(4, $msgParam3, PDO::PARAM_STR|PDO::PARAM_INPUT_OUTPUT, 2500);
        $transaction->bindParam(5, $UserEntity->name, PDO::PARAM_STR);
        $transaction->bindParam(6, $ShipmentEntity->shipmentDate, PDO::PARAM_STR);
        $transaction->execute();
        
        if($msgCD !== null){
            RoutingResponseExceptions::Routing($msgCD, $msgParam1 . $msgParam2 . $msgParam3);
        }

        return;  
    }

    public function updateShipmentDate(UserEntity $UserEntity, UpdateShipmentDateEntity $ShipmentDateEntity)
    {
        $pdo = DB::connection('supermarket')->getpdo();

        // 指定出荷日でUpdate
        $transaction = $pdo->prepare("{CALL dbo.sp_UpdateShipmentDate(?,?,?,?,?,?,?)}"); 
        $transaction->bindParam(1, $msgCD, PDO::PARAM_STR|PDO::PARAM_INPUT_OUTPUT, 50);
        $transaction->bindParam(2, $msgParam1, PDO::PARAM_STR|PDO::PARAM_INPUT_OUTPUT, 1000);
        $transaction->bindParam(3, $msgParam2, PDO::PARAM_STR|PDO::PARAM_INPUT_OUTPUT, 1000);
        $transaction->bindParam(4, $msgParam3, PDO::PARAM_STR|PDO::PARAM_INPUT_OUTPUT, 1000);
        $transaction->bindParam(5, $UserEntity->name, PDO::PARAM_STR);
        $transaction->bindParam(6, $ShipmentDateEntity->shipmentDate, PDO::PARAM_STR);
        $transaction->bindParam(7, $ShipmentDateEntity->changeShipmentDate, PDO::PARAM_STR);
        $transaction->execute();
        
        if($msgCD !== null){
            RoutingResponseExceptions::Routing($msgCD, $msgParam1 . $msgParam2 . $msgParam3);
        }

        return;
    }
    
    public function updateInquiryNo(UserEntity $UserEntity, UpdateInquiryNoEntity $InquiryNoEntity){

        $pdo = DB::connection('supermarket')->getpdo();

        // 指定出荷日でUpdate
        $transaction = $pdo->prepare("{CALL dbo.sp_UpdateInquiryNo(?,?,?,?,?,?,?,?)}"); 
        $transaction->bindParam(1, $msgCD, PDO::PARAM_STR|PDO::PARAM_INPUT_OUTPUT, 50);
        $transaction->bindParam(2, $msgParam1, PDO::PARAM_STR|PDO::PARAM_INPUT_OUTPUT, 2500);
        $transaction->bindParam(3, $msgParam2, PDO::PARAM_STR|PDO::PARAM_INPUT_OUTPUT, 2500);
        $transaction->bindParam(4, $msgParam3, PDO::PARAM_STR|PDO::PARAM_INPUT_OUTPUT, 2500);
        $transaction->bindParam(5, $UserEntity->name, PDO::PARAM_STR);
        $transaction->bindParam(6, $InquiryNoEntity->shipmentDate, PDO::PARAM_STR);
        $transaction->bindParam(7, $InquiryNoEntity->shipmentNo, PDO::PARAM_STR);
        $transaction->bindParam(8, $InquiryNoEntity->inquiryNo, PDO::PARAM_STR);
        $transaction->execute();
        
        if($msgCD !== null){
            RoutingResponseExceptions::Routing($msgCD, $msgParam1 . $msgParam2 . $msgParam3);
        }

        return;  
    }

    public function updateTsubushi(UserEntity $UserEntity, UpdateTsubushiEntity $TsubushiEntity){
        $pdo = DB::connection('supermarket')->getpdo();

        // 指定出荷日でUpdate
        $transaction = $pdo->prepare("{CALL dbo.sp_UpdateTsubushi(?,?,?,?,?,?)}"); 
        $transaction->bindParam(1, $msgCD, PDO::PARAM_STR|PDO::PARAM_INPUT_OUTPUT, 50);
        $transaction->bindParam(2, $msgParam1, PDO::PARAM_STR|PDO::PARAM_INPUT_OUTPUT, 2500);
        $transaction->bindParam(3, $msgParam2, PDO::PARAM_STR|PDO::PARAM_INPUT_OUTPUT, 2500);
        $transaction->bindParam(4, $msgParam3, PDO::PARAM_STR|PDO::PARAM_INPUT_OUTPUT, 2500);
        $transaction->bindParam(5, $UserEntity->name, PDO::PARAM_STR);
        $transaction->bindParam(6, $TsubushiEntity->shipmentDate, PDO::PARAM_STR);
        $transaction->execute();
        
        if($msgCD !== null){
            RoutingResponseExceptions::Routing($msgCD, $msgParam1 . $msgParam2 . $msgParam3);
        }

        return;  
    }

    public function updateFirstPacking(UserEntity $UserEntity, UpdateFirstPackingEntity $FirstPackingEntity){
        $pdo = DB::connection('supermarket')->getpdo();


        
        // 指定出荷日でUpdate
        $transaction = $pdo->prepare("{CALL dbo.sp_UpdateFirstPacking(?,?,?,?,?,?,?)}"); 
        $transaction->bindParam(1, $msgCD, PDO::PARAM_STR|PDO::PARAM_INPUT_OUTPUT, 50);
        $transaction->bindParam(2, $msgParam1, PDO::PARAM_STR|PDO::PARAM_INPUT_OUTPUT, 2500);
        $transaction->bindParam(3, $msgParam2, PDO::PARAM_STR|PDO::PARAM_INPUT_OUTPUT, 2500);
        $transaction->bindParam(4, $msgParam3, PDO::PARAM_STR|PDO::PARAM_INPUT_OUTPUT, 2500);
        $transaction->bindParam(5, $UserEntity->name, PDO::PARAM_STR);
        $transaction->bindParam(6, $FirstPackingEntity->shipmentDate, PDO::PARAM_STR);
        $transaction->bindParam(7, $FirstPackingEntity->inputBarcode, PDO::PARAM_STR);
        $transaction->execute();
        
        if($msgCD !== null){
            RoutingResponseExceptions::Routing($msgCD, $msgParam1 . $msgParam2 . $msgParam3);
        }

        return;  
    }

    public function updateSecondPacking(UserEntity $UserEntity, UpdateSecondPackingEntity $SecondPackingEntity){
        $pdo = DB::connection('supermarket')->getpdo();

        // 指定出荷日でUpdate
        $transaction = $pdo->prepare("{CALL dbo.sp_UpdateSecondPacking(?,?,?,?,?,?,?)}"); 
        $transaction->bindParam(1, $msgCD, PDO::PARAM_STR|PDO::PARAM_INPUT_OUTPUT, 50);
        $transaction->bindParam(2, $msgParam1, PDO::PARAM_STR|PDO::PARAM_INPUT_OUTPUT, 2500);
        $transaction->bindParam(3, $msgParam2, PDO::PARAM_STR|PDO::PARAM_INPUT_OUTPUT, 2500);
        $transaction->bindParam(4, $msgParam3, PDO::PARAM_STR|PDO::PARAM_INPUT_OUTPUT, 2500);
        $transaction->bindParam(5, $UserEntity->name, PDO::PARAM_STR);
        $transaction->bindParam(6, $SecondPackingEntity->shipmentDate, PDO::PARAM_STR);
        $transaction->bindParam(7, $SecondPackingEntity->inputBarcode, PDO::PARAM_STR);
        $transaction->execute();
        
        if($msgCD !== null){
            RoutingResponseExceptions::Routing($msgCD, $msgParam1 . $msgParam2 . $msgParam3);
        }

        return;  
    }
}
?>