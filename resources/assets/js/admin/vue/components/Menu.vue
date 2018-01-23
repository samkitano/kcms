<template>
    <transition name="fade">
        <nav class="menu" v-if="menuItems">
            <ul class="menu-wrap">
                <template v-for="(menu, i) in menuItems">
                    <li :key="i" class="menu-group">
                        <span class="uppercase font-bold">{{ i }}</span>

                        <ul class="mt-1">
                            <template v-for="(item, ii) in menu">
                                <li :key="ii" class="text-grey">
                                    <router-link
                                            exact
                                            :to="item.path"
                                            class="menu-link">{{ item.meta.name }}</router-link
                                    >
                                </li>
                            </template>
                        </ul>
                    </li>
                </template>
            </ul>
        </nav>
    </transition>
</template>

<script>
  let vueRoutes = kitano.vueRoutes

  export default {
    mounted () {
      this.fetchData()
    },

    data () {
      return {
        menuItems: false
      }
    },

    methods: {
      fetchData () {
        let routes = vueRoutes
        let t = {}

        for (let r in routes) {
          let meta = routes[r].meta

          if (!t[meta.menu]) {
            t[meta.menu] = []
            t[meta.menu].push(routes[r])
          } else {
            t[meta.menu].push(routes[r])
          }
        }

        this.menuItems = t
      }
    },

    name: "k-menu"
  }
</script>
