{{--
    Create a resource

    @param array  $input
    @param string $resource
--}}

@extends('layouts.admin-master')

@section('title', __t("{$resource}.edit"))

@section('content')
    <form class="form"
          method="POST"
          action="{{ action("Admin\\".ucfirst($resource)."Controller@update", $id) }}">
        @component('components.alert', [
            'type' => 'info',
            'message' => __t('alerts.some_fields_required'),
            'close' => true,
            'destroy' => 'some_fields_required'
        ])@endcomponent

        {{ csrf_field() }}
        <input type="hidden" name="_method" id="_method" value="PATCH">

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
            'text' => __t('buttons.update')
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
          plugins: 'code print preview searchreplace autolink visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists textcolor wordcount imagetools contextmenu colorpicker textpattern',
          toolbar1: 'styleselect | bold italic strikethrough forecolor backcolor | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat',
          toolbar2: 'link | image',
          image_advtab: true,
          images_upload_url: 'postAcceptor.php',
          content_css: [
            '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
          ],
          style_formats: [
            { title: 'Headers', items: [
                { title: 'h1', block: 'h1' },
                { title: 'h2', block: 'h2' },
                { title: 'h3', block: 'h3' },
                { title: 'h4', block: 'h4' },
                { title: 'h5', block: 'h5' },
                { title: 'h6', block: 'h6' }
              ] },
            { title: 'Blocks', items: [
                { title: 'p', block: 'p' },
                { title: 'div', block: 'div' },
                { title: 'pre', block: 'pre' }
              ] },
            { title: 'Containers', items: [
                { title: 'section', block: 'section', wrapper: true, merge_siblings: false },
                { title: 'article', block: 'article', wrapper: true, merge_siblings: false },
                { title: 'blockquote', block: 'blockquote', wrapper: true },
                { title: 'hgroup', block: 'hgroup', wrapper: true },
                { title: 'aside', block: 'aside', wrapper: true },
                { title: 'figure', block: 'figure', wrapper: true }
              ] }
          ],
          visualblocks_default_state: true,
          end_container_on_empty_block: true
        })
      }
    </script>
@endpush
