<template>
    <transition name="fade">
        <div class="container mx-auto" v-if="loaded(items)">
            <page-title :badge="items.length"
                        :title="translate(`menu.${resource}`)"/>

            <router-link class="btn btn-outline btn-outline-blue"
                         tag="button"
                         :to="$route.path + '/create'">{{ translate(`${resource}.create`) }}</router-link
            >

            <div class="dt-filter sm:w-1/3 sm:float-right sm:flex sm:items-center"
                 v-show="totalRows > perPage">
                <input autocomplete="false"
                       autofocus
                       id="dt-search"
                       name="dt-search"
                       type="text"
                       v-model="filter"
                       :placeholder="translate('filter')"
                       :title="translate('filter')"
                >

                <button :class="clearButtonClass"
                        :title="translate('actions.clear')"
                        @click="filter = ''"><svg class="fill-current"
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  viewBox="0 0 20 20"
                ><path d="M0 10l7-7h13v14H7l-7-7zm14.41 0l2.13-2.12-1.42-1.42L13 8.6l-2.12-2.13-1.42 1.42L11.6 10l-2.13 2.12 1.42 1.42L13 11.4l2.12 2.13 1.42-1.42L14.4 10z"/></svg
                ></button>
            </div>

            <b-table hover
                     striped
                     :current-page="currentPage"
                     :items="items"
                     :fields="fields"
                     :filter="filter"
                     :per-page="perPage">

                <template slot="name"
                          slot-scope="data"
                          v-if="hasName">
                    <span v-html="data.value.image"/>

                    <router-link :to="data.value.url"
                        ><span class="hover:text-teal-dark text-teal ml-2">{{ data.value.name }}</span
                    ></router-link>
                </template>
            </b-table>

            <b-pagination class="my-0 justify-center"
                          v-model="currentPage"
                          v-show="totalRows > perPage"
                          :total-rows="totalRows"
                          :per-page="perPage"/>
        </div>
    </transition>
</template>

<script>
  import axios from 'axios'
  import pageTitle from '../_partials/page-title'

  export default {
    beforeMount () {
      this.fetchData()
    },

    components: {
      pageTitle
    },

    computed: {
      clearButtonClass () {
        let common = 'clear-dt-search'

        return this.filter
          ? `${common} on`
          : `${common} off`
      },
      createUrl () {
        return `${this.endpoint}/create`
      },
      endpoint () {
        return this.$route.meta.endpoint.url
      },
      hasName () {
        return this.items[0].hasOwnProperty('name')
      }
    },

    data () {
      return {
        currentPage: 1,
        fields: [],
        filter: null,
        items: {},
        perPage: 10,
        resource: '',
        totalRows: 0
      }
    },

    methods: {
      fetchData () {
        axios
          .get(this.endpoint)
          .then((r) => {
            this.items = r.data.items
            this.fields = r.data.fields
            this.resource = r.data.resource
            this.totalRows = r.data.items.length
          })
      }
    },

    name: "Users-index",

    watch: {
      endpoint () {
        this.fetchData()
      }
    }
  }
</script>
