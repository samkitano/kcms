<?php

namespace App\Http\Middleware;

use Closure;

class RedirectIfAuthenticated
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Closure                 $next
     * @param  string|null              $guard
     * @return mixed
     * @throws \Exception
     */
    public function handle($request, Closure $next, $guard = null)
    {
        if (__user()) {
            return redirect(__user()->getHomeUrl());
        }

        return $next($request);
    }
}
