<?php

namespace App\MyDefined\Repository\SuperMarket;

use App\MyDefined\Entity\General\UserEntity;
use App\MyDefined\Entity\SuperMarket\CreateMonthlyNumberEntity;

interface CreateRepoInterface{
    public function createOrderData(UserEntity $UserEntity);
    public function createMonthlyNumber(UserEntity $UserEntity, CreateMonthlyNumberEntity $MonthlyNumberEntity);
}
?>