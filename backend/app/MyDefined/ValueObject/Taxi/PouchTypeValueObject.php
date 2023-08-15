<?php

namespace App\MyDefined\ValueObject\Taxi;
use App\MyDefined\ValueObject\ValueObject;

use App\Exceptions\InvalidValueErrorResponseException;

final class PouchTypeValueObject extends ValueObject
{
    public $type;

    private function __construct()
    {

    }
    /**
     * @param string $type
     */
    public static function create(string $type): PouchTypeValueObject
    {
        $instance = new PouchTypeValueObject();
        $instance->value = $instance->validate($type);
        return $instance;
    }

    private function validate(string $type)
    {
        if(!in_array(intval($type), [0, 1], true)){
            throw new InvalidValueErrorResponseException('type: ' . $type);
        }
        return $type;
    }
}
?>