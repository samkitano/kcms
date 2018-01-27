@component('mail::message')
# {{ __('kcms.welcome') }}

{{ __('kcms.mail.hi') }} {{ $user->first_name }},

{{ __('kcms.mail.welcome_text') }}
@endcomponent
