<?php

namespace App\Exceptions;

class InvalidParameterErrorResponseException extends BaseErrorResponseException
{
    public function toResponse($request)
    {
        $this->setErrorMessage('バリデーションエラー\n'. $this->getErrorMessage());
        $this->setStatusCode(422);
        $this->setErrorCode('invalid_parameter');
        return parent::toResponse($request);
    }
}
