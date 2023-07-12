<?php

namespace App\MyDefined\Repository\Taxi;

use App\MyDefined\Entity\General\UserEntity;
use App\MyDefined\Entity\Taxi\CreateMonthlyNumberEntity;

interface CreateRepoInterface{
    public function createOrderData(UserEntity $UserEntity);
    public function createMonthlyNumber(UserEntity $UserEntity, CreateMonthlyNumberEntity $MonthlyNumberEntity);
}
?>