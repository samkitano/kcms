<template>
    <input :class="style"
           :type="type"
           v-model="selfModel"
           @input="emit"
           @blur="emit"
           @keyup="emit">
</template>

<script>
  export default {
    computed: {
      style () {
        let error = this.state ? '' : ' error'
        return `${this.css}${error}`
      }
    },

    data() {
      return {
        selfModel: null
      }
    },

    methods: {
      updateSelf () {
        this.selfModel = this.val.trim()
      },
      emit (event) {
        this.$emit('change', { event, value: this.selfModel })
      }
    },

    mounted () {
      this.updateSelf()
    },

    name: 'kInput',

    props: {
      css: {
        default: 'input',
        required: false,
        type: String
      },
      type: {
        default: 'text',
        required: false,
        type: String
      },
      state: {
        default: true,
        type: Boolean
      },
      val: {
        required: true,
        type: String
      },
    },

    watch: {
      val () {
        if (this.val !== this.selfModel) {
          this.updateSelf()
        }
      }
    }
  }
</script>
