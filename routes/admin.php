<?php

// DEFAULT ROUTES
Route::get('dashboard', 'DashboardController@index')
     ->name('admin.dashboard.index');
Route::get('settings', 'SettingsController@index')
     ->name('admin.settings.index');
Route::post('settings/clearcache', 'SettingsController@clearCache')
     ->name('admin.settings.index');

// MODULES
// Pass a true argument to make the module Orderable

// Members
Route::module('administrators');
Route::module('users');

// Content
Route::module('articles', true);
Route::module('media', true);
Route::module('tags');
