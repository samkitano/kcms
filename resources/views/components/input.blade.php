{{--
    @param string $value
    @param array  $type
    @param string $label
    @param string $name
    @param bool   $required
    @param string $error
--}}

<div class="mb-4">
    <label class="label" for="{{ $name }}">{{ $label }}@if(isset($required))*@endif</label>
    <input class="input{{ isset($error) ? ' error' : '' }}"
           id="{{ $name }}"
           name="{{ $name }}"
           title="{{ $label }}"
           type="{{ $type }}"
           value="{{ isset($value) ? $value : '' }}"
    >
    @if(isset($error))<p class="error">{{ $error }}</p>@endif
</div>
