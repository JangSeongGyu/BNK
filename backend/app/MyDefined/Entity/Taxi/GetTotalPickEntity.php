<?php

namespace App\MyDefined\Entity\Taxi;

use Illuminate\Support\Collection;

final class GetTotalPickEntity{
    public $normal = [];
    public $eagles = [];

    private function __construct()
    {

    }

    public static function reconstructViewWKFromRepository(Collection $rows): GetTotalPickEntity
    {
        $selfEntity = new self();
        $selfEntity->transform($rows);

        return $selfEntity;
    }

    private function transform($rows){
        foreach($rows as $key => $value){
            if($rows[$key]->イーグルス == 0){
                array_push($this->normal, $value);
            }
            elseif($rows[$key]->イーグルス == 1){
                array_push($this->eagles, $value);
            }
        }
    }
}
?>