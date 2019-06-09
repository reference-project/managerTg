<template>
  <div>
    <p class="title">修改佣金比例</p>

    <p>
      <input type="text" placeholder="请输入佣金比例" v-model="setNum">
    </p>
    <button @click="setButton(1)">修改佣金比例</button>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      setNum: 0
    };
  },
  mounted() {
    //进入页面先进行初始化
    this.setButton(0);
    this.getNum()
  },
  methods: {
    async setButton(value) {
      if (value == 0) {
        let ares = await axios.post("/setCom/set");
        if(ares){
            console.log('初始化')
        }
      }
      if (value == 1) {
        
        let res = await axios.post("/setCom/set", {
           setNum: this.setNum
        });
        const {
          status,
          data: { msg }
        } = res;
        if(status==200)
        {
            console.log(msg)
           this.$message(msg)
           this.getNum()
        }
      }
    },
    async getNum(){
        let res = await axios.get('/setCom/getNum')
        const {status,data:{data}} = res
        this.setNum = data
    }
  }
};
</script>
<style lang='scss'>
</style>