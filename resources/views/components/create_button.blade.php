{{--
    @param string $href
    @param string $text
    @param bool   $condition
--}}

@if ($condition)
    <div class="button mb-4">
        <a class="create-user button" href="{{ $href }}"><span class="mr-1"
            >@component('svg.plus')@endcomponent</span
            > {{ $text }}</a
        >
    </div>
@endif
