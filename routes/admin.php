<?php

Route::get('dashboard', 'DashboardController@index')
    ->name('admin.dashboard.index');
Route::get('settings', 'SettingsController@index')
    ->name('admin.settings.index');
Route::post('settings/clearcache', 'SettingsController@clearCache')
    ->name('admin.settings.index');

Route::module('administrators');
Route::module('users');
Route::module('articles');
Route::module('media');
Route::module('tags');
