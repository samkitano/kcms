<?php

namespace App\Http\Controllers\Admin;

use App\Kcms\Orderable\Orderable;
use App\Media;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Collection;
//use App\Http\Controllers\Controller;
use App\Kcms\Transformers\MediaTransformer;
use App\Http\Controllers\Contracts\NamingContract;
use Illuminate\Support\Facades\Storage;

class MediaController extends ContentController implements NamingContract
{
    protected $transformer;

    /** @inheritdoc */
    public function getContentModel(): string
    {
        return Media::class;
    }

    /** @inheritdoc */
    public static function getMenuGroup(): string
    {
        return __t('menu.content');
    }

    /** @inheritdoc */
    public static function getTitle($singular = false): string
    {
        return $singular
            ? __t('menu.medium')
            : __t('menu.media');
    }

    /**
     * MediaController constructor.
     *
     * @param MediaTransformer $transformer
     */
    public function __construct(MediaTransformer $transformer)
    {
        parent::__construct();

        $this->transformer = $transformer;
    }

    /** @inheritdoc */
    public function index()
    {
        $data = [
            'items' => $this->transformer->transform(
                Media::all(),
                $this->presentableKeys()
            ),
            'fields' => $this->presentable(),
        ];

        return $this->respond($data, __FUNCTION__);
    }

    /** @inheritdoc */
    public function create()
    {
        return $this->respond(['album' => $this->editable()['album']], __FUNCTION__, 'media');
    }

    public function store()
    {
        $album = request('album') ?? config('kcms.default_media_album');

        $this->validate(request(), $this->validationRules());

        $path = Storage::disk('media')
              ->putFile($album, request()->file('file'));
        $data = array_except(request()->all(), ['_method', '_token', 'file']);

        $data['album'] = $album;
        $data['name'] = pathinfo($path, PATHINFO_FILENAME);
        $data['file_name'] = basename($path);
        $data['uri'] = url('media'.DIRECTORY_SEPARATOR.$path);
        $data['location'] = media_path($album);
        $data['order'] = $this->getOrder($album);
        $data['size'] = Storage::disk('media')->size($path);
        $data['mime'] = Storage::disk('media')->mimeType($path);

        Media::create($data);

        $response = ['redirect' => route('albums.edit', $album)];

        return response()->json($response);
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

    protected function validationRules()
    {
        return [
            'album' => 'max:150',
            'file' => 'mimes:jpeg,bmp,png,gif,svg,pdf,|max:2000000',
        ];
    }

//    public function up($id)
//    {
//
//    }
//
//    public function down($id)
//    {
//
//    }

    protected function getOrder($album)
    {
        return (int) Media::whereAlbum($album)
                ->max('order') + 1;
    }
}
