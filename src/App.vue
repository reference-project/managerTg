<template>
  <div>
    <div class="index">
      <div class="top"></div>
      <router-link to="/index" class="a">首页</router-link>
      <router-link to="/addfoods" class="a">商品管理</router-link>
       <router-link to="/upfoods" class="a">已下架商品</router-link>
      <router-link to="/cs" class="a">添加商品</router-link>
      <router-link to="/listFoods" class="a">商品列表</router-link>
      <router-link to="/addCategory" class="a">分类管理</router-link>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {}
};
</script>
<style lang='scss'>
* {
  margin: 0;
  padding: 0;
}
.index {
  width: 130px;
  height: 100%;
  position: fixed;
  left: 0;
  background: rgba(141, 141, 141, 0.5);
  .top {
    width: 130px;
    height: 65px;
    background: rgb(41, 192, 181);
  }
  .a {
    display: block;
    text-align: center;
    color: white;
    height: 50px;
    width: 110px;
    margin-left: 10px;
    line-height: 50px;
    text-decoration: none;
    border-bottom: 1px solid white;
  }
}
.content {
  width: 800px;
  height: 800px;
  margin-left: 138px;
}
</style>