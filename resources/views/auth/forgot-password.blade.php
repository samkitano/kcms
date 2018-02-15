@extends('layouts.auth-master')

@section('title', __t('auth.reset'))

@section('content')
    <div class="container">
        @if(session()->has('status'))
            <div class="panel">
                <div class="title"><span class="logo">{{ config('app.name') }}</span></div>

                <div class="title">{{ __t('auth.reset') }}</div>

                <div class="info">{{ session('status') }}</div>

                <div class="options">
                    <a class="back" href="/">{{ __t('auth.back_home') }}</a>
                </div>
                {{ session()->forget('status') }}
            </div>
        @else
            <form class="panel" method="POST" action="{{ $action }}">
                {{ csrf_field() }}

                <div class="title"><span class="logo">{{ config('app.name') }}</span></div>

                <div class="title">{{ __t('auth.reset') }}</div>

                <div class="info">{{ __t('auth.forgot_info') }}</div>

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

                <div class="options">
                    <a class="back" href="{{ $back }}">{{ __t('auth.back') }}</a>
                </div>

                <button type="submit" class="submit">{{ __t('auth.send') }}</button>
            </form>
        @endif
    </div>
@endsection
