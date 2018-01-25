<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>K-CMS</title>

        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Raleway:100,600" type="text/css">
        <link rel="stylesheet" href="{{ mix('/css/front.css') }}" type="text/css">
    </head>

    <body class="bg-white text-grey h-screen m-0 font-hairline" style="font-family: Raleway, sans-serif">
        <div class="flex items-center justify-center relative h-screen">
            @if (Route::has('front.login') or Route::has('front.register'))
                <div class="absolute pin-r pin-t text-grey-dark mx-2 mt-4 uppercase no-underline tracking-wider font-bold text-xs">
                    @auth
                        <form method="POST" action="{{ action('Front\Auth\LoginController@logout') }}">
                            {{ csrf_field() }}
                            <button class="px-4 uppercase hover:text-grey-darkest" type="submit">{{ __('auth.logout') }}</button>
                        </form>
                    @else
                        @if(env('ALLOW_FRONT_LOGIN'))
                            <a class="px-4" href="{{ route('front.login') }}">{{ __('auth.login') }}</a>
                        @endif

                        @if(env('ALLOW_FRONT_REGISTER'))
                            <a class="px-4" href="{{ route('front.register') }}">{{ __('auth.register') }}</a>
                        @endif
                    @endauth
                </div>
            @endif

            <div class="text-center">
                <div class="text-huge mb-30px">K-CMS</div>

                <div class="text-grey-dark mx-2 mt-4 uppercase no-underline tracking-wider font-bold text-xs">
                    <a class="px-2 hover:text-grey-darkest" target="_blank" href="http://samkitano.com">Site</a>
                    <a class="px-2 hover:text-grey-darkest" target="_blank" href="https://laravel.com/docs">Documentation</a>
                    <a class="px-2 hover:text-grey-darkest" target="_blank" href="https://github.com/samkitano/kcms">GitHub</a>
                    <a class="px-2 hover:text-grey-darkest" target="_blank" href="https://laravel.com">Contact</a>
                </div>
            </div>
        </div>
    </body>
</html>
