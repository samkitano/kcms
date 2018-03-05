<label for="{{ $name }}" class="label">{{ $field['label'] }}</label>

<textarea class="input has-editor" name="{{ $name }}" id="{{ $name }}" cols="30" rows="10">
    {{ $field['value'] }}
</textarea>
