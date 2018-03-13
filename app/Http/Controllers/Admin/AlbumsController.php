<?php

namespace App\Http\Controllers\Admin;

use App\Media;
use Illuminate\Http\Request;
use App\Http\Controllers\Contracts\NamingContract;

class AlbumsController extends AdminBaseController implements NamingContract
{
    /** @inheritdoc */
    public static function getMenuGroup(): string
    {
        return __t('menu.content');
    }

    /** @inheritdoc */
    public static function getTitle($singular = false): string
    {
        return $singular
            ? __t('menu.album')
            : __t('menu.albums');
    }

    /**
     * Get the proper member model class
     *
     * @return string
     */
    public function getModelClass()
    {
        return Media::class;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $albumId
     *
     * @return \Illuminate\Http\Response
     */
    public function edit($albumId)
    {
        $media = Media::where('album', $albumId)->orderBy('order')->get();

        return view('admin.media.albums.edit')
            ->with('resource', 'albums')
            ->with('album', $albumId)
            ->with('media', $media);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update($id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
