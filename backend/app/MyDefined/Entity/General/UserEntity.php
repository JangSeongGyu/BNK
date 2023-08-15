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
        $selfEntity = new self();
        $selfEntity->name = gethostname();
        $selfEntity->ip = $_SERVER["REMOTE_ADDR"];
        return $selfEntity;
    }

}
?>