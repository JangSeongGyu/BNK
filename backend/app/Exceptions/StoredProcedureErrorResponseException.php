<?php

namespace App\Exceptions;

class StoredProcedureErrorResponseException extends BaseErrorResponseException
{
    public function toResponse($request)
    {
        $this->setErrorMessage('ストアドプロシージャ内でエラーが発生しました。<br>'. $this->getErrorMessage());
        $this->setStatusCode(505);
        $this->setErrorCode('stored_procedure');
        return parent::toResponse($request);
    }
}
