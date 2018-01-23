<?php

namespace App\Http\Middleware;

use Closure;

/**
 * Class Authenticate
 * @package App\Http\Middleware
 */
class Authenticate
{
    /**
     * @param \Illuminate\Http\Request $request
     * @param Closure $next
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\RedirectResponse|mixed|\Symfony\Component\HttpFoundation\Response
     * @throws \Exception
     */
    public function handle($request, Closure $next)
    {
        if (! __user()) {
            return $this->handleUnauthorizedRequest($request);
        }

        __user()->registerLastActivity()->save();

        return $next($request);
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\RedirectResponse|\Symfony\Component\HttpFoundation\Response
     */
    protected function handleUnauthorizedRequest($request)
    {
        if ($request->ajax()) {
            return response('Unauthorized.', 401);
        }

        return redirect()->guest($request->isAdmin()
            ? route('admin.login')
            : route('front.login'));
    }
}
