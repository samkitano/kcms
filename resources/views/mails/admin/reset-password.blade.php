@component('mail::message')
# {{ __('kcms.mail.reset_password') }}

{{ __('kcms.mail.hi') }}, {{ $user->first_name }}!

{{ __('kcms.mail.requested_pw') }} [{{ Request::getHost() }}]({{ action('Admin\Auth\ResetPasswordController@showResetForm', [$token]) }}?email={{ urlencode($user->email) }}).

@component('mail::button', ['url' => action('Admin\Auth\ResetPasswordController@showResetForm', [$token]).'?email='.urlencode($user->email)])
{{ __('kcms.mail.change_password') }}
@endcomponent

@component('mail::panel')
{{ __('kcms.mail.change_pw_mistake') }}
@endcomponent

@slot('subcopy')
{{ __('kcms.mail.set_password_before') }} {{ Carbon\Carbon::now()->addDays(3)->format('d/m/Y') }}. {{ __('kcms.mail.otherwise_expires') }}.
{{ __('kcms.mail.disclaimer') }}
@endslot

@slot('footer')
@endslot
@endcomponent
