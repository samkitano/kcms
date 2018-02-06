@php
    if (auth('admin')->check()) {
        $layout = 'layouts.admin-master';
    } else {
        $layout = 'layouts.auth-master';
    }
@endphp

@extends($layout)

@section('title', '404 - '.__('kcms.errors.404'))

@section('content')
    <div class="container">
        <div class="system-error panel">
            <h1 style="color:maroon" class="system-error_heading title">ROOM 404</h1>

            <p class="system-error_description title">{{ __('kcms.errors.404') }}</p>

            <p><a class="btn btn-outline" href="/">{{ __('kcms.errors.back_home') }}</a></p>
        </div>
    </div>
@endsection
