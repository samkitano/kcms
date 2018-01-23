<?php

namespace App\Kcms\ViewComposers;

use JavaScript;
use App\Kcms\Html\Navigation;
use Illuminate\Contracts\View\View;

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

        JavaScript::put([
            'authNav' => $authNav
        ]);

        $view->with(compact('authNav'));
    }
}
