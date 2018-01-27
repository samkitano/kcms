@component('mail::message')
# {{ __('kcms.mail.activate') }} {{ config('app.url') }}

{{ __('kcms.mail.hi') }}, {{ $user->first_name }}!

{{ __('kcms.mail.click_to_activate') }}

@component('mail::button', ['url' => route('front.verify').'?token='.$token])
    {{ __('kcms.mail.activate_btn') }}
@endcomponent

@slot('subcopy')
    {{ __('kcms.mail.activate_before') }} {{ Carbon\Carbon::now()->addDays(3)->format('d/m/Y') }}. {{ __('kcms.mail.otherwise_expires') }}.
    {{ __('kcms.mail.disclaimer') }}
@endslot

@slot('footer')
@endslot
@endcomponent
