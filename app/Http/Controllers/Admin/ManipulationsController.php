<?php

namespace App\Http\Controllers\Admin;

use App\Media;
use App\Kcms\Media\Manipulations;
use App\Http\Controllers\Controller;
use Intervention\Image\ImageManagerStatic as Image;

class ManipulationsController extends Controller
{
    use Manipulations;

    /**
     * @param $id
     * @param $args
     * @return \Illuminate\Http\JsonResponse
     */
    public function __invoke($id, $args)
    {
        $needsFullSize = [
            'crop',
            'fit',
            'resize',
        ];

        $params = explode('/', $args);
        $command = array_shift($params);
        $model = Media::find($id);
        $loc = $model->location.DIRECTORY_SEPARATOR
            .'thumbs'.DIRECTORY_SEPARATOR
            .'large_'.$model->file_name;

        if (in_array($command, $needsFullSize)) {
            $loc = $model->uri;
        }

        $img = Manipulations::manipulate(Image::make($loc), $command, $params);

        $data = (string) $img->encode('data-url');

        $img->destroy();

        return response()->json($data);
    }
}
