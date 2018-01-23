<template>
    <zoom-y-transition>
        <div class="max-w-md mx-auto" v-html="markup"/>
    </zoom-y-transition>
</template>

<script>
  import { ZoomYTransition } from 'vue2-transitions'

  export default {
    components: { ZoomYTransition },

    name: 'profile',

    props: {
      markup: {
        required: true,
        type: String
      }
    }
  }
</script>
