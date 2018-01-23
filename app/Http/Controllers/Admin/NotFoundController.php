<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

class NotFoundController extends Controller
{
    public function __invoke()
    {
        return view('admin.php.errors.404');
    }
}
