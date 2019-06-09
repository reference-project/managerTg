<template>
  <div>
 <!-- 订单管理界面 --> 
      <h1>用户订单管理</h1>
      <ul class="headList">
        <li v-for="(item, index) in headList" :key="index" @click="selectHead(item.openid)"> 
        <!-- 所有团长 -->
        {{item.name}}
        </li>
      </ul>
      <ul class="orderList">
        <li v-for="(item,index) in orderlist" :key="index">
         <span>订单号:{{item.orderId}}</span>
         <span>时间:{{item.time}}</span>
         <span>金额:{{item.money}}</span>
        </li>
      </ul>
      <div>
        <button @click="Analysis">查看当前订单所有订单列表</button>
        该次团购所需的配货信息
        <ul>
          <li v-for="(item, index) in  foodsList" :key="index">
            <span>{{item.name}}</span><span>{{item.num}}</span>
          </li>
        </ul>
      </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
     data () {
       return {
         headList:[],
         orderlist:[],
         pageNum:0,
         foodsList:[]
       }
     },
     mounted(){
       this.getHeadList()
       this.getOrderList()
     },
     methods: {
       async selectHead(value){
         console.log('13')
      
           console.log(value)
           let res = await axios.get('/order/headerOrder',{
             params:{
               headId:value
             }
           })
           console.log(res.data.data)
          
             let arr = res.data.data.map(item=>{
              return {
                headId:item.headId,
                money:item.money,
                openId:item.openId,
                orderId:item.orderId,
                shops:item.shops,
                orderStatus:item.orderStatus,
                time:this.getLocalTime(item.time)
              }
            })
           this.orderlist=arr
           this.Analysis()
           //点击后筛选出来当前团长
       },
        Analysis(){
             //分析一次团购所有商品订单，并通过算法，做出一个商品数据对象
             // {   肉:25,腊肉:41  }
             //创建一个新对象去接收
             let obj={}
             let arr = []
             console.log(this.orderlist)
             this.orderlist.map(item=>{
    
                 item.shops.map(i=>{
                   arr.push(i)
                 })
             })

             arr.map((item)=>{
               console.log(item,'arr')
               if(obj[item.name]){
                 //判断当前json中是否存该商品名称
                 //如果存在就添加
                   obj[item.name]+=item.count
               }
               else{
                obj[item.name]=item.count
               }
             
             }) 
            
            console.log(obj,'对象·')
            // Object.keys(obj).forEach((item,index)=>{
            //   console.log(obj[index])
            //   console.log(index)
            // })
            let newarr= []
            let newobj={}
            for(let key in obj){
              newobj={}
              console.log(key)
              newobj.name=key
              newobj.num=obj[key]
              newarr.push(newobj)
            }
           console.log(newarr)
           this.foodsList =newarr
       },
        getHeadList(){
            axios.get('/head/allsHead').then(res=>{
              console.log(res.data.data)
              this.headList=res.data.data
            })
        },
        getOrderList(){
          //获取团长订单
          //先获取前十条
          axios.get('/head/orderList',{
            params:{
              start:0
            }
          }).then(res=>{
            let arr = res.data.data.map(item=>{
              return {
                headId:item.headId,
                money:item.money,
                openId:item.openId,
                orderId:item.orderId,
                shops:item.shops,
                orderStatus:item.orderStatus,
                time:this.getLocalTime(item.time)
              }
            })
            console.log(arr)
            this.orderlist = arr
            this.Analysis()
            // Analysis
           
          })
        },
      getLocalTime(nS) {    
        //传入时间戳返回时间转换格式 
         return new Date(parseInt(nS)).toLocaleString().replace(/:\d{1,2}$/,' ');     
      }
     }
}
</script>
<style lang='scss'>
     .headList{
       padding-left: 30px;
        width: 800px;
        li{
          float: left;
          width: 100px;
          height: 30px;
          background: red;
          color: white;
          text-align: center;
          border-radius: 10px;
          line-height: 30px;
        }
     }
     .orderList{
           width: 800px;
           margin-top: 62px;
           li{
             height: 52px;
             line-height: 52px;
             color: black;
             span{
               margin-left: 30px;
             }
           }
           li:nth-of-type(odd){
             background: rgb(41, 192, 181);
              color: white;
           }
     }
</style>