<?php

// FRONT
Route::get('/', function () {
    return view('front.welcome');
});

Route::get('/', 'HomeController@index')
     ->name('front.home');

// ADMIN
Route::get('/admin', function () {
    return view('admin.welcome');
})->name('admin.home');
