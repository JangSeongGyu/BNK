<?php

namespace App\Exceptions;

class InvalidOperationErrorResponseException extends BaseErrorResponseException
{
    public function toResponse($request)
    {
        $this->setErrorMessage('不正な操作です。\n'. $this->getErrorMessage());
        $this->setStatusCode(400);
        $this->setErrorCode('invalid_operation');
        return parent::toResponse($request);
    }
}
