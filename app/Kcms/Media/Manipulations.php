<?php

namespace App\Kcms\Media;

use App\Kcms\Image\Fit;
use App\Kcms\Image\Blur;
use App\Kcms\Image\Flip;
use App\Kcms\Image\Crop;
use App\Kcms\Image\Gamma;
use App\Kcms\Image\Filter;
use App\Kcms\Image\Invert;
use App\Kcms\Image\Rotate;
use App\Kcms\Image\Resize;
use App\Kcms\Image\Sharpen;
use App\Kcms\Image\Pixelate;
use App\Kcms\Image\Colorize;
use App\Kcms\Image\Contrast;
use Intervention\Image\Image;
use App\Kcms\Image\Greyscale;
use App\Kcms\Image\Brightness;
use Intervention\Image\ImageManagerStatic as ImageManager;

trait Manipulations
{
    /** @var ImageManager */
    protected $image;
    
    /** @var array */
    protected $manipulations = [];
    
    /** @var \App\Media */
    protected $media;
    
    /** @var array */
    protected $thumbs = [];
    
    /** @var array */
    protected $thumbSizes = [
        'large' => 360,
        'medium' => 180,
        'small' => 90,
        'mini' => 24,
    ];

    /** @var array */
    protected static $manipulators = [
        'blur' => Blur::class,
        'brightness' => Brightness::class,
        'colorize' => Colorize::class,
        'contrast' => Contrast::class,
        'crop' => Crop::class,
        'fit' => Fit::class,
        'filter' => Filter::class,
        'flip' => Flip::class,
        'gamma' => Gamma::class,
        'greyscale' => Greyscale::class,
        'invert' => Invert::class,
        'pixelate' => Pixelate::class,
        'resize' => Resize::class,
        'rotate' => Rotate::class,
        'sharpen' => Sharpen::class,
    ];

    /**
     * @param Image  $img     The image to manipulate
     * @param string $command The manipulation to perform
     * @param array  $args    The arguments for the manipulation
     *
     * @return Image
     */
    public static function manipulate(Image $img, string $command, array $args): Image
    {
        $manipulator = new static::$manipulators[$command];
        $manipulator->setParams([$command => $args]);

        return $manipulator->run($img);
    }

    /**
     * Create thumbnails for a medium
     *
     * @param $media
     * @return array|null
     */
    public function makeThumbs($media)
    {
        if (substr($media->mime, 0, 5) !== 'image') {
            return null;
        }

        $this->media = $media;
        $origin = $this->media->location.DIRECTORY_SEPARATOR.$media->file_name;
        $this->image = ImageManager::make($origin);
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

    /**
     * Get the image orientation
     *
     * @return string
     */
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

    /**
     * Update current medium manipulation stack
     *
     * @return array
     */
    protected function updateManipulations()
    {
        $existing = $this->media->manipulations ?? [];

        return array_merge($existing, $this->manipulations);
    }

    /**
     * Save a copy of the original image
     *
     * @return $this
     */
    protected function copyOriginal()
    {
        $img = $this->image;
        $dest = "{$this->media->location}/originals/{$this->media->file_name}";
        $img->save($dest);

        return $this;
    }

    /**
     * Perform the thumbnail creation
     *
     * @return $this
     */
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

    /**
     * Creates a folder on the media path
     *
     * @param string $folder
     *
     * @return $this
     */
    protected function createFolder(string $folder)
    {
        $th = media_path($this->media->album).DIRECTORY_SEPARATOR.$folder;

        if (! is_dir($th)) {
            mkdir($th, 0777);
        }

        return $this;
    }
}
