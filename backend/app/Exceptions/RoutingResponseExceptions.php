<?php

namespace App\Exceptions;

use App\Exceptions\NotExistsErrorResponseException;
use App\Exceptions\AlreadyCompletedErrorResponseException;
use App\Exceptions\StoredProcedureErrorResponseException;

class RoutingResponseExceptions
{
    public static function Routing(int $errorCode, string $message = '')
    {
        if($errorCode == 409){
            throw new AlreadyCompletedErrorResponseException();
        }
        elseif($errorCode == 410){
            throw new NotExistsErrorResponseException();
        }
        elseif($errorCode == 500){
            throw new StoredProcedureErrorResponseException($message);
        }

    }
}
