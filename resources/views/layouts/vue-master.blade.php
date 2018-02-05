<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ env('APP_NAME', 'K-CMS') }}</title>

    <link rel="stylesheet" href="{{ mix('/css/admin.css') }}" type="text/css">

    <script defer src="{{ mix('js/admin_vue.js') }}"></script>
</head>

<body class="h-screen m-0">
    <div class="main" id="app">
        @yield('content')
    </div>
</body>
</html>
