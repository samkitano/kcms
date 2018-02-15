@component('mail::message')
# {{ __t('mail.set_password') }}

{{ __t('mail.hi') }}, {{ $user->first_name }}!

{{ __t('mail.admin_granted') }} [{{ Request::getHost() }}]({{ action('Admin\Auth\ResetPasswordController@showResetForm', [$token]) }}?email={{ urlencode($user->email) }}).


@component('mail::button', ['url' => action('Admin\Auth\ResetPasswordController@showResetForm', [$token]).'?email='.urlencode($user->email)])
{{ __t('mail.set_your_password') }}
@endcomponent

@component('mail::panel')
{{ __t('mail.disclaimer') }}
@endcomponent

@slot('subcopy')
{{ __t('mail.set_password_before') }} {{ Carbon\Carbon::now()->addDays(3)->format('d/m/Y') }}. {{ __t('mail.otherwise_expires') }}.
@endslot

@slot('footer')
@endslot
@endcomponent
