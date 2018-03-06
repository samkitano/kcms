{{--
    Delete Button

    @param int    $id         Resource ID
    @param string $singular   Singularized Resource name
    @param string $controller Controller Name
--}}

<button class="delete-resource btn btn-outline btn-outline-red lg:sm-0"
        data-id="{{ $id }}"
        data-resource="{{ $singular }}"
        data-action="{{  action("{$controller}@destroy", $id) }}"
        data-redirect="{{ action("{$controller}@index") }}"
        type="button">{{ __t('buttons.delete') }}</button>
