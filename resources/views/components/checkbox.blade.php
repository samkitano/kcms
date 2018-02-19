{{--
    @param array  $errors
    @param array  $field
    @param string $name
    @param array  $old
--}}

<label class="checkbox"><input name="{{ $name }}"
                               id="{{ $name }}"
                               type="checkbox"
                               checked="{{ $field['value'] || $old }}"
    ><span class="{{ $name }}"> {{ $field['label'] }}</span
></label>
