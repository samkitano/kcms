@extends($layout)

@section('title', trans('auth.reset'))

@section('content')
    @if ($layout == 'layouts.admin-master')
        <div class="flex content-center flex-wrap text-grey h-screen font-hairline" style="margin-top: -48px;">
    @endif

    <div role="alert"
         class="mx-auto w-full max-w-sm mb-6 border-l-4 rounded-l px-4 py-3 shadow-md bg-teal-lighter border-teal text-teal-darkest"
         style="animation-duration: 0.3s;">
        <div class="flex">
            <div class="py-1 self-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                     class="fill-current h-6 w-6 mr-4 text-teal"><title>info</title>
                    <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"></path>
                </svg>
            </div>
            <div class="self-center mr-6"><p class="text-sm font-light">{{ session('status')?: __('auth.forgot_info') }}</p></div>
        </div>
    </div>

    <div class="panel panel-sm">
            <div class="panel-title">
                {{ __('auth.reset') }}
            </div>

            <form class="form"
                  method="POST"
                  action="{{action('Front\Auth\ForgotPasswordController@sendResetLinkEmail')}}">

                {{ csrf_field() }}

                <div class="form-block">
                    <label class="label"
                           for="email">{{ __('auth.email') }}*</label>

                    <input class="input{{ $errors->has('email') ? ' error' : '' }}"
                           id="email"
                           name="email"
                           type="email"
                           value="{{ old('email') }}"
                    >

                    @if ($errors->has('email'))
                        <p class="error">{{ $errors->first('email') }}</p>
                    @endif
                </div>

                <div class="sm:flex sm:items-center sm:justify-between form-block">
                    <button dusk="submit-forgot-pw-button" class="btn btn-blue" type="submit">{{ __('auth.send') }}</button>

                    <a class="block font-bold my-4 sm:my-0 sm:inline-block align-baseline text-sm text-blue hover:text-blue-darker"
                       href="{{ route(request()->isFront() ? 'front.login' : 'admin.login') }}">{{ __('auth.back') }}</a
                    >
                </div>
            </form>
        </div>
    @if ($layout == 'layouts.admin-master')
        </div>
    @endif
@endsection
