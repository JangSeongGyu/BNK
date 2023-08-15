<?php

namespace App\MyDefined\ValueObject\Taxi;
use App\MyDefined\ValueObject\ValueObject;

use App\Exceptions\InvalidValueErrorResponseException;

final class CheckingTypeValueObject extends ValueObject
{
    public $type;

    private function __construct()
    {

    }
    /**
     * @param string $type
     */
    public static function create(string $type): CheckingTypeValueObject
    {
        $instance = new CheckingTypeValueObject();
        $instance->value = $instance->validate($type);
        return $instance;
    }

    private function validate(string $type)
    {
        if(!in_array(intval($type), [1, 2], true)){
            throw new InvalidValueErrorResponseException('type: ' . $type);
        }
        return $type;
    }
}
?>