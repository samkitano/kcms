@extends('layouts.admin-master')

@section('title', __('kcms.menu.settings'))

@section('content')
    @component('components.page_title', [
        'title' => __('kcms.menu.settings')
    ])@endcomponent

    <div class="panel panel-md">
        <div class="panel-title flex justify-between items-center">
            <span>{{ __('kcms.cache') }}</span>

            <a href="#"
               class="collapse-button"
               data-target="{{ __('kcms.cache') }}"
               title="{{ __('kcms.collapse') }}"
            ><svg class="fill-current"
                  height="20"
                  viewBox="0 0 20 20"
                  width="20"
                  xmlns="http://www.w3.org/2000/svg"><path d="M7 10v8h6v-8h5l-8-8-8 8h5z"></path
                    ></svg
            ></a>
        </div>

        <div class="panel-body">
            <a href="#" class="btn btn-blue clear-cache">{{ __('kcms.actions.clear_cache') }}</a>
        </div>
    </div>

    <div class="panel panel-md">
        <div class="panel-title flex justify-between items-center">
            <span>{{ __('kcms.alerts.hidden_alerts') }}</span>

            <a title="{{ __('kcms.actions.collapse') }}"
               class="collapse-button"
               data-target="{{ __('kcms.alerts.hidden_alerts') }}"
               href="#"
            ><svg class="fill-current"
                  height="20"
                  viewBox="0 0 20 20"
                  width="20"
                  xmlns="http://www.w3.org/2000/svg"><path d="M7 10v8h6v-8h5l-8-8-8 8h5z"></path
                    ></svg
            ></a>
        </div>

        <div class="panel-body settings_hidden-alerts"></div>
    </div>
    {{--{!! phpinfo() !!}--}}
@endsection
