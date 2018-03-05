{{--
    @param string      $default
    @param array       $options ['value', 'option']
    @param string      $label
    @param string      $name
    @param string|null $size
    FIXME: $old
--}}

<div class="form-block flex flex-col @if(isset($size)){{$size}}@else w-1/3 @endif">
    <label class="label" for="role">{{ $label }}</label>
    <div class="flex">
        <select id="{{ $name }}"
                name="{{ $name }}"
                class="select">
            @foreach($options as $value => $option)
                <option value="{{ $value }}"@if($value == $default || old($name) == $value) selected @endif>{{ $option }}</option>
            @endforeach
        </select>

        <div class="select-arrow">
            <svg xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 20 20"
                 role="img"
                 class="fill-current h-4 w-4">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"></path>
            </svg>
        </div>
    </div>
</div>
