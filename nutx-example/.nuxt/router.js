import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL } from '@nuxt/ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _5bcf00e4 = () => interopDefault(import('../pages/boobs/index.vue' /* webpackChunkName: "pages/boobs/index" */))
const _cf10fc0a = () => interopDefault(import('../pages/yolo.vue' /* webpackChunkName: "pages/yolo" */))
const _5fb509cf = () => interopDefault(import('../pages/boobs/_id/index.vue' /* webpackChunkName: "pages/boobs/_id/index" */))
const _160066e0 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/boobs",
    component: _5bcf00e4,
    name: "boobs"
  }, {
    path: "/yolo",
    component: _cf10fc0a,
    name: "yolo"
  }, {
    path: "/boobs/:id",
    component: _5fb509cf,
    name: "boobs-id"
  }, {
    path: "/",
    component: _160066e0,
    name: "index"
  }],

  fallback: false
}

function decodeObj(obj) {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = decodeURIComponent(obj[key])
    }
  }
}

export function createRouter () {
  const router = new Router(routerOptions)

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    const r = resolve(to, current, append)
    if (r && r.resolved && r.resolved.query) {
      decodeObj(r.resolved.query)
    }
    return r
  }

  return router
}
