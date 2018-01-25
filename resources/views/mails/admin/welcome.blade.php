@component('mail::message')
# {{ __('auth.welcome') }}

{{ __('mail.salutation') }} {{ $user->first_name }},

{{ __('auth.access') }} [{{ Request::getHost() }}]({{ action('Admin\Auth\LoginController@login') }}).

@component('mail::button', ['url' => action('Admin\Auth\LoginController@login')])
{{ __('auth.login') }}
@endcomponent
@endcomponent
