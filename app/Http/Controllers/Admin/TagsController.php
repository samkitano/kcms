<?php

namespace App\Http\Controllers\Admin;

use App\Tag;
use App\Http\Controllers\Contracts\NamingContract;

class TagsController extends ContentController implements NamingContract
{
    /**
     * Return the Menu group for the resource
     *
     * @return string
     */
    public static function getMenuGroup(): string
    {
        return __t('menu.content');
    }

    /**
     * Return the resource name to be used as page title.
     *
     * @param bool $singular
     * @return string
     */
    public static function getTitle($singular = false): string
    {
        return $singular
            ? __t('menu.tag')
            : __t('menu.tags');
    }

    /**
     * Get the current content model
     *
     * @return string
     */
    public function getContentModel(): string
    {
        return Tag::class;
    }

    public function index()
    {
        $data = [
            'items' => $this->all(),
            'fields' => $this->presentable(),
        ];

        return $this->respond($data, __FUNCTION__);
    }
}
