<template id="rgb_tpl">
    <div class="img_manipulations w-full">
        <div class="fx-input border shadow-lg">
            <div class="fx-input_title border-b text-center"
                ><span>R: </span><span class="fx-val __RANGE_ID_R__">__DEFAULT_VALUE__</span
                    ><span class="ml-4">G: </span><span class="fx-val __RANGE_ID_G__">__DEFAULT_VALUE__</span
                    ><span class="ml-4">B: </span><span class="fx-val __RANGE_ID_B__">__DEFAULT_VALUE__</span
                    ></div
            >

            <div class="fx-input_rangeR p-2 flex .items-center">
                <span class="fx-min mr-1">__MIN_VAL__</span
                    ><input class="fx_input_range w-full"
                            id="__RANGE_ID_R__"
                            type="range"
                            min="__MIN_VAL__"
                            max="__MAX_VAL__"
                            step="__STEP__"
                            value="__DEFAULT_VALUE__"
                    ><span class="fx-max ml-1">__MAX_VAL__</span>
            </div>

            <div class="fx-input_rangeG p-2 flex .items-center">
                <span class="fx-min mr-1">__MIN_VAL__</span
                    ><input class="fx_input_range w-full"
                            id="__RANGE_ID_G__"
                            type="range"
                            min="__MIN_VAL__"
                            max="__MAX_VAL__"
                            step="__STEP__"
                            value="__DEFAULT_VALUE__"
                    ><span class="fx-max ml-1">__MAX_VAL__</span>
            </div>

            <div class="fx-input_rangeB p-2 flex .items-center">
                <span class="fx-min mr-1">__MIN_VAL__</span
                    ><input class="fx_input_range w-full"
                            id="__RANGE_ID_B__"
                            type="range"
                            min="__MIN_VAL__"
                            max="__MAX_VAL__"
                            step="__STEP__"
                            value="__DEFAULT_VALUE__"
                ><span class="fx-max ml-1">__MAX_VAL__</span>
            </div>

            <div class="fx-flip p-2 flex items-center justify-center">
                <div class="button">
                    <button type="button" class="button reset">{{ __t('manipulations.reset') }}</button>
                </div>
            </div>
        </div>
    </div>
</template>
