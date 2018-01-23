<template>
    <transition name="fade">
        <div class="container mx-auto" v-show="title">
            <div class="pt-6 pb-4 flex">
                <span v-html="title"/>
                <span class="ml-1 font-narrow text-white bg-teal-lighter py-1 px-2 rounded">{{ items.length }}</span>
            </div>

            <router-link
                class="inline-block text-sm px-4 py-2 mb-4 leading-none border rounded text-teal border-teal hover:text-teal-darker hover:bg-teal-lightest lg:sm-0 mb-4"
                tag="button"
                :to="$route.path + '/create'">{{ createText }}</router-link
            >

            <div
                class="mb-4 sm:flex sm:items-center border-b border-b-2 border-teal w-full sm:w-1/3 sm:float-right"
                v-show="totalRows > perPage">
                <input
                    autofocus
                    class="appearance-none bg-transparent border-none w-full text-grey-darker mr-3 py-1 px-2"
                    id="filter"
                    name="filter"
                    ref="filter"
                    title="filter"
                    type="text"
                    v-model="filter"
                    :placeholder="filterText">
                <button
                    :class="clearButtonClass"
                    @click="filter = ''">X</button>
            </div>

            <b-table
                striped
                hover
                :current-page="currentPage"
                :items="items"
                :fields="fields"
                :filter="filter"
                :per-page="perPage">
                    <template slot="name" slot-scope="data">
                        <span v-html="data.value.image"/>

                        <router-link
                                :to="data.value.url"><span
                                class="hover:text-teal-dark text-teal ml-2">{{ data.value.name }}</span
                        ></router-link>
                    </template>
            </b-table>

            <b-pagination
                class="my-0 justify-center"
                v-model="currentPage"
                v-show="totalRows > perPage"
                :total-rows="totalRows"
                :per-page="perPage"/>
        </div>
    </transition>
</template>

<script>
  import axios from 'axios'

  export default {
    beforeMount () {
      this.fetchData()
    },

    computed: {
      clearButtonClass () {
        return this.filter
          ? 'border rounded-full px-1 text-grey-darker border-grey-darker mb-1 font-mono'
          : 'border rounded-full px-1 text-grey-lighter border-grey-lighter mb-1 font-mono'
      }
    },

    data () {
      return {
        busy: false,
        createText: false,
        createUrl: `${this.$route.meta.endpoint.url}/create`,
        currentPage: 1,
        endpoint: this.$route.meta.endpoint.url,
        fields: [],
        filter: null,
        filterText: null,
        items: [],
        perPage: 10,
        title: '',
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
            this.title = r.data.title
            this.createText = r.data.createText
            this.filterText = r.data.filterText
            this.totalRows = r.data.items.length
          })
      }
    },

    name: "index"
  }
</script>
