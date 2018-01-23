<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

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
//        if (Auth::guard('admin')->check()) {
//            return redirect('/admin/dashboard');
//        }
//
//        if (Auth::guard('front')->check()) {
//            return redirect('/');
//        }

        if (__user()) {
            return redirect(__user()->getHomeUrl())/*->to()*/;
        }

        return $next($request);

        //return $next($request);
    }
}
