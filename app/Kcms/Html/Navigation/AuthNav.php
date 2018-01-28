<?php

namespace App\Kcms\Html\Navigation;

use App\Kcms\Html\Navigation;
use Illuminate\Support\Facades\Route;
use App\Kcms\Html\ElementGenerator\Tag;

class AuthNav extends Navigation
{
    /**
     * @return AuthNav
     */
    public static function create()
    {
        return new static();
    }

    /**
     * AuthNav constructor.
     */
    protected function __construct()
    {
        $this->setErrors();
        $this->setHtml();
    }

    /**
     * Generate AuthNav Navigation
     */
    protected function setHtml()
    {
        $children = $this->navLeft().$this->navRight();
        $this->html = Tag::nav(['class' => 'top-nav'], $children);
    }

    /**
     * Set errors
     */
    protected function setErrors()
    {
        $session = request()
            ->getSession()
            ->get('errors');

        $this->errors = $session ? $session->getMessages() : null;
    }

    /**
     * @return string
     */
    protected function navLeft(): string
    {
        $app_name = config('app.name');
        $authNavLeftSvgPath = 'M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z';
        $authNavLeftSvgAttrs = [
            'width' => '54',
            'height' => '54',
            'viewBox' => '0 0 54 54',
            'xmlns' => static::XMLNS,
            'class' => 'fill-current h-8 w-8 mr-2'
        ];

        $path = Tag::path(['d' => $authNavLeftSvgPath]);
        $svg = Tag::svg($authNavLeftSvgAttrs, $path);
        $brand = Tag::span(['class' => 'font-narrow font-semibold text-xl tracking-tight'], $app_name);

        return Tag::div(['class' => 'top-nav_left'], $svg.$brand);
    }

    /**
     * @return string
     */
    protected function navRight(): string
    {
        $auth = auth('admin')->check();
        $routeName = Route::current()->action['as'] ?? '';
        $loginActive = $routeName !== 'admin.login';
        $isReset = $routeName === 'admin.forgot';

        $left = Tag::div(
            ['class' => 'top-nav_right_left sm:flex-grow auth-info'],
            $this->authNavText($loginActive, $isReset, $auth)
        );

        $right = Tag::div(
            ['class' => 'top-nav_right_right sm:mt-0'],
            $this->authNavLinks($loginActive, $auth)
        );

        return Tag::div(
            ['class' => 'top-nav_right sm:flex sm:items-center sm:w-auto'],
            $left.$right
        );
    }

    /**
     * @param $isLogin
     * @param $isReset
     * @param $auth
     * @return string
     */
    protected function authNavText($isLogin, $isReset, $auth): string
    {
        if (! $auth) {
            if ($isReset) {
                return __('auth.forgot_info');
            }
            return __($isLogin ? 'auth.please_login' : 'auth.fill_login');
        }

        if (request()->session()->has('flash_notification')) {
            return request()
                ->session('flash_notification')
                ->get('flash_notification')[0]
                ->message;
        }

        return '';
    }

    /**
     * @param $loginActive
     * @param $auth
     * @return string
     */
    protected function authNavLinks($loginActive, $auth): string
    {
        if ($auth) {
            return $this->authNavLogout();
        }

        $commonClass = 'authButton lg:sm-0';
        $class = $loginActive ? "{$commonClass} authButton_active" : "{$commonClass} authButton_disabled";

        if (env('VUE_ADMIN')) {
            return Tag::a(
                [
                    'href' => $loginActive ? '/admin/login' : '#',
                    'onclick' => $loginActive ? '' : 'event.preventDefault();',
                    'class' => $class
                ],
                __('auth.login')
            );
        }
        return Tag::a(
            [
                'href' => $loginActive ? route('admin.login') : '#',
                'onclick' => $loginActive ? '' : 'event.preventDefault();',
                'class' => $class
            ],
            __('auth.login')
        );
    }

    /**
     * @return string
     */
    protected function authNavLogout(): string
    {
        $user = auth('admin')->user();
        $avatar = Tag::span($this->authAvatar($user));

        $name = Tag::span(['class' => 'ml-2'], $user->name);

        $link = $this->logoutLink();

        return Tag::div([
            'class' => 'text-white'
        ], $avatar.$name.$link);
    }

    /**
     * @param $user
     * @return string
     */
    protected function authAvatar($user): string
    {
        $src = 'https://www.gravatar.com/avatar/'.md5($user->email).'?d=mm&s=256';

        return Tag::img([
            'class' => 'inline-block h-8 w-8 rounded-full',
            'src' => $src,
            'alt' => $user->name,
        ]);
    }

    /**
     * @return string
     */
    protected function logoutLink(): string
    {
        $token = Tag::input([
            'type' => 'hidden',
            'name' => '_token',
            'value' => csrf_token(),
        ]);
        $submit = Tag::button([
            'class' => 'btn hover:text-red',
            'type' => 'submit',
        ], $this->powerOffSvg());

        $form = Tag::form([
            'class' => 'appearance-none inline',
            'method' => 'POST',
            'action' => route('admin.logout')
        ], $token.$submit);

        return Tag::span(['class' => 'ml-2'], $form);
    }

    /**
     * @return string
     */
    protected function powerOffSvg(): string
    {
        /**
         * @var $powerOffSvgPath
         * @see ZondIcons http://www.zondicons.com
         */
        $powerOffSvgPath = 'M4.16 4.16l1.42 1.42A6.99 6.99 0 0 0 10 18a7 7 0 0 0 4.42-12.42l1.42-1.42a9 9 0 1 1-11.69 0zM9 0h2v8H9V0z';
        $powerOffSvgAttrs = [
            'class' => 'fill-current',
            'width' => '14',
            'height' => '14',
            'viewbox' => '0 0 20 20',
            'title' => __('auth.logout'),
            'xmlns' => static::XMLNS
        ];
        $path = Tag::path(['d' => $powerOffSvgPath, 'fill-rule' => 'even-odd']);

        return Tag::svg($powerOffSvgAttrs, $path);
    }
}
