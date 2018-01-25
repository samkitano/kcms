<?php

// FRONT
Route::get('/', function () {
    return view('front.welcome');
});

Route::get('/home', 'HomeController@index')
     ->name('front.home');

// ADMIN
Route::get('/admin', function () {
    if (auth('admin')->check()) {
        return redirect()->route('admin.dashboard');
    }

    return view('admin.welcome');
})->name('admin.home');
