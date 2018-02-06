@extends('layouts.auth-master')

@section('title', '404 - '.__('kcms.errors.404'))

@section('content')
    <div class="system-error">
        <h1 class="system-error_heading">{{ __('kcms.errors.something_w_wrong') }}</h1>

        <p class="system-error_description">{{ __('kcms.errors.404') }}</p>

        <p><a class="btn btn-outline" href="/">{{ __('kcms.errors.back_home') }}</a></p>
    </div>
@endsection
