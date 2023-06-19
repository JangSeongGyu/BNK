<?php

namespace App\MyDefined\Entity\General;

final class UserEntity{
    public $name;
    public $ip;

    private function __construct()
    {

    }

    public static function reconstructFromUseCase(): UserEntity 
    {
        $UserEntity = new self();
        $UserEntity->name = gethostname();
        $UserEntity->ip = $_SERVER["REMOTE_ADDR"];
        return $UserEntity;
    }

}
?>