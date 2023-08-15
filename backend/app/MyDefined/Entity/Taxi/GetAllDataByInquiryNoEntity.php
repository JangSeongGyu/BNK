<?php

namespace App\MyDefined\Entity\Taxi;

use App\MyDefined\ValueObject\Taxi\CheckingTypeValueObject;

use App\Exceptions\ConflictErrorResponseException;
use Illuminate\Support\Collection;

final class GetAllDataByInquiryNoEntity{
    public $rows;

    private function __construct()
    {

    }

    public static function reconstructViewWKFromRepository(Collection $rows, CheckingTypeValueObject $CheckingTypeVO): GetAllDataByInquiryNoEntity 
    {
        $selfEntity = new self();
        $selfEntity->rows = $selfEntity->validate($rows, $CheckingTypeVO);
        return $selfEntity;
    }

    private function validate($rows, $CheckingTypeVO){
        //一次梱包
        if($CheckingTypeVO->value == 1){
            if($rows[0]->一次梱包フラグ == 1){
                throw new ConflictErrorResponseException();
            }
        }
        //二次梱包
        else if($CheckingTypeVO->value == 2){
            if($rows[0]->一次梱包フラグ == 0){
                throw new ConflictErrorResponseException();
            }
            if($rows[0]->一次梱包フラグ == 1 && $rows[0]->二次梱包フラグ == 1){
                throw new ConflictErrorResponseException();
            }
        }
        return $rows;
    }
}
?>