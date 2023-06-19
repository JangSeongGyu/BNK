<?php

namespace App\MyDefined\Entity\General;

final class BizlogiEntity{
    public $注文番号;
    public $注文日;
    public $問合せNo;
    public $出荷日;
    public $便種;
    public $配達予定日;
    public $時間帯指定;
    public $時間指定;
    public $支払区分;
    public $クール区分;
    public $届先CD;
    public $届先名1;
    public $届先名2;
    public $届先郵便番号;
    public $届先住所1;
    public $届先住所2;
    public $届先住所3;
    public $届先電話番号;
    public $注文者名1;
    public $注文者名2;
    public $注文者郵便番号;
    public $注文者住所1;
    public $注文者住所2;
    public $注文者住所3;
    public $注文者電話番号;
    public $顧客CD;
    public $注文者印字フラグ;
	public $送り状記事欄１;
	public $送り状記事欄２;
	public $送り状記事欄３;
	public $送り状記事欄４;
	public $送り状記事欄５;
	public $送り状記事欄６;
	public $納品書備考欄1;
	public $納品書備考欄2;
	public $個口数;
	public $営業店止め;
	public $保険金額;
	public $消費税区分;
	public $請求金額;
	public $消費税;
	public $送料;
	public $手数料;
	public $商品CD;
	public $商品名;
	public $販売単価;
	public $数量;


    private function __construct()
    {

    }

    public static function reconstructFromRepository(array $data): BizlogiEntity 
    {
        $BizlogiEntity = new self();
        foreach(get_object_vars($BizlogiEntity) as $key => $value){
            $BizlogiEntity->$key = $data[$key];
        }
        return $BizlogiEntity;
    }
}
?>