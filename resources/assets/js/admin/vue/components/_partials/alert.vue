<template>
    <zoom-y-transition>
        <div role="alert"
             :class="alertClass"
             v-show="!isHidden">
            <div class="alert-outer">
                <div class="alert-icon">
                    <svg :class="svgClass"
                         xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 20 20"
                        ><title>{{ type }}</title><path :d="d"/></svg>
                </div>

                <div class="alert-message"><span v-html="msg"/></div>

                <div class="alert-close"
                     v-if="close">
                    <svg class="close-alert-button"
                         role="button"
                         xmlns="http://www.w3.org/2000/svg"
                         @click="show = false"
                         viewBox="0 0 20 20">
                        <title>{{ translate('actions.close') }}</title>
                        <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm1.41-1.41A8 8 0 1 0 15.66 4.34 8 8 0 0 0 4.34 15.66zm9.9-8.49L11.41 10l2.83 2.83-1.41 1.41L10 11.41l-2.83 2.83-1.41-1.41L8.59 10 5.76 7.17l1.41-1.41L10 8.59l2.83-2.83 1.41 1.41z"></path>
                    </svg>
                </div>
            </div>
        </div>
    </zoom-y-transition>
</template>

<script>
  import { mapActions } from 'vuex'
  import { ZoomYTransition } from 'vue2-transitions'

  let colors = {
    error: 'red',
    success: 'green',
    info: 'teal'
  }

  export default {
    components: { ZoomYTransition },

    computed: {
      alertClass () {
        return `alert alert-${this.type}`
      },
      color () {
        return colors[this.type] || colors.info
      },
      d () {
        let common = 'M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32z'

        switch (this.type) {
          case 'error':
            return  `${common}M9 5h2v6H9V5zm0 8h2v2H9v-2z`
          case 'info':
            return `${common}M9 11V9h2v6H9v-4zm0-6h2v2H9V5z`
          case 'success':
            return `${common}M6.7 9.29L9 11.6l4.3-4.3 1.4 1.42L9 14.4l-3.7-3.7 1.4-1.42z`
          default:
            return `${common}M9 11V9h2v6H9v-4zm0-6h2v2H9V5z`
        }
      },
      isHidden () {
        return this.inArray(this.msg, this.$store.state.hiddenAlerts)
      },
      svgClass () {
        return `fill-current h-6 w-6 mr-4 text-${this.color}`
      }
    },

    data () {
      return {
        show: true
      }
    },

    methods: Object.assign({}, mapActions([
      'hideAlert'
    ]), {}),

    name: 'alert',

    props: {
      msg: {
        required: true,
        type: String,
      },
      close: {
        default: false,
        required: false,
        type: Boolean
      },
      type: {
        default: 'info',
        required: false,
        type: String
      }
    },

    watch: {
      show (state) {
        if (!state) {
          this.hideAlert(this.msg)
        }
      }
    }
  }
</script>
