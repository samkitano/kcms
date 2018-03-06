{{--
    Create resource

    @param array  $input        Resource Data
    @param string $resource     Resource name
    @param string $controller   Controller name
    @param string $namespace    Controller namespace
--}}

@extends('layouts.admin-master')

@section('title', __t("{$resource}.edit"))

@section('content')
    <section class="edit-resource">
            @component('components.back_to_index',
                ['href' => action("{$controller}@index")]
            )@endcomponent

        <form class="form"
              method="POST"
              action="{{ action("Admin\\".ucfirst($resource)."Controller@update", $id) }}">
            @component('components.alert', [
                'type' => 'info',
                'message' => __t('alerts.some_fields_required'),
                'close' => true,
                'destroy' => 'some_fields_required'
            ])@endcomponent

            @component('components.hidden-fields', [
                'method' => 'PATCH'
            ])@endcomponent

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

            <div class="flex">
                @component('components.submit_button', [
                    'text' => __t('buttons.update')
                ])@endcomponent

                @component('components.delete-btn', [
                    'id' => $id,
                    'singular' => $singular,
                    'controller' => $controller
                ])@endcomponent
            </div>
        </form>
    </section>
@endsection

@push('postScripts')
    <script src="/js/tinymce/tinymce.js"></script>
@endpush
