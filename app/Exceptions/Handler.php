<?php

namespace App\Exceptions;

use Exception;
use Whoops\Run;
use Illuminate\Http\Response;
use Whoops\Handler\PrettyPageHandler;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        \Illuminate\Auth\AuthenticationException::class,
        \Illuminate\Auth\Access\AuthorizationException::class,
        \Symfony\Component\HttpKernel\Exception\HttpException::class,
        \Illuminate\Database\Eloquent\ModelNotFoundException::class,
        \Illuminate\Validation\ValidationException::class,
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Report or log an exception.
     *
     * This is a great spot to send exceptions to Sentry, Bugsnag, etc.
     *
     * @param  \Exception $exception
     * @return void
     * @throws Exception
     */
    public function report(Exception $exception)
    {
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Exception  $exception
     * @return Response|\Symfony\Component\HttpFoundation\Response
     */
    public function render($request, Exception $exception)
    {
        if ($this->shouldntReport($exception)) {
            return parent::render($request, $exception);
        }

        if (config('app.debug') && app()->environment('local')) {
            return $this->renderExceptionWithWhoops($exception);
        }

        if (app()->environment('production')) {
            return response()->view('errors.500', [], 500);
        }

        return parent::render($request, $exception);
    }

    protected function renderExceptionWithWhoops(Exception $exception): Response
    {
        $this->unsetSensitiveData();

        $whoops = new Run();
        $whoops->pushHandler(new PrettyPageHandler());

        return new Response(
            $whoops->handleException($exception),
            $exception->getStatusCode(),
            $exception->getHeaders()
        );
    }

    /*
     * Don't ever display sensitive data in Whoops pages.
     */
    protected function unsetSensitiveData()
    {
        foreach ($_ENV as $key => $value) {
            unset($_SERVER[$key]);
        }

        $_ENV = [];
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @param AuthenticationException $exception
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\RedirectResponse|Response
     */
    protected function unauthenticated($request, AuthenticationException $exception)
    {
        return $request->expectsJson()
            ? response()->json(['message' => 'Unauthenticated.'], 401)
            : redirect()->guest(route('admin.login'));
    }
}
