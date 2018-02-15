<template>
    <transition name="fade">
        <div class="container mx-auto">
            <page-title :title="translate(`menu.settings`)"/>

            <div class="panel panel-md">
                <div :class="titleClass(translate('alerts.hidden_alerts'))">
                    <span>{{ translate('alerts.hidden_alerts') }}</span>

                    <a href="#"
                       :class="buttonClass(translate('alerts.hidden_alerts'))"
                       :title="aTitle(translate('alerts.hidden_alerts'))"
                       @click.prevent="toggleCollapse(translate('alerts.hidden_alerts'))">
                        <svg height="20" width="20" class="fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M7 10v8h6v-8h5l-8-8-8 8h5z"/></svg>
                    </a>
                </div>

                <div :class="isCollapsed(translate('alerts.hidden_alerts')) ? 'collapsed collapsible' : 'collapsible'">
                    <div class="p-4 text-lg" v-if="!items.length" v-html="translate('alerts.no_hidden_alerts')"/>

                    <template v-for="item in items" v-else>
                        <p class="p-2 text-sm flex justify-between"><span v-html="item"/> <a
                            class="unhide-alert self-center text-xs ml-1 no-outline px-1 py-1 leading-none border rounded hover:text-blue-darker hover:bg-blue-lightest"
                            href="#" @click.prevent="restoreAlert(item)">{{ translate('actions.unhide') }}</a></p>
                    </template>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
  import { mapActions } from 'vuex'
  import pageTitle from './_partials/page-title'

  export default {
    components: {
      pageTitle
    },

    beforeMount () {
      this.fetchData()
    },

    data () {
      return {
        items: [],
        collapsed: []
      }
    },

    methods: Object.assign({}, mapActions([
      'restoreAlert',
      'restoreAllAlerts',
      'collapseWindow',
      'expandWindow'
    ]), {
      aTitle (wndw) {
        return this.translate(this.isCollapsed(wndw) ? 'actions.expand' : 'actions.collapse')
      },
      buttonClass (wndw) {
        return this.isCollapsed(wndw) ? 'collapse-button collapsed' : 'collapse-button'
      },
      fetchData () {
        this.items = this.$store.state.hiddenAlerts
        this.collapsed = this.$store.state.collapsedWindows
      },
      isCollapsed (wndw) {
        return this.inArray(wndw, this.collapsed)
      },
      titleClass (wndw) {
        let common = 'panel-title flex justify-between items-center'

        return this.isCollapsed(wndw)
          ? `${common} border-b`
          : common
      },
      toggleCollapse(wndw) {
        if (this.isCollapsed(wndw)) {
          this.expandWindow(wndw)
        } else {
          this.collapseWindow(wndw)
        }
      }
    }),

    name: 'settings'
  }
</script>

<style scoped>

</style>