<?php

namespace App\Kcms\Services\Auth;

interface MemberContract
{
    public static function presentable(): array;
    public static function editable($id = null): array;
}
