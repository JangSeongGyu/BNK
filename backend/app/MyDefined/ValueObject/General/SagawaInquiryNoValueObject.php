<?php

namespace App\MyDefined\ValueObject\General;
use App\MyDefined\ValueObject\ValueObject;

use App\Exceptions\InvalidValueErrorResponseException;

class SagawaInquiryNoValueObject extends ValueObject
{
    private function __construct()
    {

    }
    /**
     * @param string $inquiryNo
     */
    public static function create(string $inquiryNo): SagawaInquiryNoValueObject
    {
        $instance = new SagawaInquiryNoValueObject();
        $instance->value = $instance->validate($inquiryNo);
        return $instance;
    }

    private function validate(string $inquiryNo)
    {
        if(!strlen($inquiryNo) == 12){
            throw new InvalidValueErrorResponseException('問い合わせ番号: ' . $inquiryNo);
        }
        return $inquiryNo;
    }

}
?>