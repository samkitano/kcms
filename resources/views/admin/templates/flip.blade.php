<template id="flip_tpl">
    <div class="img_manipulations w-full">
        <div class="p-2 flex items-center justify-center border shadow-lg">
            <div class="button">
                <button id="flip_h" type="button" class="button flip flip_h">{{ __t('manipulations.flip_h') }}</button>
            </div>

            <div class="button ml-4">
                <button id="flip_v" type="button" class="button flip flip_v">{{ __t('manipulations.flip_v') }}</button>
            </div>

            <div class="button ml-4">
                <button id="flip_b" type="button" class="button flip flip_b">{{ __t('manipulations.flip_b') }}</button>
            </div>

            <div class="button ml-4">
                <button type="button" class="button reset">{{ __t('manipulations.reset') }}</button>
            </div>
        </div>
    </div>
</template>
