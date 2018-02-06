@extends('layouts.admin-master')

@section('title', 'Dashboard')

@section('content')
    <div class="panel panel-md">
        <div class="panel-title flex justify-between items-center">
            <span>{{ __('kcms.security') }}</span>

            <a href="#"
               class="collapse-button"
               data-target="{{ __('kcms.security') }}"
               title="{{ __('kcms.collapse') }}"
            ><svg class="fill-current"
                  height="20"
                  viewBox="0 0 20 20"
                  width="20"
                  xmlns="http://www.w3.org/2000/svg"><path d="M7 10v8h6v-8h5l-8-8-8 8h5z"></path
                    ></svg
                ></a>
        </div>

        <div class="panel-body">
            @if(! count($securityCheck))
                <p class="text-green-dark font-bold text-2xl mb-4">{{ __('kcms.alerts.no_vulnerabilities_detected') }}</p>
            @else
                @foreach($securityCheck as $package => $descriptor)
                    <div class="mb-4">
                        <p class="border-b border-red-dark flex justify-between text-red-dark font-bold text-2xl mb-2"><span>{{ $package }}</span> <span>{{ $descriptor['version'] }}</span></p>
                        @foreach($descriptor['advisories'] as $advisory => $content)
                            <p class="text-grey-darker text-lg pl-2"><strong>{{ __('kcms.external.advisory') }} </strong>{{ $advisory }}:</p>
                            @foreach($content as $key => $val)
                                <p class="text-grey-dark pl-6"><strong>{{ __("kcms.external.{$key}") }}:</strong> {{ $val }}</p>
                            @endforeach
                        @endforeach
                    </div>
                @endforeach
            @endif
        </div>
    </div>
@endsection
