<?php

namespace App\MyDefined\Beauty\Entity;

use App\MyDefined\Beauty\ValueObject\WKOrdersValueObject;

final class WKOrdersEntity{
    public $rb_uniqueID;
    public $rb_shopID;
    public $rb_memberID;
    public $rb_shopType;
    public $rb_applyDate;
    public $shopName;
    public $shopZip;
    public $prefecture;
    public $city;
    public $address;
    public $building;
    public $privateAddress;
    public $shopApplicant;
    public $shopPhone;

    private function __constract()
    {

    }

    public static function reconstructPutWKOrdersFromUseCase(WKOrdersValueObject $WKOrdersVO): WKOrdersEntity 
    {
        $WKOrdersEntity = new self();
        foreach(get_object_vars($WKOrdersVO) as $key => $value){
            $WKOrdersEntity->$key = $value;
        }
        return $WKOrdersEntity;
    }

    public static function reconstructViewWKFromRepository(): WKOrdersEntity 
    {
        $WKOrdersEntity = new self();
        return $WKOrdersEntity;
    }
}
?>