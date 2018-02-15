<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>{{ config('app.name') }}</title>

        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Raleway:300,600" type="text/css">
        <link rel="stylesheet" href="{{ mix('/css/auth.css') }}" type="text/css">
    </head>

    <body>
        <div class="wrapper">
            @include('components.auth-nav')
        </div>
    </body>
</html>
