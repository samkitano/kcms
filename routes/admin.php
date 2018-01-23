<?php

Route::get('dashboard', 'DashboardController@index')
    ->name('admin.dashboard.index');
Route::get('settings', 'SettingsController@index')
    ->name('admin.settings.index');

Route::module('administrators');
Route::module('users');
