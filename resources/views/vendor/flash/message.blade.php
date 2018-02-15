@php
    $color = [
        'success' => 'green',
        'danger' => 'red',
        'error' => 'red',
        'info' => 'teal',
        'warn' => 'orange',
        'warning' => 'orange',
        'default' => 'cyan',
    ];

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

@foreach (session('flash_notification', collect())->toArray() as $message)
    <div role="alert"
         class="flash-notification mb-6 border-l-4 rounded-l px-4 py-3 shadow-md bg-{{ $color[$message['level']] }}-lighter border-{{ $color[$message['level']] }} text-{{ $color[$message['level']] }}-darkest">
        <div class="flex">
            <div class="py-1 self-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" class="fill-current h-6 w-6 mr-4 text-teal">
                    <title>info</title>
                    <path d="{{ $path[$message['level']] }}"></path>
                </svg>
            </div>

            <div class="self-center mr-6"><p class="text-sm">{!! $message['message'] !!}</p></div>

            @if ($message['important'])
                <div class="absolute pin-t pin-b pin-r px-1 py-1">
                    <svg role="button"
                         xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 20 20"
                         class="fill-current h-6 w-6 close-alert-button"><title>Close</title>
                        <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"></path>
                    </svg>
                </div>
            @endif
        </div>
    </div>
@endforeach

{{ session()->forget('flash_notification') }}
