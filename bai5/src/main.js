import Vue from 'vue'
import App from './App.vue'
import userStore from './_store/store'
import router from './_helpers/router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/reset.css'
Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  router,
  store:userStore,
  render: h => h(App),
}).$mount('#app')
