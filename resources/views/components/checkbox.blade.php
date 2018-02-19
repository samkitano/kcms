{{--
    @param array  $errors
    @param array  $field
    @param string $name
    @param array  $old
--}}

<label for="{{ $name }}" class="label">{{ $field['label'] }}</label>
<input name="{{ $name }}"
       id="{{ $name }}"
       type="checkbox"
       @if(isset($field['value']) && $field['value'] || $old)checked="checked" @endif>
