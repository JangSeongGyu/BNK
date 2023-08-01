<?php

namespace App\Exceptions;

class ConflictErrorResponseException extends BaseErrorResponseException
{
    public function toResponse($request)
    {
        $this->setErrorMessage('現在のリソース状況と矛盾した操作です。');
        $this->setStatusCode(409);
        $this->setErrorCode('conflict');
        return parent::toResponse($request);
    }
}
