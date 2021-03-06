{{--
    Create a resource

    @param array  $input
    @param string $resource
--}}

@extends('layouts.admin-master')

@section('title', __t("{$resource}.create"))

@section('content')
    @if ($resource == 'administrators' && (! superAdmin()))
        @component('components.alert', [
            'type' => 'error',
            'message' => __t('alerts.unauthorized')
        ])@endcomponent
    @else
        <form class="form"
              method="POST"
              action="{{ action("Admin\\".ucfirst($resource)."Controller@store") }}">
            @component('components.alert', [
                'type' => 'info',
                'message' => __t('alerts.password_instructions_will_be_sent_by_email'),
                'close' => true,
                'destroy' => 'password_instructions_will_be_sent_by_email'
            ])@endcomponent

            @component('components.alert', [
                'type' => 'info',
                'message' => __t('alerts.all_fields_required'),
                'close' => true,
                'destroy' => 'all_fields_required'
            ])@endcomponent

            {{ csrf_field() }}

            <div class="form-block">
                @foreach ($input as $k => $field)
                    @if($field['tag'] == 'input')
                        @component('components.input', [
                            'type' => $field['type'],
                            'name' => $k,
                            'label' => $field['label'],
                            'required' => true,
                            'value' => old($k) ? old($k) : '',
                            'error' => $errors->has($k) ? $errors->first($k) : null
                        ])@endcomponent
                    @endif

                    @if($field['tag'] == 'select')
                        @component('components.select', [
                            'name' => $k,
                            'label' => $field['label'],
                            'default' => old($k) ? old($k) : $field['default'],
                            'options' => $field['options']
                        ])@endcomponent
                    @endif
                @endforeach
            </div>

            @component('components.submit_button', [
                'text' => __t('buttons.create')
            ])@endcomponent
        </form>
    @endif
@endsection
