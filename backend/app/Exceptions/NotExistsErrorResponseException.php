<?php

namespace App\Exceptions;

class NotExistsErrorResponseException extends BaseErrorResponseException
{
    public function toResponse($request)
    {
        $this->setErrorMessage('指定条件のデータが存在しません。');
        $this->setStatusCode(410);
        $this->setErrorCode('not_exists');
        return parent::toResponse($request);
    }
}
