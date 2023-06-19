<?php

namespace App\Exceptions;

class StoredProcedureErrorResponseException extends BaseErrorResponseException
{
    public function toResponse($request)
    {
        $this->setErrorMessage('ストアドプロシージャ内でエラーが発生しました。\n'. $this->getErrorMessage());
        $this->setStatusCode(500);
        $this->setErrorCode('stored_procedure');
        return parent::toResponse($request);
    }
}
