<template id="rotate_tpl">
    <div class="img_manipulations w-full">
        <div class="fx-range border shadow-lg">
            <div class="fx-range_title border-b text-center"
                ><span class="fx-val __RANGE_ID__">__DEFAULT_VALUE__</span></div
            >

            <div class="p-2 flex items-center justify-center mt-2">
                <span class="fx-min mr-1">__MIN_VAL__</span
                    ><input class="range w-full"
                            id="__RANGE_ID__"
                            type="range"
                            min="__MIN_VAL__"
                            max="__MAX_VAL__"
                            step="__STEP__"
                            value="__DEFAULT_VALUE__"
                ><span class="fx-max ml-1">__MAX_VAL__</span>
            </div>

            <div class="p-2 flex items-center justify-center">
                <div class="button">
                    <button id="rotate_90"
                            type="button"
                            class="button rotate_90">{{ __t('manipulations.rotate_90') }}</button>
                </div>

                <div class="button ml-4">
                    <button id="rotate_180"
                            type="button"
                            class="button rotate_180">{{ __t('manipulations.rotate_180') }}</button>
                </div>

                <div class="button ml-4">
                    <button type="button"
                            class="button reset">{{ __t('manipulations.reset') }}</button>
                </div>
            </div>
        </div>
    </div>
</template>
