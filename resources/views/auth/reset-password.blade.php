@extends($layout)

@section('title', __('auth.set'))

@section('content')
    @if ($layout == 'layouts.admin-master')
        <div class="flex content-center flex-wrap text-grey h-screen font-hairline" style="margin-top: -48px;">
    @endif

    <div class="panel panel-md flex">
        <div class="w-1/2 bg-cover rounded-l bg-center overflow-hidden"
             style="background-image: url('{{ $user->gravatar }}')"
             title="Avatar"></div>

        <div class="w-1/2">
            <div class="font-bold text-xl py-2 text-center bg-teal text-white border-b border-teal-lighter rounded-tr">
                {{ __('auth.set') }}
            </div>

            <form class="form"
                  method="POST"
                  action="{{action(request()->isFront() ? 'Front\Auth\ResetPasswordController@reset' : 'Admin\Auth\ResetPasswordController@reset')}}">

                <input type="hidden" name="token" id="token" value="{{ $token }}">

                <input type="hidden" name="email" id="email" value="{{ $email }}">

                @if(isset($invite) && $invite)
                    <input type="hidden" name="invite" id="invite" value="1">
                @endif

                {{ csrf_field() }}

                <div class="form-block">
                    <label class="label"
                           for="password">{{ __('auth.password') }}*</label>

                    <input autocomplete="false"
                           class="input{{ $errors->has('password') ? ' error' : '' }}"
                           id="password"
                           name="password"
                           type="password">

                    @if($errors->has('password'))
                        <p class="error">{{ $errors->first('password') }}</p>
                    @endif
                </div>

                <div class="form-block">
                    <label class="label"
                           for="password_confirmation">{{ __('auth.password_confirmation') }}*</label>

                    <input autocomplete="false"
                           class="input{{ $errors->has('password_confirmation') ? ' error' : '' }}"
                           id="password_confirmation"
                           name="password_confirmation"
                           type="password"
                    >

                    @if($errors->has('password_confirmation'))
                        <p class="error">{{ $errors->first('password_confirmation') }}</p>
                    @endif
                </div>

                <div class="form-block">
                    <button class="submit btn btn-blue"
                            type="submit">{{ __('auth.reset') }}</button>
                </div>
            </form>
        </div>
    </div>

    @if($layout == 'layouts.admin-master')
        </div>
    @endif
@endsection
