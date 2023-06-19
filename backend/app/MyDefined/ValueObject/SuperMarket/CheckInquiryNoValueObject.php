<?php

namespace App\MyDefined\ValueObject\SuperMarket;
use App\MyDefined\ValueObject\General\SagawaInquiryNoValueObject;

use App\Exceptions\InvalidValueErrorResponseException;

final class CheckInquiryNoValueObject extends SagawaInquiryNoValueObject
{
    /**
     * @param string $inquiryNo
     */
    public static function create(string $inquiryNo): CheckInquiryNoValueObject
    {
        $instance = new CheckInquiryNoValueObject();
        $instance->validate($inquiryNo);
        $instance->value = $inquiryNo;
        return $instance;
    }

    public function validate(string $inquiryNo)
    {
        if(!strlen($inquiryNo) == 15){
            throw new InvalidValueErrorResponseException('問い合わせ番号: ' . $inquiryNo);
        }
        return;
    }
}
?>