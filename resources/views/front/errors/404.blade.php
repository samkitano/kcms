@extends('layouts.auth-master')

@section('title', '404 - '.__t('alerts.404'))

@section('content')
    <div class="system-error">
        <h1 class="system-error_heading">{{ __t('alerts.something_w_wrong') }}</h1>

        <p class="system-error_description">{{ __t('alerts.404') }}</p>

        <p><a class="btn btn-outline" href="/">{{ __t('buttons.back_home') }}</a></p>
    </div>
@endsection
