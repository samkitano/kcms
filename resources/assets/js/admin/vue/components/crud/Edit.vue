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

            <div>
                <a
                    class="inline-block text-sm px-4 py-2 mb-4 leading-none border rounded text-teal border-teal hover:text-teal-darker hover:bg-teal-lightest lg:sm-0 mb-4"
                    href="#"
                    @click.prevent="showEdit">{{ buttonText }}</a>
            </div>

            <zoom-y-transition>
                <div v-html="profile" v-if="showProfile"/>
            </zoom-y-transition>

            <!--<zoom-y-transition>-->
                <section v-if="showForm">
                    <div class="max-w-lg w-full sm:flex">
                        <p class="text-sm flex text-teal">
                            <svg
                                class="fill-current"
                                width="16"
                                height="16"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20">
                                <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/>
                                <title>Gravatar Info</title>
                            </svg>
                            <span class="px-1 text-grey">{{ gravatarInfo }}</span>
                            <a
                                class="text-teal underline hover:text-teal-darker"
                                target="_blank"
                                :href="gravatarLink"
                                :title="gravatar">{{ gravatar }}</a>
                        </p>
                    </div>

                    <div class="max-w-lg w-full sm:flex">
                        <form class="border-grey-light p-4">
                            form
                        </form>
                    </div>
                </section>
            <!--</zoom-y-transition>-->
        </div>
    </transition>
</template>

<script>
  import axios from 'axios'
  import { ZoomYTransition } from 'vue2-transitions'

  export default {
    beforeMount () {
      this.fetchData()
    },

    components: {
      ZoomYTransition
    },

    computed: {
      buttonText () {
        return this.showForm ? this.cancelText : this.editText
      },

      gravatar () {
        return this.gravatarLink.replace(/(^\w+:|^)\/\//, '')
      }
    },

    data () {
      return {
        backButton: false,
        cancelText: false,
        editText: false,
        endpoint: `${this.$route.meta.endpoint.url}/${this.$route.params.id}/edit`,
        fields: [],
        gravatarInfo: false,
        gravatarLink: false,
        items: [],
        parent: this.$route.meta.parent,
        profile: false,
        showProfile: true,
        showForm: false,
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
            this.fields = r.data.fields
            this.profile = r.data.profile
            this.editText = r.data.editText
            this.gravatarInfo = r.data.gravatarInfo
            this.gravatarLink = r.data.gravatarLink
            this.cancelText = r.data.cancelText
          })
      },

      showEdit () {
         if (this.showProfile) {
          this.showProfile = false
          setTimeout(() => {
            this.showForm = true
          }, 300)

           return false
        }

        if (this.showForm) {
          this.showForm = false
          setTimeout(() => {
            this.showProfile = true
          }, 300)

          return false
        }
      }
    },

    name: "edit"
  }
</script>
