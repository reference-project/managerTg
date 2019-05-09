<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark title">
          <p>商品上架</p>
        </div>
      </el-col>
    </el-row>
    <el-row class="foodsDes">
      <el-col :span="12">
        <div class="grid-content">
          商品名称:
          <input v-model="foodsName" type="text">
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content">
          商品规格:
          <input v-model="Specifications" placeholder=":例如多少克一份" type="text">
        </div>
      </el-col>
    </el-row>
    <el-row class="foodsDes">
      <el-col :span="12">
        <div class="grid-content">
          所属分类:
          <select name="select" v-model="couponSelected" class="myCategory">
            <option
              :key="index"
              v-for="(item,index) in categoryArry"
              :value="item.cateGoryId"
            >{{item.cateGoryName}}</option>
          </select>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content">
          库存数量:
          <input type="t
            ext" v-model="number" placeholder="0">
        </div>
      </el-col>
    </el-row>
    <el-row class="foodsDes">
      <el-col :span="12">
        <div class="grid-content">
          商品价格:
          <input v-model="price" type="text" placeholder="￥">
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content">
          对比的价格:
          <input v-model="oldPrice" type="text" placeholder="￥">
        </div>
      </el-col>
    </el-row>
     <el-row class="foodsDes">
      <el-col :span="24">
        <div class="grid-content">
          商品ID:
          <input v-model="foodsid" type="text" placeholder="￥">
        </div>
      </el-col>
    </el-row>
    <el-row class="asMessage">
      <el-col :span="24">
        <p>商品轮播图选择,请先处理好图片格式与大小,以免造成上传失败</p>
      </el-col>
    </el-row>
    <div class="vue-uploader">
      <div class="file-list imgUpload">
        <section v-for="(file, index) of files" class="file-item draggable-item" :key="file.name">
          <img :src="file.src" alt ondragstart="return false;">
          <span class="file-remove" @click="remove(index)">+</span>
        </section>
        <section v-if="status == 'ready'" class="file-item">
          <div @click="add" class="add"></div>
        </section>
      </div>
      <section v-if="files.length != 0" class="upload-func">
        <div class="progress-bar">
          <section v-if="uploading" :width="(percent * 100) + '%'">{{(percent * 100) + '%'}}</section>
        </div>
        <div class="operation-box">
          <button v-if="status == 'ready'" @click="submit">上传</button>
          <button v-if="status == 'finished'" @click="finished">完成</button>
        </div>
      </section>
      <input
        type="file"
        @change="fileChanged"
        ref="file"
        multiple="multiple"
        accept="image/jpg, image/jpeg, image/png, image/bmp"
      >
    </div>
    <div v-loading="loading" style="background:white;width:900px; margin-left:20px;">
      <!--上传图片时得加载画面-->
      <VueEditor
        style="width:900px;"
        useCustomImageHandler
        @imageAdded="handleImageAdded"
        :editorToolbar="customToolbar"
        v-model="content"
      ></VueEditor>
    </div>
    <div class="bottom">
      <button class="addShop" @click="addShops">上架商品</button>
    </div>
  </div>
</template>
<script>
import OSS from "ali-oss";
import axios from "axios";
import { VueEditor } from "vue2-editor";

export default {
  components: {
    VueEditor
  },
  data() {
    return {
      status: "ready",
      files: [],
      point: {},
      uploading: false,
      percent: 0,
      myImglist: [],
      content: "",
      loading: false,
      foodsid:0,
      customToolbar: [
        ["bold", "italic", "underline"],
        [{ align: "" }, { align: "center" }, { align: "right" }],
        [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
        [{ background: [] }, { color: [] }],
        ["image", "link"],
        ["strike"],
        ["clean"]
      ],
      foodsName: "",
      Specifications: "",
      number: "",
      price: "",
      oldPrice: "",
      categoryArry: [],
      uploadImgList: [],
      couponSelected:''//选择的分类ID
    };
  },
  mounted() {
    //刚进页面要做什么
    //获得所有的商品分类
    //赋值给选择分类的属性
    this.getCategory();
  },
  created() {
    console.log("页面创建时调用");
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
    handleChange(value) {
      //下拉框改变的方法
      console.log(value);
    },
    async addShops() {
      console.log("上架商品");
      //进行检验
      if(this.foodsName == ''){
         this.$message('商品名不能为空')
         return false
      }
      if(this.Specifications==''){
         this.$message('商品规格不能为空')
         return false
      }
      if(this.couponSelected==''){
        this.$message('未选择分类')
        return false
      }
      if(this.number==''){
        this.$message('库存不能为空')
        return false
      }
      if(this.uploadImgList.length ==0){
        this.$message('你没有选择轮播图')
        return false
      }
      if(this.price == ''){
        this.$message('价格不能为空')
        return false
      }
      //富文本内容和对比价格可以为空
      //通过验证进行下一步提交到后端保存
      let data = await axios.get('/foods/addFoods',{
        params:{
          foodsid:this.foodsid,
          foodsName:this.foodsName,
          Specifications:this.Specifications,
          number:this.number,
          price:this.price,
          oldPrice:this.oldPrice,
          uploadImgList:this.uploadImgList,
          couponSelected:this.couponSelected,
          content:this.content
        }
      })
      console.log(data)
      if(data.data.code==0){
        alert('商品上架成功')
      }

    },
    getName() {
      const client = new OSS({
        region: "oss-cn-shenzhen",
        accessKeyId: "LTAIDaT373YHmkTC",
        accessKeySecret: "ndTGswjQlWA2uz1m4Du3Drd73ULN13",
        bucket: "mycz"
      });
      console.log(this.myImglist);
      console.log(client.signatureUrl(this.myImglist[0],{expires: 315360000}));
    },
    add() {
      this.$refs.file.click();
    },
    submit() {
      console.log(this.files, "这是图片");
      const client = new OSS({
        region: "oss-cn-shenzhen",
        accessKeyId: "LTAIDaT373YHmkTC",
        accessKeySecret: "ndTGswjQlWA2uz1m4Du3Drd73ULN13",
        bucket: "mycz"
      });
      const fNum = this.files;
      for (var i = 0; i < fNum.length; i++) {
        var f = fNum[i].file;
        console.log(f, "这是上传图片的数据");
        const Name = f.name;
        console.log(Name);
        const suffix = Name.substr(Name.indexOf("."));
        const obj = this.timestamp();
        const storeAs = "header/" + obj + suffix; // 路径+时间戳+后缀名
        // console.log(storeAs);
        this.myImglist.push(storeAs);
        client
          .multipartUpload(storeAs, f)
          .then(result => {
            console.log(result.res);
          })
          .catch(err => {
            console.log(err);
            this.$message.error(`遇到无法上传的文件格式,错误为${err}`);
          });
        console.log(this.myImglist, "mylist");
        //得到所有上传图片名称的数组,在将mylist的图片进行签名验证返回图片地址
        let newArr = this.myImglist.map(item => {
          return client.signatureUrl(item,{expires: 315360000});
        });
        this.$alert("图片上传成功", "提示", {
          confirmBttonText: "确定"
        });
        this.status = "finished";
        console.log(newArr); //得到签名后的图片地址数组
        this.uploadImgList = newArr;
      }
    },
    // 时间戳
    timestamp: function() {
      const time = new Date();
      const y = time.getFullYear();
      const m = time.getMonth() + 1;
      const d = time.getDate();
      const h = time.getHours();
      const mm = time.getMinutes();
      const s = time.getSeconds();
      const ms = time.getMilliseconds();
      return (
        "" +
        y +
        this.Add0(m) +
        this.Add0(d) +
        this.Add0(h) +
        this.Add0(mm) +
        this.Add0(s) +
        this.Add0(ms)
      );
    },
    Add0: function(m) {
      return m < 10 ? "0" + m : m;
    },

    finished() {
      this.files = [];
      this.status = "ready";
    },
    remove(index) {
      this.files.splice(index, 1);
    },
    fileChanged() {
      const list = this.$refs.file.files;
      for (let i = 0; i < list.length; i++) {
        if (!this.isContain(list[i])) {
          const item = {
            name: list[i].name,
            size: list[i].size,
            file: list[i]
          };
          this.html5Reader(list[i], item);
          this.files.push(item);
        }
      }
      this.$refs.file.value = "";
    },
    // 将图片文件转成BASE64格式
    html5Reader(file, item) {
      const reader = new FileReader();
      reader.onload = e => {
        this.$set(item, "src", e.target.result);
      };
      reader.readAsDataURL(file);
    },
    isContain(file) {
      return this.files.find(
        item => item.name === file.name && item.size === file.size
      );
    },
    handleImageAdded: function(file, Editor, cursorLocation) {
      //上传图片操作
      console.log(file, "这是图片");
      const clinet = new OSS({
        region: "oss-cn-shenzhen",
        accessKeyId: "LTAIDaT373YHmkTC",
        accessKeySecret: "ndTGswjQlWA2uz1m4Du3Drd73ULN13",
        bucket: "mycz"
      });
      //命名规则
      let random = Math.floor(Math.random() * 1000);
      //取一个随机数的一千倍,在加上当前时间戳
      var timestamp = Date.parse(new Date());
      //把获取到的图片url 插入到鼠标所在位置 回显图片
      let strName = timestamp.toString() + random.toString() + file.name;
      clinet.multipartUpload(strName, file).then(res => {
        //设置过期时间
        //生成url
        console.log( clinet.signatureUrl(res.name,{expires: 315360000}));
        Editor.insertEmbed(
          cursorLocation,
          "image",
         
        );
      });
    }
  }
};
</script>
<style lang="scss">
.title {
  p {
    text-align: center;
    font-size: 30px;
    border-bottom: 1px solid gainsboro;
    margin-bottom: 20px;
  }
}
.myCategory{
  width: 280px;
  height: 30px;
  line-height: 30px;
  border-radius: 8px;
   option{
      text-align: center;
   }
}
.bottom {
  width: 100%;
  height: 120px;
  display: flex;
  align-items: center;
  .addShop {
    margin: auto;
    width: 200px;
    height: 40px;
    line-height: 40px;
    background: rgb(41, 192, 181);
    color: white;
    border: none;
    border-radius: 30px;
    font-size: 20px;
  }
}
.foodsDes {
  margin-bottom: 30px;
  text-align: center;
  input {
    height: 32px;
    text-align: left;
    width: 70%;
    margin-left: 5%;
    border-radius: 10px;
    border: solid gainsboro 1px;
  }
}
.asMessage {
  border: 1px solid rgb(41, 192, 181);
}
.vue-uploader {
  border: 1px solid #e5e5e5;
  margin: 30px;
}
.vue-uploader .file-list {
  padding: 10px 0px;
}
.vue-uploader .file-list:after {
  content: "";
  display: block;
  clear: both;
  visibility: hidden;
  line-height: 0;
  height: 0;
  font-size: 0;
}
.vue-uploader .file-list .file-item {
  float: left;
  margin-left: 10px;
  height: 160px;
  position: relative;
  width: 150px;
  text-align: center;
}
.vue-uploader .file-list .file-item img {
  width: 150px;
  height: 150px;
  border: 1px solid #ececec;
}
.vue-uploader .file-list .file-item .file-remove {
  position: absolute;
  right: 4px;
  display: none;
  top: 4px;
  width: 20px;
  height: 20px;
  font-size: 20px;
  text-align: center;
  color: white;
  cursor: pointer;
  line-height: 20px;
  border-radius: 100%;
  transform: rotate(45deg);
  background: rgba(0, 0, 0, 0.5);
}
.vue-uploader .file-list .file-item:hover .file-remove {
  display: inline;
}
.vue-uploader .file-list .file-item .file-name {
  margin: 0;
  height: 40px;
  word-break: break-all;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.vue-uploader .add {
  width: 50px;
  background: url("../../assets/加.png") no-repeat;
  background-position: center;
  height: 50px;
  float: left;
  text-align: center;
  line-height: 50px;
  font-size: 15px;
  cursor: pointer;
  background-size: 100% 100%;
}
.vue-uploader .upload-func {
  display: flex;
  padding: 10px;
  margin: 0px;
  background: #f8f8f8;
  border-top: 1px solid #ececec;
}
.vue-uploader .upload-func .progress-bar {
  flex-grow: 1;
}
.vue-uploader .upload-func .progress-bar section {
  margin-top: 5px;
  background: #00b4aa;
  border-radius: 3px;
  text-align: center;
  color: #fff;
  font-size: 12px;
  transition: all 0.5s ease;
}
.vue-uploader .upload-func .operation-box {
  flex-grow: 0;
  padding-left: 10px;
}
.vue-uploader .upload-func .operation-box button {
  padding: 4px 12px;
  color: #fff;
  background: #007acc;
  border: none;
  border-radius: 2px;
  cursor: pointer;
}

.vue-uploader > input[type="file"] {
  display: none;
}
</style>