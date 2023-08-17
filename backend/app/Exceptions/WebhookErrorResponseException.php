<?php

namespace App\Exceptions;

class WebhookErrorResponseException extends BaseErrorResponseException
{
    public function toResponse($request)
    {
        $this->setErrorMessage('Webhookでエラーが発生しました<br>'. $this->getErrorMessage());
        $this->setStatusCode(511);
        $this->setErrorCode('webhook_error');
        return parent::toResponse($request);
    }
}
