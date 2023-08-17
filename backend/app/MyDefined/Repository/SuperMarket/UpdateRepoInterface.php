<?php

namespace App\MyDefined\Repository\SuperMarket;

use App\MyDefined\Entity\General\UserEntity;
use App\MyDefined\Entity\SuperMarket\UpdateShipmentEntity;
use App\MyDefined\Entity\SuperMarket\UpdateShipmentDateEntity;
use App\MyDefined\Entity\SuperMarket\UpdateInquiryNoEntity;
use App\MyDefined\Entity\SuperMarket\UpdateTsubushiEntity;
use App\MyDefined\Entity\SuperMarket\UpdateFirstPackingEntity;
use App\MyDefined\Entity\SuperMarket\UpdateSecondPackingEntity;

interface UpdateRepoInterface{
    public function updateShipment(UserEntity $UserEntity, UpdateShipmentEntity $ShipmnetEntity);
    public function updateShipmentDate(UserEntity $UserEntity, UpdateShipmentDateEntity $ShipmentDateEntity);
    public function updateInquiryNo(UserEntity $UserEntity, UpdateInquiryNoEntity $InquiryNoEntity);
    public function updateTsubushi(UserEntity $UserEntity, UpdateTsubushiEntity $TsubushiEntity);
    public function updateFirstPacking(UserEntity $UserEntity, UpdateFirstPackingEntity $SecondPackingEntity);
    public function updateSecondPacking(UserEntity $UserEntity, UpdateSecondPackingEntity $SecondPackingEntity);
}
?>