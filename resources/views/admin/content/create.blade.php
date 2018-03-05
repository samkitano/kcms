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
@endsection

@push('postScripts')
    <script src="/js/tinymce/tinymce.js"></script>

    <script>
      window.onload = function() {
        $(':checkbox').switchify({
          width: 100,
          checkedText: '{!! __t('articles.published') !!}',
          uncheckedText: '{!! __t('articles.draft') !!}'
        })

        tinymce.init({
          themes: 'kcms',
          language: '{{ app()->getLocale() }}',
          skin: 'kcms',
          selector: '.has-editor',
          plugins: 'code print preview fullpage searchreplace autolink visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists textcolor wordcount imagetools contextmenu colorpicker textpattern help',
          toolbar1: 'formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat | image',
          image_advtab: true,
          images_upload_url: 'postAcceptor.php',
          content_css: [
            '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
          ]
        })
      }
    </script>
@endpush
