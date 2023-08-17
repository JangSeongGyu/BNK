<?php

namespace App\MyDefined\Repository\Taxi;

use App\MyDefined\Entity\General\UserEntity;
use App\MyDefined\Entity\Taxi\UpdateShipmentEntity;
use App\MyDefined\Entity\Taxi\UpdateShipmentDateEntity;
use App\MyDefined\Entity\Taxi\UpdateInquiryNoEntity;
use App\MyDefined\Entity\Taxi\UpdateTsubushiEntity;
use App\MyDefined\Entity\Taxi\UpdateFirstPackingEntity;

interface UpdateRepoInterface{
    public function updateShipment(UserEntity $UserEntity, UpdateShipmentEntity $ShipmnetEntity);
    public function updateShipmentDate(UserEntity $UserEntity, UpdateShipmentDateEntity $ShipmentDateEntity);
    public function updateInquiryNo(UserEntity $UserEntity, UpdateInquiryNoEntity $InquiryNoEntity);
    public function updateTsubushi(UserEntity $UserEntity, UpdateTsubushiEntity $TsubushiEntity);
    public function updateFirstPacking(UserEntity $UserEntity, UpdateFirstPackingEntity $SecondPackingEntity);
}
?>