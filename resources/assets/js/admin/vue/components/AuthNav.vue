<template>
    <div v-html="authNav"/>
</template>

<script>
  const authNav = kitano.authNav

  export default {
    data () {
      return {
        authNav
      }
    },

    name: "auth-nav",

    watch: {
      $route () {
        document.getElementsByClassName('auth-info')[0].innerHtml = ''
      }
    }
  }
</script>
