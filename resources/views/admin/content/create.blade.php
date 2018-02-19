{{--
    Create a resource

    @param array  $input
    @param string $resource
--}}

@extends('layouts.admin-master')

@section('title', __t("{$resource}.create"))

@section('content')
    <form class="form"
          method="POST"
          action="{{ action("Admin\\".ucfirst($resource)."Controller@store") }}">
        @component('components.alert', [
            'type' => 'info',
            'message' => __t('alerts.some_fields_required'),
            'close' => true,
            'destroy' => 'some_fields_required'
        ])@endcomponent

        {{ csrf_field() }}

        <div class="form-block">
            @foreach ($input as $k => $field)
                <div class="mb-4">
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
    <script>
      window.onload = function() {
        $(':checkbox').switchify({
          width: 100,
          checkedText: '{!! __t('articles.published') !!}',
          uncheckedText: '{!! __t('articles.draft') !!}'
        })
      }
    </script>
@endsection
