<template id="wh_tpl">
    <div class="img_manipulations sm:w-1/2 mx-auto">
        <div class="form border shadow-lg">
            <div class="flex">
                <div class="p-2 flex-grow">
                    <label class="label" for="fx_width">{{ __t('manipulations.width') }}</label>
                    <input class="input fx_input"
                           id="fx_width"
                           type="number"
                           min="1"
                           max="__MAX_WIDTH__"
                           step="1"
                           value="__DEFAULT_WIDTH__">

                    <label class="label" for="fx_height">{{ __t('manipulations.height') }}</label>
                    <input class="input fx_input"
                           id="fx_height"
                           type="number"
                           min="1"
                           max="__MAX_HEIGHT__"
                           step="1"
                           value="__DEFAULT_HEIGHT__">

                    <label class="resize flex items-center mt-2"><input checked type="checkbox" id="mar" value="1"
                        ><span class="ml-2 text-sm">{{ __t('manipulations.maintain') }}</span></label
                    >
                </div>

                <div class="resize lock">
                    <div class="lock-up"></div>
                    <div class="lock-center">
                        @component('svg.lock', ['width' => '12'])@endcomponent
                        @component('svg.unlock', ['width' => '12'])@endcomponent
                    </div>
                </div>

                <div class="resize flex flex-col items-center justify-around w-1/4">
                    <div class="button">
                        <button type="button" class="button sizes half active">1/2</button>
                    </div>

                    <div class="button">
                        <button type="button" class="button sizes third">1/3</button>
                    </div>

                    <div class="button">
                        <button type="button" class="button sizes quarter">1/4</button>
                    </div>
                </div>
            </div>

            <div class="flex items-center justify-center my-4">
                <div class="button">
                    <button type="button" class="button apply">{{ __t('manipulations.apply') }}</button>
                </div>

                <div class="button ml-4">
                    <button type="button" class="button reset">{{ __t('manipulations.reset') }}</button>
                </div>
            </div>
        </div>
    </div>
</template>
