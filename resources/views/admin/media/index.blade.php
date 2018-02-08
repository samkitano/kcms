@extends('layouts.admin-master')

@section('title', __('kcms.menu.media'))

@section('content')
    @if(! count($media))
        <div>
            <h1>No media found in storage.</h1>
        </div>
    @else

    @endif
@endsection
