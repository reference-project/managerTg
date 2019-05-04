<template>
  <div class="listFoods">
    <p class="title">商品管理列表</p>
    <div class="searchBroad">
      <input type="text" placeholder="搜索商品请输入商品名字" v-model="searchName"><button>搜索</button>
    </div>
    <dl>
      <dt>
        <ul>
          <li>商品名称</li>
          <li>库存</li>
          <li>价格</li>
          <li>规格</li>
        </ul>
      </dt>
      <dd v-for="(item,index) in foodsList" :key="index">
        <ul>
          <li>{{item.foodsName}}</li>
          <li>{{item.number}}</li>
          <li>{{item.foodsPrice}}</li>
          <li>{{item.foodsdescribe}}</li>
          <li>
            <button @click="down" class="down">下架</button>
          </li>
          <li>
            <button @click="edit" class="edit">编辑商品</button>
          </li>
        </ul>
      </dd>
    </dl>
    <p class="buttom">
      <button>上一页</button>
      页码数:{{start+1}}
      <button>下一页</button>
    </p>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      start:0,
      foodsList: [],
      searchName:''
    };
  },
  mounted() {
    this.getFoodsList();
  },
  methods: {
    async getFoodsList() {
      let result = await axios.get("/foods/getFoodsList", {
        params: {
          start:this.start
        }
      });
      const {
        status,
        data: { data }
      } = result;
      if (status == 200) {
        console.log(data);
        this.foodsList = data;
      }
    },
    down(){
      console.log('下架')
    },
    edit(){
      console.log('编辑商品')
    }
  }
};
</script>
<style lang='scss'>
.listFoods {
  .title{
    text-align: center;
    height: 80px;
    line-height: 80px;
    font-size: 20px;
  }
  .searchBroad{
    width: 308px;
    display: flex;
    height: 60px;
    input{
      width: 200px;
      height: 30px;
      line-height:30px;
      border-radius: 15px 0 0 15px;
      border: 1px solid rgb(41, 192, 181);
      padding-left: 10px;
    }
    button{
      background: rgb(41, 192, 181);
      border-radius: 0 15px 15px 0;
      border: 1px solid rgb(41, 192, 181);
      width: 80px;
      height: 32px;
      color: white;
    }
  }
  dl {
    width: 100%;
    dt {
      ul {
        display: flex;
        li {
          height: 50px;
          line-height: 30px;
          width: 133px;
          list-style: none;
          text-align: center;
        }
      }
    }
    dd {
      border-bottom: 1px solid burlywood;
      ul {
        display: flex;
        li {
          text-align: center;
          height: 50px;
          line-height: 50px;
          width: 200px;
          list-style: none;
          .down {
            width: 80px;
            height: 30px;
            background: red;
            color: white;
            text-align: center;
            line-height: 30px;
            border: none;
            border-radius: 15px;
          }
          .edit {
            width: 80px;
            height: 30px;
            background: orange;
            color: white;
            text-align: center;
            line-height: 30px;
            border: none;
            border-radius: 15px;
          }
        }
      }
    }
    dd:nth-of-type(odd){
       background: rgb(41, 192, 181);
       color: white;
    }
  }
}
</style>