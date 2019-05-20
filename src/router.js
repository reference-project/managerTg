import Vue from 'vue'
import Router from 'vue-router'
import index from './view/index/index.vue'
import addfoods from './view/addFoods/index.vue'
import Login from './view/login/login.vue'
import cs from './view/cs/cs.vue'
import listFoods from './view/listFoods/index.vue'
import downFoodsList from './view/upFoodsList/upfoodlist.vue'
import addCategory from './view/addCategory/addCategory.vue'
import editFoods from './view/editFoods/index.vue'
import Head from './view/head/head.vue'
import setCom from './view/setCom/setCom.vue'
Vue.use(Router)
export default new Router({
    routes:[
        {
            path:'/',
            redirect: '/index',
            meta:{
                show:true,
                requireAuth:true
            }
        },
        {
              path:'/index',
              name:'index',
              component:index,
              meta:{
                show:true,
                requireAuth:true
            }
        },{
            path:'/addfoods',
            name:'addfoods',
            component:addfoods,
            meta:{
                show:true,
                requireAuth:true
            }
        },{
            path:'/login',
            name:'login',
            component:Login,
            meta:{
                show:false,
                requireAuth:false
            }
        },{
            path:'/cs',
            name:'cs',
            component:cs,
            meta:{
                show:true,
                requireAuth:true
            }
        },{
            path:'/listFoods',
            name:'listFoods',
            component:listFoods,
            meta:{
                show:true,
                requireAuth:true
            }
        },
        {
            path:'/upfoods',
            name:'upfoods',
            component:downFoodsList,
            meta:{
                show:true,
                requireAuth:true
            }
        },{
            path:'/addCategory',
            name:'addcategory',
            component:addCategory,
            meta:{
                show:true,
                requireAuth:true
            }
        },{
            path:'/editFoods',
            name:'editFoods',
            component:editFoods,
            meta:{
                show:true,
                requireAuth:true
            }
        },{
            path:'/Head',
            name:'head',
            component:Head,
            meta:{
                show:true,
                requireAuth:true
            }
        },
        {
            path:'/setCom',
            name:'setCom',
            component:setCom,
            meta:{
                show:true,
                requireAuth:true
            }
        }
    ]
})