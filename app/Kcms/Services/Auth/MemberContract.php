<?php

namespace App\Kcms\Services\Auth;

interface MemberContract
{
    /**
     * The fields to present in index view
     *
     * @return array
     */
    public static function presentable(): array;

    /**
     * The fields that can be created/edited
     *
     * @param null $id
     * @return array
     */
    public static function editable($id = null): array;
}
