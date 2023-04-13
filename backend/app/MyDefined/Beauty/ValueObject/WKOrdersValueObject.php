<?php

namespace App\MyDefined\Beauty\ValueObject;

use Illuminate\Http\Exceptions\HttpResponseException;
use Throwable;

final class WKOrdersValueObject
{
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

    private function __construct()
    {

    }

    /**
     * @param array $input
     */
    public static function create(array $input): WKOrdersValueObject
    {
        $instance = new WKOrdersValueObject();
        try{
            $instance->rb_uniqueID = $input['楽天ビューティ: ID'];
            $instance->rb_shopID = $input['【RB】店舗ID'];
            $instance->rb_memberID = $input['【RB】RB会員ID'];
            $instance->rb_shopType = $input['【RB】業種'];
            $instance->rb_applyDate = $input['【RB】申込日'];
            $instance->shopName = $input['楽天ビューティ: Shop'];
            $instance->shopZip = $input['申込者：所在地 郵便番号'];
            $instance->prefecture = $input['申込者：所在地 住所（都道府県）'];
            $instance->city = $input['申込者：所在地 住所（市区町村）'];
            $instance->address = $input['申込者：所在地 住所（丁目・番地）'];
            $instance->building = $input['申込者：所在地 住所（建物名等)'];
            $instance->privateAddress = $input['全住所:住所非公開サロン用'];
            $instance->shopApplicant = $input['申込者：サロン担当者'];
            $instance->shopPhone = $input['申込者：連絡先電話番号'];
        }
        catch(\ErrorException $e){
            throw new \Exception("CSVの列名が正しくないか、CSVの文字コードがUTF8でない可能性があります。\r\n".$e->getMessage());
        }
        return $instance;
    }
}
?>