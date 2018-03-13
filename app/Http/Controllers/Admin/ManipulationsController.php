<?php

namespace App\Http\Controllers\Admin;

use App\Media;
use Illuminate\Http\Request;
use App\Kcms\Image\Filters\Sepia;
use App\Http\Controllers\Controller;
use Intervention\Image\ImageManagerStatic as Image;

class ManipulationsController extends Controller
{
    public function __invoke($id, $args)
    {
        $model = Media::find($id);
        $loc = $model->location.DIRECTORY_SEPARATOR
            .'thumbs'.DIRECTORY_SEPARATOR
            .'large_'.$model->file_name;


        $commands = explode('axn/', $args);

        unset($commands[0]); // FIXME: need to figure out why the fkn fk $comms[0] is a fkn empty string

        $commandStack = [];

        foreach ($commands as $command) {
            $exp = explode('/', $command);
            $comm = array_shift($exp);
            $params = implode(',', $exp);

            $commandStack[] = ['name' => $comm, 'args' => $params];

            if ($comm === 'crop') {
                $loc = $model->uri;
            }
        }

        $img = Image::make($loc);

        foreach ($commandStack as $command) {
            // colorize will only accept integers
            if ($command['name'] === 'colorize') {
                $args = explode(',', $command['args']);

                $img->colorize((int) $args[0], (int) $args[1], (int) $args[2]);
                continue;
            }

            // as well as crop
            if ($command['name'] === 'crop') {
                $args = explode(',', $command['args']);

                $img->crop((int) $args[0], (int) $args[1], (int) $args[2], (int) $args[3]);
                continue;
            }

            if ($command['name'] === 'filter' && $command['args'] === 'sepia') {
                $img->filter(new Sepia());
                continue;
            }

            $img->{$command['name']}($command['args']);
        }

        $data = (string) $img->encode('data-url');

        $img->destroy();

        return response()->json($data);
    }
}
