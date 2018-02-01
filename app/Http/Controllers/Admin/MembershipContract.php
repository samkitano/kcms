<?php

namespace App\Http\Controllers\Admin;

interface MembershipContract
{
    /**
     * Return the model fully qualified class name for the resource
     *
     * @return string
     */
    public function getUserModel(): string;
}
