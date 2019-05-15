<template>
  <div class="head">
     <!-- 团长 -->
     <p class="title">团长管理</p>
      <ul class="empleHead1">
         <li >
             <span>姓名</span>
             <span>电话</span>
             <span>地址</span>
             <span>位置</span> <!--点击进入地图查看地址 -->
             <span>审核</span>
         </li>
     </ul>
     <ul class="empleHead">
         <li v-for="(item,index) in headList" :key="index">
             <span>{{item.name}}</span>
             <span>{{item.phone}}</span>
             <span>{{item.address}}</span>
             <span><button class="a">位置</button></span>
             <span><button class="b" @click="apply(item.openid)">审核</button></span>
         </li>
     </ul>
  </div>
</template>
<script>
import axios from 'axios'
export default {
      data() {
          return {
               headList:[]
          }
      },
      mounted(){
           this.getStatusDHead()
      },
      methods: {
          async getStatusDHead(){
              let res  = await axios.get('/head/allHead')
              console.log(res)
              const {status,data:{data}} = res
              console.log(data)
              this.headList = data
          },
         async apply(value){
              console.log(value)
             let res = await axios.get('/head/examineHead',{
                 params:{
                     status:2,
                     openid:value
                 }
             })
          }
      },
}
</script>
<style lang='scss'>
     .head{
         padding: 30px;
         .title{
             text-align: center;
             font-size: 26px;
         }
         .empleHead1{
             li{
                 display:flex;
                 background: rgb(41, 192, 181);
                 color: white;
                 height: 60px;
                 line-height: 60px;
                 text-align: center;
               span{
                   display: block;
                   width: 200px;
               }
             }
         }
        .empleHead{
             li:nth-of-type(even){
                 display:flex;
                 background: rgb(41, 192, 181);
                 color: white;
                 height: 60px;
                 line-height: 60px;
                 text-align: center;
               span{
                   display: block;
                   width: 200px;

               }
             }
             li:nth-of-type(odd){
                 display:flex;
                 background: white;
                 color: black;
                 height: 60px;
                 line-height: 60px;
                 text-align: center;
                 span{
                   display: block;
                   width: 200px;
                }
                 .a{
                       width: 100px;
                       height: 32px;
                       background:orange;
                       color: white;
                       border: none;
                       border-radius: 15px;
                   }
                    .b{
                       width: 100px;
                       height: 32px;
                       background:red;
                       color: white;
                       border: none;
                       border-radius: 15px;
                   }
             }
         }
     }
</style>