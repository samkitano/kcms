{{--
    Create a resource

    @param array  $input        Resource Data
    @param string $resource     Resource name
    @param string $controller   Controller name
    @param string $namespace    Controller namespace
--}}

@extends('layouts.admin-master')

@section('title', __t("{$resource}.create"))

@section('content')
    <section class="create-resource">
        <form class="form"
              method="POST"
              action="{{ action("{$controller}@store") }}">
            @component('components.back_to_index',
                ['href' => action("{$controller}@index")]
            )@endcomponent

            @component('components.alert', [
                'type' => 'info',
                'message' => __t('alerts.some_fields_required'),
                'close' => true,
                'destroy' => 'some_fields_required'
            ])@endcomponent

            @component('components.hidden-fields')@endcomponent

            <div class="form-block">
                @foreach ($input as $k => $field)
                    <div class="f-group">
                        @component("components.{$field['tag']}", [
                            'errors' => $errors,
                            'field' => $field,
                            'name' => $k,
                            'old' => old($k),
                        ])@endcomponent
                    </div>
                @endforeach
            </div>

            @component('components.submit_button', [
                'text' => __t('buttons.create')
            ])@endcomponent
        </form>
    </section>
@endsection

@push('postScripts')
    <script src="/js/tinymce/tinymce.js"></script>
@endpush
