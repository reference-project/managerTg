<template>
  <div>
    <el-upload
      :http-request="Upload"
      :data="dataObj"
      :multiple="false"
      :show-file-list="false"
      :before-upload="beforeUpload"
      class="image-uploader"
      drag
      action
    >
      <i class="el-icon-upload"/>
      <div class="el-upload__text">
        将图片拖到此处，或
        <em>点击上传</em>
      </div>
    </el-upload>
    <ul>
      <li v-for="(item,index) in imgList" :key="index">
         <img :src="item" alt="">
      </li>
    </ul>
    <button @click="getUrl">获取图片名字</button>
  </div>
</template>
<script>
import { client } from "../../../utils/ali.js";
import axios from "axios";
export default {
  data() {
    return {
      tempUrl: "", //存上传后的图片URL
      dataObj: {}, //存签名信息
      baseAli: "http://mycz.oss-cn-shenzhen.aliyuncs.com",
      progress: 0, //进度条,
      imgUrl: "",
      imgList:[]
    };
  },
  mounted() {
    this.getToken()

    console.log(this.dataObj,'mounted')
  },
  methods: {
    getToken() {
      axios.post("/auth/getAliSelect").then(res => {
        console.log(res.data.data);
        this.dataObj = res.data.data;
        console.log(this.dataObj);
      });
    },
    beforeUpload() {
      console.log('123')
    },
    Upload(file) {
      console.log(file, "this file name!");
      const that = this;
      //判断扩展名
      const tmpcnt = file.file.name.lastIndexOf(".");
      const exname = file.file.name.substring(tmpcnt + 1);
      const names = ["jpg", "jpeg", "webp", "png", "bmp", "gif"];
      if (names.indexOf(exname) < 0) {
        this.$message.error("不支持的格式!");
        return;
      }
      async function multipartUpload() {
        const fileName =
          file.file.name.split(".")[0] +
          file.file.uid +
          "." +
          file.file.name.split(".")[1];
        console.log(fileName, "abc");
        //定义唯一的文件名，打印出来的uid其实就是时间戳
        //client 是第一步中的 client
        client(that.dataObj)
          .multipartUpload(fileName, file.file, {
            progress: function(p) {
              //获取进度条的值
              console.log(p);
              that.progress = p * 100;
            }
          })
          .then(result => {
            console.log(result);
            //下面是如果对返回结果再进行处理，根据项目需要
            // console.log(result)
            that.tempUrl =
              "http://" +
              result.bucket +
              "." +
              that.baseAli +
              "/" +
              result.name;
            that.imgUrl = result.name;
          })
          .catch(err => {
            console.log("err:", err);
          });
      }
      multipartUpload();
    },
    getUrl() {
     let imgStr=client(this.dataObj).signatureUrl(this.imgUrl,{expires: 315360000});
      this.imgList.push(imgStr)
    }
  }
};
</script>
<style lang='scss' scoped>
</style>

