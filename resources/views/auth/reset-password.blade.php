@extends('layouts.auth-master')

@section('title', __('auth.set'))

@section('content')
    <div class="container">
        <form class="panel" method="POST" action="{{ $action }}">
            {{ csrf_field() }}

            <input type="hidden" name="token" id="token" value="{{ $token }}">

            <input type="hidden" name="email" id="email" value="{{ $email }}">

            @if(isset($invite) && $invite)
                <input type="hidden" name="invite" id="invite" value="1">
            @endif

            <div class="title"><span class="logo">{{ config('app.name') }}</span></div>

            <div class="title">{{ __('auth.reset') }}</div>

            <div class="info">{{ __('auth.set') }}</div>

            <div class="group{{ $errors->has('password') ? ' error' : '' }}">
                <input class="input"
                       name="password"
                       id="password"
                       type="password"
                       required
                       autofocus
                       placeholder=" "
                       value="{{ old('password') }}"
                       pattern=".{6,}">

                <span class="label" data-placeholder="{{ __('auth.password') }}*"></span>
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

                <span class="label" data-placeholder="{{ __('auth.password_confirmation') }}*"></span>
            </div>

            <p class="error">&nbsp;@if ($errors->has('password_confirmation')){{ $errors->first('password_confirmation') }}@endif</p>

            <button type="submit" class="submit">{{ __('auth.reset') }}</button>
        </form>
    </div>
@endsection
