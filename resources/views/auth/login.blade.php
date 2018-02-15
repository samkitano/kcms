@extends('layouts.auth-master')

@section('title', __t('auth.login'))

@section('content')
    <div class="container">
        <form class="panel" method="POST" action="{{ $action }}">
            {{ csrf_field() }}

            <div class="title"><span class="logo">{{ config('app.name') }}</span></div>

            <div class="title">{{ __t('auth.login') }}</div>

            <div class="info">{{ __t('auth.fill_login') }}</div>

            <div class="group{{ $errors->has('email') ? ' error' : '' }}">
                <input class="input"
                       name="email"
                       id="email"
                       required
                       autofocus
                       placeholder=" "
                       value="{{ old('email') }}"
                       type="email">

                <span class="label" data-placeholder="{{ __t('auth.email') }}*"></span>
            </div>

            <p class="error">&nbsp;@if ($errors->has('email')){{ $errors->first('email') }}@endif</p>

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

            <div class="options">
                <label class="checkbox"><input name="remember"
                                               id="remember"
                                               type="checkbox"
                                        ><span class="remember">{{ __t('auth.remember') }}</span
                ></label>
                <a class="forgot" href="{{ $forgot }}">{{ __t('auth.forgot') }}</a>
            </div>

            <button type="submit" class="submit">{{ __t('auth.login') }}</button>
        </form>
    </div>
@endsection
