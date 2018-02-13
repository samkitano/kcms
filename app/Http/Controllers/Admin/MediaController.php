<?php

namespace App\Http\Controllers\Admin;

use App\Media;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Collection;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Contracts\NamingContract;

class MediaController extends Controller implements NamingContract
{
    //
    /**
     * Return the Menu group for the resource
     *
     * @return string
     */
    public static function getMenuGroup(): string
    {
        return __('kcms.menu.content');
    }

    /**
     * Return the resource name to be used as page title.
     *
     * @param bool $singular
     * @return string
     */
    public static function getTitle($singular = false): string
    {
        return __('kcms.menu.media');
    }

    public function index()
    {
        return view('admin.media.index')
            ->with('media', Media::all());
    }

    public function create()
    {
        return view('admin.media.create');
    }

    public function store()
    {

    }

    public function edit($id)
    {

    }

    public function update($id)
    {

    }

    public function destroy($id)
    {

    }

    public function up($id)
    {

    }

    public function down($id)
    {

    }
}
