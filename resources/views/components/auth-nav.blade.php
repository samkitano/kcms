<div class="container">
    <div class="panel">
        <div class="title"><span class="logo">{{ config('app.name') }}</span></div>

        @auth('admin')
            <div class="card center">
                <figure style="background-image:url({{ __user()->gravatar }});background-size:100% auto;background-repeat:no-repeat;background-position:center top"
                ><figcaption>{{ __user()->name }}</figcaption></figure>
            </div>

            <form method="POST" action="{{ route('admin.logout') }}">
                {{ csrf_field() }}
                <button type="submit" class="submit valid">{{ __t('auth.logout') }}</button>
            </form>
        @else
            <div class="title">{{ __t('auth.welcome') }}</div>

            <div class="info" style="margin-bottom:2rem">{{ __t('auth.please_login') }}</div>

            <div class="options center">
                <a class="login-link" href="{{ route('admin.login') }}">{{ __t('auth.goto') }} {{ __t('auth.login') }} {{ __t('auth.page') }}</a>
            </div>

            <div class="links center">
                <a class="link" target="_blank" href="https://laravel.com/docs">Documentation</a>
                <a class="link" target="_blank" href="https://github.com/samkitano/kcms">GitHub</a>
                <a class="link" target="_blank" href="http://samkitano.com">Author</a>
            </div>
        @endauth
    </div>
</div>
