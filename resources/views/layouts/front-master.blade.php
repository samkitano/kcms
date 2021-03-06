<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>@yield('title') | {{ env('APP_NAME', 'K-CMS') }}</title>

        <link rel="stylesheet" href="{{ mix('/css/front.css') }}" type="text/css">
    </head>

    <body>
        <div class="flex flex-col items-center justify-center relative h-screen">
            <div class="absolute pin-r pin-t text-blue mx-2 mt-4 uppercase no-underline tracking-wider font-bold text-xs">
                @guest
                    @if(config('kcms.allow_front_login'))
                        @if(Route::currentRouteName() == 'front.login' or Route::currentRouteName() == 'admin.login')
                            <span class="px-4 text-grey">{{ __t('auth.login') }}</span>
                        @else
                            <a class="nav-login px-4" href="{{ route('front.login') }}">{{ __t('auth.login') }}</a>
                        @endif
                    @endif

                    @if(config('kcms.allow_front_register') and request()->isFront())
                        @if(Route::currentRouteName() == 'front.register')
                            <span class="px-4 text-grey">{{ __t('auth.register') }}</span>
                        @else
                            <a class="nav-register px-4" href="{{ route('front.register') }}">{{ __t('auth.register') }}</a>
                        @endif
                    @endif
                @else
                    <form method="POST" action="{{ action('Front\Auth\LoginController@logout') }}">
                        {{ csrf_field() }}
                        <button class="nav-logout px-4 uppercase hover:text-grey-darkest" type="submit">{{ __t('auth.logout') }}</button>
                    </form>
                @endguest
            </div>

            @include('flash::message')

            @yield('content')
        </div>
    </body>
</html>
