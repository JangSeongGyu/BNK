<?php

namespace App\Exceptions;

use App\Exceptions\NotExistsErrorResponseException;
use App\Exceptions\ConflictErrorResponseException;
use App\Exceptions\StoredProcedureErrorResponseException;
use App\Exceptions\BaseErrorResponseException;

class RoutingResponseExceptions extends BaseErrorResponseException
{
    public static function Routing(int $errorCode, string $message = '')
    {
        if($errorCode == 409){
            throw new ConflictErrorResponseException();
        }
        elseif($errorCode == 410){
            throw new NotExistsErrorResponseException();
        }
        elseif($errorCode == 505){
            throw new StoredProcedureErrorResponseException($message);
        }
        else{
            throw new self('', $errorCode);
        }

    }

    public function toResponse($request)
    {
        $this->setErrorMessage('予期せぬエラー\n'. $this->getErrorMessage());
        $this->setStatusCode($this->getStatusCode());
        $this->setErrorCode('routing_exceptions');
        return parent::toResponse($request);
    }
}
