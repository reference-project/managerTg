import Vue from 'vue'
import Router from 'vue-router'
import index from './view/index/index.vue'
import addfoods from './view/addFoods/index.vue'
import Login from './view/login/login.vue'
import cs from './view/cs/cs.vue'
import listFoods from './view/listFoods/index.vue'
import downFoodsList from './view/upFoodsList/upfoodlist.vue'
Vue.use(Router)
export default new Router({
    routes:[
        {
            path:'/',
            redirect: '/index'
        },
        {
              path:'/index',
              name:'index',
              component:index
        },{
            path:'/addfoods',
            name:'addfoods',
            component:addfoods
        },{
            path:'/login',
            name:'login',
            component:Login
        },{
            path:'/cs',
            name:'cs',
            component:cs
        },{
            path:'/listFoods',
            name:'listFoods',
            component:listFoods
        },
        {
            path:'/upfoods',
            name:'upfoods',
            component:downFoodsList
        }
    ]
})