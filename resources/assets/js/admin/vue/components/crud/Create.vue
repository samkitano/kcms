<template>
    <transition name="fade">
        <div class="container mx-auto" v-show="title">
            <div class="pt-6 pb-4 inline-flex justify-start items-center">
                <router-link
                        v-if="backButton"
                        class="pr-2 leading-none text-teal hover:text-teal-darker lg:sm-0"
                        :to="backButton.url"><span
                            class="cursor-pointer text-teal hover:text-teal-dark"
                            v-html="backButton.svg"/></router-link
                >
                <span v-html="title"/>
            </div>
            {{items}}
        </div>
    </transition>
</template>

<script>
  import axios from 'axios'

  export default {
    beforeMount () {
      this.fetchData()
    },

    data () {
      return {
        backButton: false,
        endpoint: this.$route.meta.endpoint.url,
        items: [],
        parent: this.$route.meta.parent,
        title: ''
      }
    },

    methods: {
      fetchData () {
        axios
          .get(this.endpoint)
          .then((r) => {
            this.items = r.data.items
            this.title = r.data.title
            this.backButton = r.data.button
          })
      }
    },

    name: 'create'
  }
</script>
