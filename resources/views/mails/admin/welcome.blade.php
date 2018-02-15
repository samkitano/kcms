@component('mail::message')
# {{ __t('auth.welcome') }}

{{ __t('mail.salutation') }} {{ $user->first_name }},

{{ __t('auth.access') }} [{{ Request::getHost() }}]({{ action('Admin\Auth\LoginController@login') }}).

@component('mail::button', ['url' => action('Admin\Auth\LoginController@login')])
{{ __t('auth.login') }}
@endcomponent
@endcomponent
