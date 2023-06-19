<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;
use Illuminate\Http\Response;
use Illuminate\Contracts\Support\Responsable;

class Handler extends ExceptionHandler
{
    /**
     * A list of exception types with their corresponding custom log levels.
     *
     * @var array<class-string<\Throwable>, \Psr\Log\LogLevel::*>
     */
    protected $levels = [
        //
    ];

    /**
     * A list of the exception types that are not reported.
     *
     * @var array<int, class-string<\Throwable>>
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Report or log an exception.
     *
     * @param  \Throwable  $exception
     * @return void
     */
    public function report(Throwable $exception)
    {
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Throwable  $exception
     * @return \Illuminate\Http\Response
     */
    public function render($request, Throwable $exception)
    {
        // Responsableインターフェースを継承したクラスはここでレスポンスを返す
        if ($exception instanceof Responsable) {
            return $exception->toResponse($request);
        }

        // HTTP系例外が発生した場合
        if ($this->isHttpException($exception)) {
            return $this->toResponse($request, $exception->getMessage(), $exception->getCode());
        }

        // それ以外の場合は Internal Server Error とする
        return $this->toResponse($request, 'Internal Server Error', Response::HTTP_INTERNAL_SERVER_ERROR);
    }

    protected function toResponse($request, string $message, int $statusCode)
    {
         return (new BaseErrorResponseException($message, $statusCode))
            ->toResponse($request);
    }
}
