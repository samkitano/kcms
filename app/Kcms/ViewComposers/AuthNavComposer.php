<?php

namespace App\Kcms\ViewComposers;

use App\Kcms\Html\Navigation;
use Illuminate\Contracts\View\View;
use App\Kcms\Facades\JavaScriptFacade as JS;

class AuthNavComposer
{
    /**
     * Compose the view
     *
     * @param View $view
     */
    public function compose(View $view)
    {
        $authNav = Navigation::authNav();

        JS::inject([
            'authNav' => $authNav,
        ]);

        $view->with(compact('authNav'));
    }
}
