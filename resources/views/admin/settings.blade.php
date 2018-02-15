@extends('layouts.admin-master')

@section('title', __t('menu.settings'))

@section('content')
    @component('components.page_title', [
        'title' => __t('menu.settings')
    ])@endcomponent

    <div class="panel panel-md">
        <div class="panel-title flex justify-between items-center">
            <span>{{ __t('settings.cache') }}</span>

            <a href="#"
               class="collapse-button"
               data-target="{{ __t('settings.cache') }}"
               title="{{ __t('buttons.collapse') }}"
            ><svg class="fill-current"
                  height="20"
                  viewBox="0 0 20 20"
                  width="20"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"><path d="M7 10v8h6v-8h5l-8-8-8 8h5z"></path
                    ></svg
            ></a>
        </div>

        <div class="panel-body">
            <a href="#" class="btn btn-blue clear-cache">{{ __t('buttons.clear_cache') }}</a>
        </div>
    </div>

    <div class="panel panel-md">
        <div class="panel-title flex justify-between items-center">
            <span>{{ __t('alerts.hidden_alerts') }}</span>

            <a title="{{ __t('buttons.collapse') }}"
               class="collapse-button"
               data-target="{{ __t('alerts.hidden_alerts') }}"
               href="#"
            ><svg class="fill-current"
                  height="20"
                  viewBox="0 0 20 20"
                  width="20"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"><path d="M7 10v8h6v-8h5l-8-8-8 8h5z"></path
                    ></svg
            ></a>
        </div>

        <div class="panel-body settings_hidden-alerts"></div>
    </div>
    {{--{!! phpinfo() !!}--}}
@endsection
