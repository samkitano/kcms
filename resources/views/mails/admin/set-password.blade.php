@component('mail::message')
# {{ __('kcms.mail.set_password') }}

{{ __('kcms.mail.hi') }}, {{ $user->first_name }}!

{{ __('kcms.mail.admin_granted') }} [{{ Request::getHost() }}]({{ action('Admin\Auth\ResetPasswordController@showResetForm', [$token]) }}?email={{ urlencode($user->email) }}).


@component('mail::button', ['url' => action('Admin\Auth\ResetPasswordController@showResetForm', [$token]).'?email='.urlencode($user->email)])
{{ __('kcms.mail.set_your_password') }}
@endcomponent

@component('mail::panel')
{{ __('kcms.mail.disclaimer') }}
@endcomponent

@slot('subcopy')
{{ __('kcms.mail.set_password_before') }} {{ Carbon\Carbon::now()->addDays(3)->format('d/m/Y') }}. {{ __('kcms.mail.otherwise_expires') }}.
@endslot

@slot('footer')
@endslot
@endcomponent
