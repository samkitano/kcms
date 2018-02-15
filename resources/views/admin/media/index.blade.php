@extends('layouts.admin-master')

@section('title', __('kcms.menu.media'))

@section('content')
    @if(! count($media))
        <div>
            <h1>{{ __t('media.no_media') }}</h1>
        </div>
    @else

    @endif
@endsection
