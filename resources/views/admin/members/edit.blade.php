{{--
    Edit a resource

    @param array  $input
    @param int    $id
    @param string $profile
--}}

@extends('layouts.admin-master')

@section('title', __("kcms.{$resource}.profile"))

@section('content')
    @component('components.page_title', [
        'title' => __("kcms.{$resource}.profile"),
        'badge' => null,
        'href' => "/admin/{$resource}"
    ])@endcomponent
{{--TODO: Keep edit open when validator fails--}}
    <div>
        <button class="edit-profile btn btn-outline btn-outline-blue lg:sm-0"
                data-cancel="{{ __('kcms.actions.show') }}"
                data-edit="{{ __('kcms.actions.edit') }}"
                type="button">{{ __('kcms.actions.edit') }}</button>

        <button class="delete-profile btn btn-outline btn-outline-red lg:sm-0"
                data-id="{{ $id }}"
                data-resource="{{ __("kcms.{$resource}.resource_name_singular") }}"
                data-action="{{  action("Admin\\".ucfirst($resource)."Controller@destroy", $id) }}"
                data-redirect="{{ action("Admin\\".ucfirst($resource)."Controller@index") }}"
                type="button">{{ __('kcms.actions.delete') }}</button>
    </div>

    <div class="max-w-md mx-auto">
        <div class="user-profile">
            {!! $profile !!}
        </div>

        <div class="hidden profile-form max-w-md pb-4 px-4 mx-auto">
            <form class="form"
                  method="POST"
                  action="{{ action("Admin\\".ucfirst($resource)."Controller@update", $id) }}">
                @php
                    $msg = '<span class="px-1 text-grey">'
                         . __('kcms.alerts.gravatar_info')
                         . '</span>'
                         . '<a class="text-teal underline hover:text-teal-darker" target="_blank" href="https://gravatar.com" title="gravatar.com">gravatar.com</a>'
                @endphp

                @component('components.alert', [
                    'type' => 'info',
                    'message' => $msg,
                    'close' => true,
                    'destroy' => 'gravatar_info'
                ])@endcomponent

                {{ csrf_field() }}

                <input type="hidden" name="_method" value="PATCH">

                <div class="mb-4">
                    @foreach ($input as $k => $field) {{-- TODO: Change password --}}
                        @if($field['tag'] == 'input')
                            @component('components.input', [
                                'type' => $field['type'],
                                'name' => $k,
                                'label' => $field['label'],
                                'required' => true,
                                'value' => old($k) ? old($k) : $field['value'],
                                'error' => $errors->has($k) ? $errors->first($k) : null
                            ])@endcomponent
                        @endif

                        @if($field['tag'] == 'select')
                            @component('components.select', [
                                'name' => $k,
                                'label' => $field['label'],
                                'default' => old($k) ? old($k) : $field['value'],
                                'options' => $field['options']
                            ])@endcomponent
                        @endif
                    @endforeach
                </div>

                @component('components.submit_button', [
                    'text' => __('kcms.actions.update')
                ])@endcomponent
            </form>
        </div>
    </div>
@endsection
