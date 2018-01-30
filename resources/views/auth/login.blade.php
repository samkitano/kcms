@extends($layout)

@section('title', __('auth.login'))

@section('content')
    @if ($layout == 'layouts.admin-master')
        <div class="flex content-center flex-wrap text-grey h-screen font-hairline" style="margin-top: -48px;">
    @endif

    <div class="panel panel-sm">
        <div class="panel-title">{{ __('auth.fill_login') }}</div>

        <form class="form"
              method="POST"
              action="{{ action(request()->isFront() ? 'Front\Auth\LoginController@login' : 'Admin\Auth\LoginController@login')}}">
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

            <div class="sm:flex sm:items-center sm:justify-between form-block">
                <label class="my-4 sm:my-0 block text-grey-darker"
                    ><input class="mr-2"
                            name="remember"
                            id="remember"
                            type="checkbox"><span class="text-sm font-bold">{{ __('auth.remember') }}</span
                ></label><a class="nav-forgot block font-bold my-4 sm:my-0 sm:inline-block align-baseline text-sm text-blue hover:text-blue-darker"
                            href="{{ route(request()->isFront() ? 'front.forgot' : 'admin.forgot') }}">{{ __('auth.forgot') }}</a>
            </div>

            <div class="form-block">
                <button class="submit btn btn-blue" type="submit">{{ __('auth.login') }}</button>
            </div>
        </form>
    </div>

    @if ($layout == 'layouts.admin-master')
        </div>
    @endif
@endsection
