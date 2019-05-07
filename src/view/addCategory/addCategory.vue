<template>
  <div class="addCategory">
    <div class="add">
      添加分类
      <p>
        <input type="text" placeholder="分类名称" v-model="categoryName">
        <span>分类名称</span>
      </p>
      <p>
        <input type="text" placeholder="分类id" v-model="categoryId">
        <span>分类id</span>
      </p>
      <p>
        <input type="text" v-model="cateSelectId">
        <span>分类排序id数字越大排名越靠前</span>
      </p>
      <button @click="addCategory">添加分类</button>
    </div>
    <div class="listCategory">
      <p>已有分类管理</p>
      <ul>
        <li>
          <span>分类名称</span>
          <span>分类id</span>
          <span>排列id</span>
          <span>操作</span>
        </li>
      </ul>
      <ul>
        <li v-for="(item,index) in categoryArry" :key="index">
          <span>{{item.cateGoryName}}</span>
          <span>{{item.cateGoryId}}</span>
          <span>{{item.selectId}}</span>
          <button @click="delCategory(item.cateGoryId)">删除</button>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      categoryName: "",
      categoryId: "",
      cateSelectId: "",
      categoryArry: []
    };
  },
  mounted() {
    this.getCategory();
  },
  methods: {
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
    async addCategory() {
      if (this.categoryName == "") {
        this.$message("未填写分类名称");
        return false;
      }
      if (this.categoryId == "") {
        this.$message("未填写分类id");
        return false;
      }
      if (this.cateSelectId == "") {
        this.$message("未填写分类排序id");
        return false;
      }
      let res = await axios.get("/foods/addCategory", {
        params: {
          name: this.categoryName,
          id: this.categoryId,
          selectId: this.cateSelectId
        }
      });
      const {
        status,
        data: {code,msg }
      } = res;
      if (status == 200) {
        if(code==0){
            this.getCategory()
            this.$message(msg)
        }
        else{
          this.$message(msg)
        }
      }
    },
    async delCategory(value) {
      console.log(value);
      let res = await axios.get('/foods/delCategory',{
          params:{
              id:value
          }
      })
      const {status,data:{msg}} = res
      if(status==200){
          this.$message(msg)
          this.getCategory()
      }else{
          this.$message('网络请求失败')
      }
    }
  }
};
</script>
<style lang='scss'>
.addCategory {
  width: 100%;
  .add {
    padding: 20px;
    p {
      height: 60px;
      line-height: 60px;
      span {
        margin-left: 10px;
      }
      input {
        width: 130px;
        height: 30px;
        border: 2px solid rgb(41, 192, 181);
        border-radius: 15px;
        margin-left: 15px;
      }
    }
    button {
      width: 100px;
      height: 46px;
      background: rgb(41, 192, 181);
      color: white;
      text-align: center;
      border-radius: 15px;
      border: 2px solid rgb(41, 192, 181);
      margin-left: 16px;
    }
  }
  .listCategory {
    p {
      font-size: 16px;
      border-bottom: 1px solid black;
    }
    ul {
      li {
        list-style-type: none;
        height: 35px;
        line-height: 35px;
        border-bottom: 1px solid rgb(41, 192, 181);
        display: flex;
        span {
          margin-left: 15px;
          margin-right: 15px;
          width: 120px;
          display: block;
        }
        button {
          width: 80px;
          height: 30px;
          margin-top: 2px;
          border: none;
          background: grey;
          border-radius: 10px;
          color: white;
        }
      }
    }
  }
}
</style>