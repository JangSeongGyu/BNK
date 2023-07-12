<?php

namespace App\MyDefined\ValueObject\Taxi;
use App\MyDefined\ValueObject\General\SagawaInquiryNoValueObject;

use App\Exceptions\InvalidValueErrorResponseException;

final class CheckInquiryNoValueObject extends SagawaInquiryNoValueObject
{
    private function __construct()
    {

    }
    /**
     * @param string $inquiryNo
     */
    public static function create(string $inquiryNo): CheckInquiryNoValueObject
    {
        $instance = new CheckInquiryNoValueObject();
        $instance->validate($inquiryNo);
        return $instance;
    }

    private function validate(string $inquiryNo)
    {
        if(!strlen($inquiryNo) == 15){
            throw new InvalidValueErrorResponseException('問い合わせ番号: ' . $inquiryNo);
        }
        return;
    }
}
?>