<?php

namespace App\Http\Controllers\Front\Auth;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Kcms\Services\Auth\Users\User;
use Illuminate\Support\Facades\Password;
use Illuminate\Foundation\Auth\ResetsPasswords;

class ResetPasswordController extends Controller
{
    /** @var string */
    protected $redirectTo = '/';

    use ResetsPasswords;

    /**
     * Create a new controller instance.
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    /** @inheritdoc */
    public function showResetForm(Request $request, $token = null)
    {
        if (! $user = User::where('email', $request->email)->first()) {
            flash()->error(__t('passwords.token'));

            return redirect()->to(route('front.login'));
        }

        // The password is only null when the user was created by an admin.
        return view('auth.reset-password')
            ->with(
                [
                    'action' => route('front.reset'),
                    'token' => $token,
                    'email' => $request->email,
                    'user' => $user,
                    'invite' => $user->password === null,
                ]
            );
    }

    /** @inheritdoc */
    public function reset(Request $request)
    {
        $this->validate($request, $this->rules(), $this->validationErrorMessages());

        // Here we will attempt to reset the user's password. If it is successful we
        // will update the password on an actual user model and persist it to the
        // database. Otherwise we will parse the error and return the response.
        $response = $this->broker()
                         ->reset($this->credentials($request), function ($user, $password) {
                             $this->resetPassword($user, $password);
                         });

        // If the password was successfully reset, we will redirect the
        // user back to the application's home authenticated view.
        if ($response == Password::PASSWORD_RESET) {
            // If the user was invited by an admin,
            // there is no need for verification.
            if ($request->has('invite')) {
                __user()->verify()
                        ->registerLastActivity()
                        ->save();

                __user()->sendWelcomeEmail();

                return $this->sendResetResponse($response);
            }

            // Now we will register user activity
            __user()->registerLastActivity()->save();

            return $this->sendResetResponse($response);
        }

        // If there is an error we can redirect them back to
        // where they came from with their error message.
        return $this->sendResetFailedResponse($request, $response);
    }

    /** @inheritdoc */
    protected function sendResetResponse($response)
    {
        flash()->info(__($response));

        return redirect($this->redirectPath());
    }

    /** @inheritdoc */
    protected function sendResetFailedResponse(Request $request, $response)
    {
        session()->flash('status', __t('passwords.token'));

        return redirect()->back()
            ->withInput($request->only('email'))
            ->withErrors(['email' => __($response)]);
    }

    /** @inheritdoc */
    public function guard()
    {
        return Auth::guard('front');
    }

    /** @inheritdoc */
    public function broker()
    {
        return Password::broker('front');
    }
}
