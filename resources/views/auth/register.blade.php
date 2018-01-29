@extends($layout)

@section('title', __('auth.register'))

@section('content')
    @if ($layout == 'layouts.admin-master')
        <div class="flex content-center flex-wrap text-grey h-screen font-hairline" style="margin-top: -48px;">
    @endif

    <div class="panel panel-sm">
        <div class="panel-title">{{ __('auth.fill_register') }}</div>

        <form class="form"
              method="POST"
              action="{{ action('Front\Auth\RegisterController@register') }}">
            {{ csrf_field() }}

            <div class="form-block">
                <label class="label"
                       for="first_name">{{ __('auth.first_name') }}*</label>

                <input class="input{{ $errors->has('first_name') ? ' error' : '' }}"
                       id="first_name"
                       name="first_name"
                       type="text"
                       value="{{ old('first_name') }}"
                >

                @if ($errors->has('first_name'))
                    <p class="error">{{ $errors->first('first_name') }}</p>
                @endif
            </div>

            <div class="form-block">
                <label class="label"
                       for="last_name">{{ __('auth.last_name') }}*</label>

                <input class="input{{ $errors->has('last_name') ? ' error' : '' }}"
                       id="last_name"
                       name="last_name"
                       type="text"
                       value="{{ old('last_name') }}"
                >

                @if ($errors->has('last_name'))
                    <p class="error">{{ $errors->first('last_name') }}</p>
                @endif
            </div>

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

            <div class="form-block">
                <label class="label"
                       for="password">{{ __('auth.password') }}*</label>

                <input autocomplete="false"
                       class="input{{ $errors->has('password') ? ' error' : '' }}"
                       id="password"
                       name="password"
                       type="password"
                       value="{{ old('password') }}"
                >

                @if ($errors->has('password'))
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
                       value="{{ old('password_confirmation') }}"
                >

                @if ($errors->has('password_confirmation'))
                    <p class="error">{{ $errors->first('password_confirmation') }}</p>
                @endif
            </div>


            <div class="form-block">
                <button class="btn btn-blue"
                        dusk="submit-registration-button"
                        type="submit">{{ __('auth.register') }}</button>
            </div>
        </form>
    </div>

    @if ($layout == 'layouts.admin-master')
        </div>
    @endif
@endsection
