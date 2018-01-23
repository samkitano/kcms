{{--
    @param string      $type
    @param string      $message
    @param bool        $close
    @param string|null $destroy
--}}

@php
    $common = 'M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32z';

    $path = [
        'info' => "{$common}M9 11V9h2v6H9v-4zm0-6h2v2H9V5z",
        'success' => "{$common}M6.7 9.29L9 11.6l4.3-4.3 1.4 1.42L9 14.4l-3.7-3.7 1.4-1.42z",
        'danger' => "{$common}M9 5h2v6H9V5zm0 8h2v2H9v-2z",
        'error' =>  "{$common}M9 5h2v6H9V5zm0 8h2v2H9v-2z",
        'warn' =>  "{$common}M9 5h2v6H9V5zm0 8h2v2H9v-2z",    // TODO
        'warning' =>  "{$common}M9 5h2v6H9V5zm0 8h2v2H9v-2z", // TODO
    ];
@endphp

<div role="alert" @if(isset($destroy)) data-hide="{{ $destroy }}" @endif
     class="hidden k-alert alert alert-{{ $type }}">
    <div class="alert-outer">
        <div class="alert-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" class="fill-current h-6 w-6 mr-4 text-teal">
                <title>info</title>
                <path d="{{ $path[$type] }}"></path>
            </svg>
        </div>

        <div class="alert-message"><span>{!! $message !!}</span></div>

        @if (isset($close) && $close)
            <div class="alert-close">
                <svg role="button"
                     xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 20 20"
                     class="close-alert-button"><title>Close</title>
                    <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm1.41-1.41A8 8 0 1 0 15.66 4.34 8 8 0 0 0 4.34 15.66zm9.9-8.49L11.41 10l2.83 2.83-1.41 1.41L10 11.41l-2.83 2.83-1.41-1.41L8.59 10 5.76 7.17l1.41-1.41L10 8.59l2.83-2.83 1.41 1.41z"></path>
                </svg>
            </div>
        @endif
    </div>
</div>
