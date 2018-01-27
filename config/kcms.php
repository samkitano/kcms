<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Allow front users to login
    |--------------------------------------------------------------------------
    |
    | Sometimes, you may need to prevent your users to access authenticated
    | areas at all. Set this option to false, to remove the login option
    | from the authentication menu. The option default value is true.
    |
    */

    'allow_front_login' => env('ALLOW_FRONT_LOGIN', true),

    /*
    |--------------------------------------------------------------------------
    | Allow front users to register
    |--------------------------------------------------------------------------
    |
    | If for some reason you need to suspend registrations, or your application
    | doesn't require front users to access protected areas, set this option
    | to false. In the latter case, set the above option to false as well.
    |
    */

    'allow_front_register' => env('ALLOW_FRONT_REGISTER', true),

    /*
    |--------------------------------------------------------------------------
    | Verify user email
    |--------------------------------------------------------------------------
    |
    | By default, when a user registers, a verification email is sent to the
    | registered email address with instructions to activate the account.
    | Set to false to automatically login the users upon registration.
    |
    */

    'user_verification' => env('USER_VERIFICATION', true),

    /*
    |--------------------------------------------------------------------------
    | Administration platform
    |--------------------------------------------------------------------------
    |
    | The administration section is rendered by Vue.js by default.
    | Set this option to false, to make Laravel(PHP) and jQuery
    | the default handler for the application rendered views.
    |
    */

    'vue_admin' => env('VUE_ADMIN', false),

    /*
    |--------------------------------------------------------------------------
    | Frontend platform
    |--------------------------------------------------------------------------
    |
    | The frontend section views are rendered by Laravel and
    | Blade, by default. Set this option to true, to make
    | Vue.js your default front-end handling platform.
    |
    */

    'vue_front' => env('VUE_FRONT', false),

    /*
    |--------------------------------------------------------------------------
    | Welcome email
    |--------------------------------------------------------------------------
    |
    | Send a welcome email to newly registered users.
    | If user verification is enabled, this email
    | will be sent upon the email verification.
    |
    */

    'welcome_email' => env('WELCOME_EMAIL', true),

    /*
    |--------------------------------------------------------------------------
    | Notify Registrations
    |--------------------------------------------------------------------------
    |
    | Notify administrator(s) of new registrations on the front site.
    | If you enable this option, you'll need to provide a list of
    | of administrators to notify in the notify_admins option.
    |
    */

    'notify_registrations' => env('NOTIFY_REGISTRATIONS', false),

    /*
    |--------------------------------------------------------------------------
    | Notify Verifications
    |--------------------------------------------------------------------------
    |
    | Notify administrator(s) when the users activate their accounts.
    | If you enable this option, you'll need to provide a list of
    | of administrators to notify in the notify_admins option.
    |
    */

    'notify_verifications' => env('NOTIFY_VERIFICATIONS', false),

    /*
    |--------------------------------------------------------------------------
    | Notify Admins
    |--------------------------------------------------------------------------
    |
    | List of administrators to whom notifications will be sent.
    | You may provide a comma separated email addresses list.
    | Set to 'all' to notify all registered administrators.
    |
    | WARNING: All emails in the list MUST belong to a
    |          registered administrator, or an error
    |          will be thrown by the application.
    |
    */

    'notify_admins' => env('NOTIFY_ADMINS_LIST', env('CONTACT_MAIL_ADDRESS', false)),

];
