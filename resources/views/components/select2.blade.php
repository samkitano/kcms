{{--
    @param array       $errors
    @param array       $field
    @param string      $name
    @param array       $old
--}}

<label class="label" for="{{ $name }}">{{ $field['label'] }}</label>

<div class="flex">
    <select id="{{ $name }}"
            style="min-width: 50%"
            @if(isset($field['placeholder']) && $field['placeholder'])data-placeholder="{{ $field['placeholder'] }}" @endif
            name="{{ $name }}"
            @if(isset($field['multiple']) && $field['multiple'])multiple @endif
            class="select2 {{ isset($field['allow_new']) && $field['allow_new'] ? 'select2-with-tags' : 'select2-simple' }}">

        @if($field['default'] == null)<option value=""></option>@endif

        @foreach($field['options'] as $value => $option)
            <option value="{{ $value }}"
                    @if($value == $field['default'] || $old == $value) selected @endif>{{ $option }}</option
            >
        @endforeach
    </select>
</div>
