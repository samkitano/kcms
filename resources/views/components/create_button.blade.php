{{--
    @param string $href
    @param string $text
    @param bool   $condition
--}}

@if ($condition)
    <a class="create-user btn btn-outline btn-outline-blue" href="{{ $href }}">{{ $text }}</a>
@endif
