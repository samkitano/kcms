<?php

namespace App\Kcms\Contracts;

/**
 * Interface KcmsModelContract
 *
 * Forces specification of fields to render in forms.
 */
interface KcmsModelContract
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
