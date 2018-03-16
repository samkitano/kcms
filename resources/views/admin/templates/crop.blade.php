<template id="crop_tpl">
    <div class="img_manipulations w-full">
        <div class="p-2 border shadow-lg">
            <div class="border-b w-full text-center">
                <div id="crop_options" class="mb-2">
                    <div class="button">
                        <button data-aspect="169" type="button" class="button aspect">16:9</button>
                    </div>

                    <div class="button ml-4">
                        <button data-aspect="43" type="button" class="button aspect">4:3</button>
                    </div>

                    <div class="button ml-4">
                        <button data-aspect="11" type="button" class="button aspect">1:1</button>
                    </div>

                    <div class="button ml-4">
                        <button data-aspect="23" type="button" class="button aspect">2:3</button>
                    </div>

                    <div class="button ml-4">
                        <button data-aspect="free" type="button" class="button aspect active">{{ __t('manipulations.free') }}</button>
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
