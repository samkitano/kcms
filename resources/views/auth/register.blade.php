@extends('layouts.auth-master')

@section('title', __t('auth.register'))

@section('content')
    <div class="container">
        <form class="panel" method="POST" action="{{ route('front.register') }}">
            {{ csrf_field() }}

            <div class="title"><span class="logo">{{ config('app.name') }}</span></div>

            <div class="title">{{ __t('auth.register') }}</div>

            <div class="info">{{ __t('auth.fill_register') }}</div>

            <div class="group{{ $errors->has('first_name') ? ' error' : '' }}">
                <input class="input"
                       name="first_name"
                       id="first_name"
                       required
                       autofocus
                       placeholder=" "
                       value="{{ old('first_name') }}"
                       pattern=".{2,}"
                       type="text">

                <span class="label" data-placeholder="{{ __t('auth.first_name') }}*"></span>
            </div>

            <p class="error">&nbsp;@if($errors->has('last_name')){{ $errors->first('first_name') }}@endif</p>

            <div class="group{{ $errors->has('last_name') ? ' error' : '' }}">
                <input class="input"
                       name="last_name"
                       id="last_name"
                       required
                       placeholder=" "
                       value="{{ old('last_name') }}"
                       pattern=".{2,}"
                       type="text">

                <span class="label" data-placeholder="{{ __t('auth.last_name') }}*"></span>
            </div>

            <p class="error">&nbsp;@if($errors->has('last_name')){{ $errors->first('last_name') }}@endif</p>

            <div class="group{{ $errors->has('email') ? ' error' : '' }}">
                <input class="input"
                       name="email"
                       id="email"
                       required
                       placeholder=" "
                       value="{{ old('email') }}"
                       type="email">

                <span class="label" data-placeholder="{{ __t('auth.email') }}*"></span>
            </div>

            <p class="error">&nbsp;@if($errors->has('email')){{ $errors->first('email') }}@endif</p>

            <div class="group{{ $errors->has('password') ? ' error' : '' }}">
                <input class="input"
                       name="password"
                       id="password"
                       type="password"
                       required
                       placeholder=" "
                       value="{{ old('password') }}"
                       pattern=".{6,}">

                <span class="label" data-placeholder="{{ __t('auth.password') }}*"></span>
            </div>

            <p class="error">&nbsp;@if ($errors->has('password')){{ $errors->first('password') }}@endif</p>

            <div class="group{{ $errors->has('password_confirmation') ? ' error' : '' }}">
                <input class="input"
                       name="password_confirmation"
                       id="password_confirmation"
                       type="password"
                       required
                       placeholder=" "
                       value="{{ old('password_confirmation') }}"
                       pattern=".{6,}">

                <span class="label" data-placeholder="{{ __t('auth.password_confirmation') }}*"></span>
            </div>

            <p class="error">&nbsp;@if ($errors->has('password_confirmation')){{ $errors->first('password_confirmation') }}@endif</p>

            <button type="submit" class="submit">{{ __t('auth.login') }}</button>
        </form>
    </div>
@endsection
