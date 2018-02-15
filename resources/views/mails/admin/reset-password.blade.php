@component('mail::message')
# {{ __t('mail.reset_password') }}

{{ __t('mail.hi') }}, {{ $user->first_name }}!

{{ __t('mail.requested_pw') }} [{{ Request::getHost() }}]({{ action('Admin\Auth\ResetPasswordController@showResetForm', [$token]) }}?email={{ urlencode($user->email) }}).

@component('mail::button', ['url' => action('Admin\Auth\ResetPasswordController@showResetForm', [$token]).'?email='.urlencode($user->email)])
{{ __t('mail.change_password') }}
@endcomponent

@component('mail::panel')
{{ __t('mail.change_pw_mistake') }}
@endcomponent

@slot('subcopy')
{{ __t('mail.set_password_before') }} {{ Carbon\Carbon::now()->addDays(3)->format('d/m/Y') }}. {{ __t('mail.otherwise_expires') }}.
{{ __t('mail.disclaimer') }}
@endslot

@slot('footer')
@endslot
@endcomponent
