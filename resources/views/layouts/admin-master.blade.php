<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>@yield('title') | {{ env('APP_NAME', 'K-CMS') }}</title>

        <link rel="stylesheet" href="{{ mix('/css/admin.css') }}" type="text/css">

        @auth('admin')
            @if(config('kcms.vue_admin'))
                <script defer src="{{ mix('js/admin_vue.js') }}"></script>
            @else
                <script defer src="{{ mix('js/admin_php.js') }}"></script>
            @endif
        @endauth
    </head>

    <body class="h-screen m-0">
        <div class="main" id="app">
            @auth('admin')
                @if(config('kcms.vue_admin'))
                    @yield('content')
                @else
                    @if(isset($authNav)){{ $authNav }}@endif

                    @if(isset($menu)){{ $menu }}@endif

                    <div class="content container sm:px-0 mx-auto">
                        @include('flash::message')

                        @yield('content')
                    </div>
                @endif
            @else
                @if(isset($authNav)){{ $authNav }}@endif

                @yield('content')
            @endauth
        </div>
    </body>
</html>
