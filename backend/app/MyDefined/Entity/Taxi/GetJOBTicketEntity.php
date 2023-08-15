<?php

namespace App\MyDefined\Entity\Taxi;

use Illuminate\Support\Collection;

final class GetJOBTicketEntity{
    public $normalA6 = [];
    public $normal10 = [];
    public $eaglesA6 = [];
    public $eagles10 = [];

    private function __construct()
    {

    }

    public static function reconstructViewWKFromRepository(Collection $rows): GetJOBTicketEntity
    {
        $selfEntity = new self();
        $selfEntity->transform($rows);

        return $selfEntity;
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