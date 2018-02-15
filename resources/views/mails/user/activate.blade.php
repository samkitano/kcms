@component('mail::message')
# {{ __t('mail.activate') }} {{ config('app.url') }}

{{ __t('mail.hi') }}, {{ $user->first_name }}!

{{ __t('mail.click_to_activate') }}

@component('mail::button', ['url' => route('front.verify').'?token='.$token])
    {{ __t('mail.activate_btn') }}
@endcomponent

@slot('subcopy')
    {{ __t('mail.activate_before') }} {{ Carbon\Carbon::now()->addDays(3)->format('d/m/Y') }}. {{ __t('mail.otherwise_expires') }}.
    {{ __t('mail.disclaimer') }}
@endslot

@slot('footer')
@endslot
@endcomponent
