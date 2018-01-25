<?php

namespace App\Kcms\Services\Auth;

/**
 * Trait UserPresenter
 *
 * @property \Carbon\Carbon $last_active_at
 */
trait UserPresenter
{
    /**
     * Returns user full name
     *
     * @return string
     */
    public function getFullNameAttribute(): string
    {
        return $this->first_name.' '.$this->last_name;
    }

    public function getSinceAttribute(): string
    {
        return humanize_diff_date($this->created_at);
    }

    /**
     * Returns user gravatar
     *
     * @return string
     */
    public function getGravatarAttribute(): string
    {
        return 'https://www.gravatar.com/avatar/'.md5($this->email).'?d=mm&s=256';
    }

    /**
     * Returns user last recorded activity date
     *
     * @return string
     */
    public function getLastActiveAttribute(): string
    {
        if ($this->last_active_at === null || $this->last_active_at->year == -1) {
            return __('admin.never');
        }

        $lastActivityDate = humanize_diff_date($this->last_active_at);

        if (str_contains($lastActivityDate, 'second')) {
            $lastActivityDate = __('admin.just_now');
        }

        return $lastActivityDate;
    }
}
