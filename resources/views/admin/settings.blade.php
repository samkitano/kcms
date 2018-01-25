@extends('layouts.admin-master')

@section('title', __('kcms.menu.settings'))

@section('content')
    {{--<div class="container mx-auto">--}}
        @component('components.page_title', [
            'title' => __('kcms.menu.settings')
        ])@endcomponent

        <div class="border rounded shadow max-w-md mx-auto">
            <div class="font-bold text-xl py-2 bg-teal text-white border-b border-teal-lighter rounded-t px-2 has-collapse">
                {{ __('kcms.alerts.hidden_alerts') }}
                <span class="float-right"><a title="{{ __('kcms.collapse') }}" class="collapser open hover:text-blue-darker" href="#">⇧</a></span>
            </div>

            <div data-collapse="{{ __('kcms.alerts.hidden_alerts') }}" class="open settings_hidden-alerts collapsible overflow-hidden"></div>
        </div>
    {{--</div>--}}
@endsection
