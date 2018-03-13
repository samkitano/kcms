<?php

namespace App\Kcms\Html\Presenters;

use App\Media as MediaModel;
use App\Kcms\Html\ElementGenerator\Tag;
use App\Kcms\Html\Traits\HtmlConstants;

class Media
{
    public static function album(MediaModel $media)
    {
        return $media->album;
    }

    public static function name(MediaModel $media)
    {
        return $media->name;
    }

    public static function description(MediaModel $media)
    {
        return $media->description;
    }

    public static function file_name(MediaModel $media)
    {
        return $media->file_name;
    }

    public static function mime(MediaModel $media)
    {
        return $media->mime;
    }

    public static function size(MediaModel $media)
    {
        return humanFileSize($media->size);
    }

    public static function order(MediaModel $media)
    {
        return $media->order;
    }
}
