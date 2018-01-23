<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>K-CMS</title>

        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Raleway:100,300,300i,600" type="text/css">
        <link rel="stylesheet" href="{{ mix('/css/admin.css') }}" type="text/css">
    </head>

    <body>
        <div class="main" id="app">
            @vueAdmin
                <app></app>
            @else
                {!! $authNav !!}

                <div class="flex content-center flex-wrap text-grey h-screen font-hairline"
                     style="font-family: Raleway, sans-serif; margin-top: -48px">
                    <div class="text-center mx-auto">
                        <div class="text-huge mb-30px">K-CMS</div>

                        <div class="text-grey-dark mx-2 mt-4 uppercase no-underline tracking-wider font-bold text-xs">
                            <a class="px-2 hover:text-grey-darkest" target="_blank" href="http://samkitano.com">Site</a>
                            <a class="px-2 hover:text-grey-darkest" target="_blank" href="https://laravel.com/docs">Documentation</a>
                            <a class="px-2 hover:text-grey-darkest" target="_blank" href="https://github.com/samkitano/kcms">GitHub</a>
                            <a class="px-2 hover:text-grey-darkest" target="_blank" href="https://laravel.com">Contact</a>
                        </div>
                    </div>
                </div>
            @endvueAdmin
        </div>
    </body>
</html>
