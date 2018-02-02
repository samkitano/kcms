<?php

namespace App\Http\Middleware;

use Closure;
use Exception;
use Illuminate\Contracts\Auth\Authenticatable;
use App\Kcms\Services\Auth\Users\User as FrontUser;
use App\Kcms\Services\Auth\Administrators\User as AdminUser;

class LoginAs
{
    /**
     * @param $request
     * @param Closure $next
     * @return \Illuminate\Http\RedirectResponse|mixed
     * @throws Exception
     */
    public function handle($request, Closure $next)
    {
        $segments = array_reverse(request()->segments());

        if (($segments[1] ?? '') !== 'login') {
            return $next($request);
        }

        if (! $this->canLoginAs()) {
            throw new Exception("You can't log in as a specific user right now");
        }

        return $this->loginAsAndRedirect($segments[0]);
    }

    /**
     * @return bool
     */
    protected function canLoginAs(): bool
    {
        // Just to be sure...

        if (! app()->environment('local')) {
            return false;
        }

        if (! ends_with(request()->getHost(), '.local')) {
            return false;
        }

        return true;
    }

    /**
     * @param string $identifier
     * @return \Illuminate\Http\RedirectResponse
     * @throws Exception
     */
    protected function loginAsAndRedirect(string $identifier)
    {
        $user = $this->getUser($identifier)->getAuthIdentifier();

        if (empty($user)) {
            throw new Exception('The user you\'re trying to log in as doesn\'t exist');
        }

        auth()->loginUsingId($user);

        return redirect()->to(
            str_replace("login/{$identifier}", '', request()->fullUrl())
        );
    }

    /**
     * @param string $identifier
     * @return Authenticatable
     */
    protected function getUser(string $identifier): Authenticatable
    {
        if (! str_contains($identifier, '@')) {
            $identifier .= '@gmail.com';
        }

        if (request()->isAdmin()) {
            return AdminUser::where(['email' => $identifier])->first();
        }

        return FrontUser::where(['email' => $identifier])->first();
    }
}
