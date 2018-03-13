<?php

namespace App\Kcms\Media;

use Intervention\Image\ImageManagerStatic as Image;

trait Manipulations
{
    protected $image;
    protected $manipulations = [];
    protected $media;
    protected $thumbs = [];
    protected $thumbSizes = [
        'large' => 360,
        'medium' => 180,
        'small' => 90,
        'mini' => 24,
    ];

    public function makeThumbs($media)
    {
        if (substr($media->mime, 0, 5) !== 'image') {
            return null;
        }

        $this->media = $media;
        $origin = $this->media->location.DIRECTORY_SEPARATOR.$media->file_name;
        $this->image = Image::make($origin);
        $props = [
            'height' => $this->image->height(),
            'width' => $this->image->width(),
            'size' => $this->image->filesize(),
            'mime' => $this->image->mime(),
            'orientation' => $this->orientation()
        ];

        $this->createFolder('thumbs')
             ->createFolder('originals')
             ->createThumbs()
             ->copyOriginal();

        $data = [
            'thumbs' => $this->thumbs,
            'props' => $props,
            'manipulations' => $this->updateManipulations(),
        ];

        return $data;
    }

    protected function orientation()
    {
        $h = $this->image->height();
        $w = $this->image->width();

        if ( $w > $h) {
            return 'landscape';
        }

        if ($w < $h) {
            return 'portrait';
        }

        return 'squared';
    }

    protected function updateManipulations()
    {
        $existing = $this->media->manipulations ?? [];

        return array_merge($existing, $this->manipulations);
    }

    protected function copyOriginal()
    {
        $img = $this->image;
        $dest = "{$this->media->location}/originals/{$this->media->file_name}";
        $img->save($dest);

        return $this;
    }

    protected function createThumbs()
    {
        foreach ($this->thumbSizes as $prefix => $height) {
            $img = $this->image;
            $dest = "{$this->media->location}/thumbs/{$prefix}_{$this->media->file_name}";

            $img->resize(null, $height, function ($constraint) {
                $constraint->aspectRatio();
            })->save($dest);

            $args = [
                'height: '.$height,
                'width: '.$img->width(),
            ];

            $t = [
                'url' => url("media/{$this->media->album}/thumbs/{$prefix}_{$this->media->file_name}"),
                'dimensions' => implode(', ', $args)
            ];

            $this->thumbs[$prefix] = $t;
       }

        return $this;
    }

    protected function createFolder($folder)
    {
        $th = media_path($this->media->album).DIRECTORY_SEPARATOR.$folder;

        if (! is_dir($th)) {
            mkdir($th, 0777);
        }

        return $this;
    }
}
