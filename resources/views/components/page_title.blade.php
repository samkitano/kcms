{{--
    @param string     $title
    @param string|int $badge
    @param string     $href
--}}

<div class="page-title">
    @if(isset($href))
        @component('components.back_to_index', [
            'href' => $href
        ])@endcomponent
    @endif

    <h1>{{ $title }}</h1>

    @if(isset($badge))
            <span>{{ $badge }}</span>
    @endif
</div>
