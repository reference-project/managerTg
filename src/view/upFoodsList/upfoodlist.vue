<template>
  <div class="listFoods">
    <p class="title">已经下架的商品</p>
    <div class="searchBroad">
      <input type="text" placeholder="搜索商品请输入商品名字" v-model="searchName">
      <button @click="searchProduct">搜索</button>
    </div>
    <div class="searchBroad2">
      <select name="select" v-model="couponSelected" class="myCategory">
        <option
          :key="index"
          v-for="(item,index) in categoryArry"
          :value="item.cateGoryId"
        >{{item.cateGoryName}}</option>
      </select>
      <p>分类</p>
      <button @click="allProduct">全部商品</button>
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
            <button @click="up(index)" class="up">上架</button>
          </li>
          <li>
            <button @click="edit(index)" class="edit">编辑商品</button>
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
      start: 0,
      foodsList: [],
      searchName: "",
      categoryArry: [],
      couponSelected: ""
    };
  },
  mounted() {
    this.getFoodsList();
    this.getCategory();
  },
  methods: {
    async searchProduct() {
      console.log("搜索");
      if (this.searchName == "") return false;
      let res = await axios.get("/foods/searchFoods", {
        params: {
          keyWord: this.searchName
        }
      });
      console.log(res);
      const {
        status,
        data: { data }
      } = res;
      if (status == 200) {
        console.log(data);
        this.foodsList = data;
      }
    },
    async allProduct() {
      this.getFoodsList();
    },
    async getCategory() {
      //获得商品分类数据
      let res = await axios.get("/foods/getCategory");
      console.log(res);
      const {
        status,
        data: { data }
      } = res;
      console.log(status, data);
      if (status === 200) {
        this.categoryArry = data;
      }
    },
    async getFoodsList() {
      let result = await axios.get("/foods/getupFoodlist", {
        params: {
          start: this.start
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
    async up(value) {
      console.log(value);
      let res = await axios.post("/foods/upFoods", {
        data: this.foodsList[value]
      });
      console.log(res);
      const {
        status,
        data: { data }
      } = res;
      if (status == 200) {
        console.log(data);
        this.$message("商品上架成功");
        this.getFoodsList()
      }
    },
    edit(value) {
      console.log(value);
    }
  },
  watch: {
    couponSelected() {
      console.log("分类值发生改变");
      //发送个后端接口,并返回所得到的分类所属内容，此内容不进行分页处理
      axios
        .get("/foods/categoryFoods", {
          params: {
            couponSelected: this.couponSelected
          }
        })
        .then(res => {
          console.log(res);
          const {
            status,
            data: { data }
          } = res;
          console.log(data);
          if (status == 200) {
            this.foodsList = data;
          }
        });
    }
  }
};
</script>
<style lang='scss'>
.listFoods {
  .title {
    text-align: center;
    height: 80px;
    line-height: 80px;
    font-size: 20px;
  }
  .searchBroad {
    width: 308px;
    display: flex;
    height: 60px;
    float: left;
    input {
      width: 200px;
      height: 30px;
      line-height: 30px;
      border-radius: 15px 0 0 15px;
      border: 1px solid rgb(41, 192, 181);
      padding-left: 10px;
    }
    button {
      background: rgb(41, 192, 181);
      border-radius: 0 15px 15px 0;
      border: 1px solid rgb(41, 192, 181);
      width: 80px;
      height: 32px;
      color: white;
    }
  }
  .searchBroad2 {
    width: 308px;
    display: flex;
    height: 60px;
    select {
      width: 100px;
      height: 30px;
      line-height: 30px;
      border-radius: 15px 0 0 15px;
      border: 1px solid rgb(41, 192, 181);
      padding-left: 10px;
    }
    p {
      background: rgb(41, 192, 181);
      border-radius: 0 15px 15px 0;
      border: 1px solid rgb(41, 192, 181);
      width: 60px;
      height:30px;
      text-align: center;
      color: white;
      font-size: 16px;
      margin: 0;
    }
    button {
      background: rgb(41, 192, 181);
      border-radius: 15px;
      border: 1px solid rgb(41, 192, 181);
      width: 80px;
      height: 32px;
      color: white;
      margin-left: 15px;
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
            background: grey;
            color: white;
            text-align: center;
            line-height: 30px;
            border: none;
            border-radius: 15px;
          }
          .up {
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
    dd:nth-of-type(odd) {
      background: rgb(41, 192, 181);
      color: white;
    }
  }
}
</style>