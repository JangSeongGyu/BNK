<?php

namespace App\MyDefined\ValueObject\Taxi;
use App\MyDefined\ValueObject\General\SagawaInquiryNoValueObject;

use App\Exceptions\InvalidValueErrorResponseException;

final class CheckInquiryNoValueObject extends SagawaInquiryNoValueObject
{
    public $inquiryNo;
    public $includeNoWithZero;
    public $includeNo;

    private function __construct()
    {

    }
    /**
     * @param string $inquiryNo
     */
    public static function create(string $inquiryNo): CheckInquiryNoValueObject
    {
        $instance = new CheckInquiryNoValueObject();
        $instance->value = $instance->validate($inquiryNo);
        $instance->inquiryNo = substr($inquiryNo, 0, -3);
        $instance->includeNoWithZero = substr($inquiryNo, -3);
        $instance->includeNo = str_replace('0', '', $instance->includeNoWithZero);
        return $instance;
    }

    private function validate(string $inquiryNo)
    {
        if(!strlen($inquiryNo) == 15){
            throw new InvalidValueErrorResponseException();
        }
        if(!is_numeric($inquiryNo)){
            throw new InvalidValueErrorResponseException();
        }
        return $inquiryNo;
    }
}
?>