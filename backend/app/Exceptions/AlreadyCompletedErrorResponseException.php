<?php

namespace App\Exceptions;

class AlreadyCompletedErrorResponseException extends BaseErrorResponseException
{
    public function toResponse($request)
    {
        $this->setErrorMessage('指定出荷日のこの操作は既に完了しています。');
        $this->setStatusCode(409);
        $this->setErrorCode('already_completed');
        return parent::toResponse($request);
    }
}
