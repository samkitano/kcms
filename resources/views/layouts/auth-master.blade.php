<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>@yield('title') | {{ env('APP_NAME', 'K-CMS') }}</title>

        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Raleway:300,600" type="text/css">
        <link rel="stylesheet" href="{{ mix('/css/auth.css') }}" type="text/css">
    </head>

    <body>
        <div class="wrapper">
            @yield('content')
        </div>
    </body>
</html>
