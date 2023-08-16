<?php

namespace App\MyDefined\Entity\Taxi;

use Illuminate\Support\Collection;

final class GetQRDataEntity{
    public $normalA6 = [];
    public $normal10 = [];
    public $eaglesA6 = [];
    public $eagles10 = [];

    private function __construct()
    {

    }

    public static function reconstructViewWKFromRepository(Collection $rows): GetQRDataEntity
    {
        $selfEntity = new self();
        $rows = $selfEntity->setURL($rows);
        $selfEntity->transform($rows);

        return $selfEntity;
    }

    private function setURL($rows){
        foreach($rows as $key => $value){
            $merchantCrc32 = crc32($rows[$key]->店舗コード);
            $sceneCrc32 = crc32($rows[$key]->シーンコード);
            $itemCrc32 = crc32($rows[$key]->アイテムコード);
            $crc = sprintf("%'.08x", $merchantCrc32) . sprintf("%'.08x", $sceneCrc32 . $itemCrc32);
            $merchant = $rows[$key]->店舗コード;
            $rows[$key]->URL = config('app.taxi.qr_url') . '?c=' . $crc . '&m=' . $merchant;
        }

        return $rows;
    }

    private function transform($rows){
        foreach($rows as $key => $value){
            if($rows[$key]->イーグルス == 0){
                if($rows[$key]->商品名 == 'A6'){
                    array_push($this->normalA6, $value);
                }
                elseif($rows[$key]->商品名 == '10x10'){
                    array_push($this->normal10, $value);
                }
            }
            elseif($rows[$key]->イーグルス == 1){
                if($rows[$key]->商品名 == 'A6'){
                    array_push($this->eaglesA6, $value);
                }
                elseif($rows[$key]->商品名 == '10x10'){
                    array_push($this->eagles10, $value);
                }
            }
        }
    }
}
?>