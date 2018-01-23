<template>
    <button
        :class="buttonClass"
        :disabled="disabled"
        :type="type"
        @click.prevent.stop="emit()">{{ text }}
    </button>
</template>

<script>
  export default {
    computed: {
      buttonClass () {
        let base = 'btn'

        base += this.type === 'submit' ? ' btn-blue float-right' : ` btn-outline btn-outline-${this.color}`
        base += this.disabled ? ' cursor-not-allowed text-grey border-grey bg-grey-lighter' : ''

        return base
      }
    },

    methods: {
      emit () {
        if (!this.disabled) {
          this.$emit('click')
        }
      }
    },

    name: 'btn',

    props: {
      color: {
        default: 'blue',
        required: false,
        type: String
      },
      disabled: {
        default: false,
        required: false
      },
      type: {
        default: 'button',
        required: false,
        type: String
      },
      text: {
        required: true
      }
    }
  }
</script>
