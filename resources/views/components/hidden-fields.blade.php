{{--
    Form hidden fields

    @param string|null $method The method for _method field
--}}

{{ csrf_field() }}

@if(isset($method))
    <input type="hidden" name="_method" id="_method" value="{{ $method }}">
@endif
