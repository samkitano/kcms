<?php

namespace App\Kcms\Html\Presenters;

use App\Kcms\Html\ElementGenerator\Tag;
use App\Kcms\Html\Traits\HtmlConstants;

/**
 * Class Users
 * @package App\Kcms\Navigation\Presenters
 */
class Users
{
    /**
     * @param \App\Kcms\Services\Auth\Admin\User|\App\Kcms\Services\Auth\Front\User $user
     *
     * @return array
     * @throws \App\Kcms\Html\Exceptions\TagCanNotHaveContentException
     */
    public static function name($user): array
    {
        $img = Tag::img([
            'class' => 'inline-block h-6 w-6 rounded-full',
            'alt' => $user->name,
            'src' => $user->gravatar,
        ]);

        $span = Tag::span($img);

        return [
            'image' => $span->toHtml(),
            'name' => $user->name,
            'url' => $user->getProfileUrl()
        ];
    }

    /**
     * @param $user
     * @return string
     */
    public static function email($user): string
    {
        return Tag::span(['class' => 'h-6'], $user->email);
    }

    /**
     * @param $user
     * @return string
     */
    public static function last_active($user): string
    {
        return Tag::span(['class' => 'h-6'], $user->last_active);
    }

    /**
     * @param $user
     * @return string
     */
    public static function role($user): string
    {
        return Tag::span(['class' => 'h-6'], __('kcms.'.$user->role ?? 'none'));
    }

    /**
     * @param $user
     * @return string
     */
    public static function userProfile($user): string
    {
        $avatar = Tag::div([
            'class' => 'h-48 w-64 bg-cover bg-center sm:rounded-l text-center overflow-hidden',
            'style' => "background-image: url('{$user->gravatar}')",
            'title' => 'Avatar',
        ]);
        $roleSvgPath = Tag::path(['d' => 'M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z']);
        $emailSvgPath = Tag::path(['d' => 'M18 2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4c0-1.1.9-2 2-2h16zm-4.37 9.1L20 16v-2l-5.12-3.9L20 6V4l-10 8L0 4v2l5.12 4.1L0 14v2l6.37-4.9L10 14l3.63-2.9z']);
        $roleSvgTitle = Tag::title(__('kcms.fields.role'));
        $emailSvgTitle = Tag::title(__('kcms.fields.email'));
        $name = Tag::div(['class' => 'text-black font-bold text-xl mb-2'], $user->name);
        $registeredLabel = Tag::strong(__('kcms.fields.registered').': ');
        $registeredDate = Tag::span($user->created_at.' ('.$user->since.')');
        $registered = Tag::p(['class' => 'text-grey-darker text-base'], $registeredLabel.$registeredDate);
        $lastActiveDate = Tag::span($user->last_active);
        $lastActiveLabel = Tag::strong(__('kcms.fields.last_active').': ');
        $lastActive = Tag::p(['class' => 'text-grey-darker text-base'], $lastActiveLabel.$lastActiveDate);
        $roleSvg = Tag::svg([
            'class' => 'fill-current text-grey w-3 h-3 mr-2',
            'xmlns' => HtmlConstants::$XMLNS,
            'viewbox' => '0 0 20 20',
        ], $roleSvgPath.$roleSvgTitle);
        $emailSvg = Tag::svg([
            'class' => 'fill-current text-grey w-3 h-3 mr-2',
            'xmlns' => HtmlConstants::$XMLNS,
            'viewbox' => '0 0 20 20',
        ], $emailSvgPath.$emailSvgTitle);
        $roleText = Tag::span(__(isset($user->role) ? 'kcms.fields.'.$user->role : 'kcms.fields.none'));
        $emailText = Tag::span($user->email);
        $role = Tag::p(['class' => 'text-grey-dark flex items-center'],$roleSvg.$roleText);
        $email = Tag::p(['class' => 'text-grey-dark flex items-center'],$emailSvg.$emailText);
        $details = Tag::div([
            'class' => 'w-full border-r border-b border-l border-grey-light sm:border-l-0 sm:border-t sm:border-grey-light bg-white rounded-b sm:rounded-b-none sm:rounded-r p-4 flex flex-col justify-between leading-normal',
        ], $name.$email.$role.$registered.$lastActive);

        return Tag::div(['class' => 'max-w-lg w-full sm:flex'], $avatar.$details);
    }
}
