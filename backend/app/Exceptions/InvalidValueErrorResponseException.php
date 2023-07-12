<?php

namespace App\Exceptions;

class InvalidValueErrorResponseException extends BaseErrorResponseException
{
    public function toResponse($request)
    {
        $this->setErrorMessage('不正な値です。<br>'. $this->getErrorMessage());
        $this->setStatusCode(400);
        $this->setErrorCode('invalid_value');
        return parent::toResponse($request);
    }
}
