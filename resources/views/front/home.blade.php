@extends('layouts.front-master')

@section('content')
    <div class="flex items-center justify-center relative h-screen">
        <div class="absolute pin-r pin-t text-grey-dark mx-2 mt-4 uppercase no-underline tracking-wider font-bold text-xs">
            @auth
                <form method="POST" action="{{ action('Front\Auth\LoginController@logout') }}">
                    {{ csrf_field() }}
                    <button class="px-4 uppercase hover:text-grey-darkest" type="submit">{{ __('auth.logout') }}</button>
                </form>
            @else
                @if(env('ALLOW_FRONT_LOGIN'))
                    <a class="px-4" href="{{ route('front.login') }}">Login</a>
                @endif

                @if(env('ALLOW_FRONT_REGISTER'))
                    <a class="px-4" href="{{ route('front.register') }}">Register</a>
                @endif
            @endauth
        </div>

        @include('flash::message')

        @yield('content')
    </div>
@endsection
