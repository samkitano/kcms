<?php

namespace App\Http\Controllers\Front\Auth;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Kcms\Services\Auth\Users\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Auth\RegistersUsers;
use App\Kcms\Services\Auth\Users\VerifiesUsers;

class RegisterController extends Controller
{
    use RegistersUsers;

    /** @var string */
    protected $redirectTo = '/';

    /**
     * Create a new controller instance.
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    /** @inheritdoc */
    public function showRegistrationForm()
    {
        return view('auth.register');
    }

    /** @inheritdoc */
    public function register(Request $request)
    {
        $this->validator($request->all())
            ->validate();

        event(new Registered($user = $this->create($request->all())));

        if (! config('kcms.user_verification')) {
            $this->guard()->login($user);

            return $this->registered($request, $user)
                ?: redirect($this->redirectPath());
        }

        flash()->info(__t('mail.check_inbox'));

        return redirect('/');
    }

    /** @inheritdoc */
    public function guard()
    {
        return Auth::guard('front');
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param array $data
     *
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'first_name' => 'required|max:255',
            'last_name' => 'required|max:255',
            'email' => 'required|email|max:255|unique:users',
            'password' => 'required|min:6|confirmed',
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param array $data
     *
     * @return User
     */
    protected function create(array $data)
    {
        return User::register($data);
    }

    /**
     * Verifies a registered user
     *
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     * @throws \App\Kcms\Exceptions\InvalidTimeStringException
     */
    public function verify()
    {
        $verified = VerifiesUsers::verify(request()->token);

        if ($verified instanceof User) {
            $this->guard()->loginUsingId($verified->id);

            flash()->info(__t('auth.logged_in'));
        } else {
            flash()->error($verified);
        }

        return redirect('/');
    }

    /**
     * Get the broker to be used during password reset.
     * @TODO: is this shite being used at all?
     * @return \Illuminate\Contracts\Auth\PasswordBroker
     */
    public function broker()
    {
        return Password::broker('front');
    }
}
