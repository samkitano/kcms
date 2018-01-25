/* global kitano */
import VueRouter from 'vue-router'
import Home from './components/Home.vue'

let vueRoutes = kitano.vueRoutes
let routes = [
  {
    path: '/admin',
    component: Home
  }
]

for (let i in vueRoutes) {
  let route = vueRoutes[i]
  let isCrud = route.meta.namespace !== '/'
  let indexComponentPath = isCrud
    ? `${route.meta.namespace}/${route.component}.vue`
    : `${route.component}.vue`
  let editComponentPath = isCrud
    ? `${route.meta.namespace}/Edit.vue`
    : false
  let createComponentPath = isCrud
    ? `${route.meta.namespace}/Create.vue`
    : false

  routes.push(
    {
      path: route.path,
      component: require('./components/' + indexComponentPath),
      meta: route.meta
    }
  )

  if (editComponentPath) {
    routes.push(
      {
        path: `${route.path}/:id/edit`,
        component: require('./components/' + editComponentPath),
        meta: { endpoint: { url: route.meta.endpoint.url }, parent: route.path }
      }
    )
  }

  if (createComponentPath) {
    routes.push(
      {
        path: `${route.path}/create`,
        component: require('./components/' + createComponentPath),
        meta: { endpoint: { url: `${route.meta.endpoint.url}/create` }, parent: route.path }
      }
    )
  }
//console.log(routes)
}

export default new VueRouter({
  abstract: true,
  mode: 'history',
  routes
})
