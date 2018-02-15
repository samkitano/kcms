<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>@yield('title') | {{ env('APP_NAME', 'K-CMS') }}</title>

        <link rel="stylesheet" href="{{ mix('/css/admin.css') }}" type="text/css">

        <script defer src="{{ mix('js/admin_php.js') }}"></script>
    </head>

    <body class="h-screen m-0">
        <main class="main">
            @component('components.top-bar', [
                'user_name' => __user()->name,
                'user_img' => __user()->gravatar,
                'breadcrumbs' => $breadcrumbs
            ])@endcomponent

            @if(isset($menu)){{ $menu }}@endif

            <div class="content container sm:px-0 mx-auto">
                @include('flash::message')

                @yield('content')
            </div>
        </main>
    </body>
</html>
