<template>
    <div v-html="html"></div>
</template>

<script>
  import axios from 'axios'
  export default {
    data () {
      return {
        html: ''
      }
    },
    mounted () {
      axios.get(this.$route.meta.endpoint.url)
        .then((r) => this.html = r.data.html)
    },
    name: "dashboard"
  }
</script>

<style scoped>

</style>