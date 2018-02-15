@component('mail::message')
# {{ __t('welcome') }}

{{ __t('mail.hi') }} {{ $user->first_name }},

{{ __t('mail.welcome_text') }}
@endcomponent
