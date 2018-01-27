<?php

namespace App\Kcms\ViewComposers;

use App\Kcms\Html\Navigation;
use Illuminate\Contracts\View\View;
use Laracasts\Utilities\JavaScript\JavaScriptFacade as JS;

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

        /** @noinspection PhpMethodParametersCountMismatchInspection */
        JS::put([
            'authNav' => $authNav
        ]);

        $view->with(compact('authNav'));
    }
}
