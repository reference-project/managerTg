import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import ElementUi from 'element-ui'
import JsonExcel from 'vue-json-excel'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUi)
Vue.component('downloadExcel',JsonExcel)
Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
  if(to.meta.requireAuth){
    if(localStorage.getItem('myuser')){
        next()
    }else{
      next({
        path:'/login',
      })
    }
  }else{
    next()
  }
})
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
