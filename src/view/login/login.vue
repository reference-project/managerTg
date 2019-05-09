<template>
  <div>
        <div class="tpl-login">
            <div class="tpl-login-content">
                <div class="tpl-login-logo">
                </div>
                <form class="am-form tpl-form-line-form">
                    <div class="am-form-group">
                        <input type="text" class="tpl-form-input" id="user-name" placeholder="请输入账号" v-model="user">
                    </div>
                    <div class="am-form-group">
                        <input type="password" class="tpl-form-input" id="user-name" placeholder="请输入密码" v-model="password">

                    </div>
                    <div class="am-form-group tpl-login-remember-me">
                        <input id="remember-me" type="checkbox">
                        <label for="remember-me">
       
                        记住密码
                         </label>
                    </div>
                    <div class="am-form-group">
                        <button type="button" class="am-btn am-btn-primary  am-btn-block tpl-btn-bg-color-success  tpl-login-btn" @click="login">登陆</button>
                    </div>
                </form>
            </div>
        </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
     data() {
       return {
         user:'',
         password:''
       }
     },
     mounted(){
        
     },
     methods: {
       async login(){ 
           let res = await axios.post('/user/signup',{
             user:this.user,
             password:this.password
           })
           console.log(res)
           if(res.data.code==0){
          
             localStorage.setItem('user',JSON.stringify(res.data))
             console.log(res.data)
            this.$router.push({path:'/index'})
           }
       }
     }
     
}
</script>
<style>
     
</style>