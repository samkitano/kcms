{{--
    @param array  $errors
    @param array  $field
    @param string $name
    @param array  $old
--}}

<div class="mb-4">
    <label class="label"
           for="{{ $name }}"
        >{{ $field['label'] }}@if(isset($field['required']))*@endif</label
    >

    <input class="input{{ $errors->has($name) ? ' error' : '' }}"
           id="{{ $name }}"
           name="{{ $name }}"
           title="{{ $field['label'] }}"
           type="{{ $field['type'] }}"
           value="{{ $old ?? $field['value'] }}"
    >

    @if($errors->has($name))<p class="error">{{ $errors->first($name) }}</p>@endif
</div>
