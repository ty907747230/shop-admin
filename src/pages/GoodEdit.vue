<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="所属类型">
      <el-select v-model="form.category_id" placeholder="请选择分类">
        <el-option
          :label="item.title"
          v-for="(item,index) in categorys"
          :value="item.category_id"
          :key="index"
        ></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="是否发布">
      <el-switch v-model="form.status"></el-switch>
    </el-form-item>

    <el-form-item label="推荐类型">
      <el-checkbox label="置顶" v-model="form.is_top"></el-checkbox>
      <el-checkbox label="热门" v-model="form.is_hot"></el-checkbox>
    </el-form-item>

    <el-form-item label="内容标题">
      <el-input v-model="form.title"></el-input>
    </el-form-item>

    <el-form-item label="副标题">
      <el-input v-model="form.sub_title"></el-input>
    </el-form-item>

    <el-form-item label="封面图片">
      <!-- 上传组件 -->
      <!-- action：上传地址 -->
      <!-- show-file-list：是否支持多选 -->
      <!-- on-success: 上传成功之后的回调函数 -->
      <!-- before-upload：上传之前执行的函数 -->
      <el-upload
        class="avatar-uploader"
        action="http://localhost:8899/admin/article/uploadimg"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <!-- 图片预览 -->
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <!-- 加号图标 -->
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>

    <el-form-item label="商品货号">
      <el-input v-model="form.goods_no"></el-input>
    </el-form-item>

    <el-form-item label="库存数量">
      <el-input v-model="form.stock_quantity"></el-input>
    </el-form-item>

    <el-form-item label="市场价格">
      <el-input v-model="form.market_price"></el-input>
    </el-form-item>

    <el-form-item label="销售价格">
      <el-input v-model="form.sell_price"></el-input>
    </el-form-item>

    <el-form-item label="图片相册">
      <!-- 因为编辑需要渲染多张图片，需要file-list获取上传图片的信息 -->
      <el-upload
        action="http://localhost:8899/admin/article/uploadimg"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :on-success="handleCardsSuccess"
        :file-list="form.fileList"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt>
      </el-dialog>
    </el-form-item>

    <el-form-item label="内容摘要">
      <el-input type="textarea" v-model="form.zhaiyao"></el-input>
    </el-form-item>

    <el-form-item label="内容描述">
      <quill-editor v-model="form.content" ref="myQuillEditor"></quill-editor>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";
export default {
  data() {
    return {

      //图片的预览地址
      imageUrl: "",
      dialogImageUrl: "",
      dialogVisible: false,
      categorys: [], //类别数组
      form: {
        category_id: "",
        status: false,
        is_top: false,
        is_hot: false,
        title: "",
        sub_title: "",
        imgList: [],
        goods_no: "",
        stock_quantity: "",
        market_price: "",
        sell_price: "",
        fileList: [],
        zhaiyao: "",
        content: "",
        is_slide: false
      }
    };
  },
  components: {
    quillEditor
  },
  methods: {
    onSubmit() {
      //console.log(this.form.fileList);
      var id = this.$route.params.id;
      //提交数据时候`必须要先登录`，加上跨域声明`withCredentials: true`
      this.$axios({
        url: `http://localhost:8899/admin/goods/edit/${id}`,
        method: "POST",
        data: this.form,
        withCredentials: true
      })
        .then(res => {
          //console.log(this.imageUrl);
          if (res.status === 200) {
            this.$router.back();
            this.$message.success(res.data.message);
          }
        })
        .catch(res => {
          this.$router.push("/login");
        });
    },
    //上传成功之后事件
    handleAvatarSuccess(res, file) {
      //因为后台修改在处理图片的url的时候会少个“/”导致图片显示不出来，所以在前台进行拼接
       var newres={...res,shorturl:"/"+res.shorturl}
      //将上传成功之后的信息赋值给form数据的imglist参数
      this.form.imgList = [newres];
      //给图片的链接地址赋值
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    //上传以前事件函数
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    },
    //图片移除
    handleRemove(file, fileList) {
      console.log(file, fileList);
      // 把删除之后的列表赋值给this.form.fileList
      // const files = fileList.map(v => {
      //   return v.response;
      // });
      // this.form.fileList=files
      // console.log(file, fileList);
      this.form.fileList = fileList.length == 0 ? [] : fileList;
      // this.form.fileList=[]
 
    },
    //图片方法预览
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //多张图片上传成功事件
    handleCardsSuccess(res, file, fileList) {
      //fileList与页面的数据是绑定的
      this.form.fileList.push(file.response);
    }
  },
  //页面加载时请求数据
  mounted() {
    //请求分类数据
    this.$axios({
      url: "http://localhost:8899/admin/category/getlist/goods",
      method: "GET"
    }).then(res => {
      const { status, message } = res.data;
      this.categorys = message;
    });

    //获取当前请求页面的id
    var id = this.$route.params.id;
    this.$axios({
      url: `http://localhost:8899/admin/goods/getgoodsmodel/${id}`,
      method: "GET"
    }).then(res => {
      console.log(res);
      const { status, message } = res.data;
      //后台的edit接口返回的fileList中的图片地址有误，缺少了ip（原因是因为后台方法的参数少了/,所以在前台拼接链接传入后台）
      //将数据赋值
      message.fileList.map(v=>{
        return {...v}
      })
      this.form = {
        ...message,
        //因为后台传回的是字符串形式，所以需要转换，否则渲染失败
        category_id: +message.category_id,
        fileList:message.fileList.map(e => {
          console.log(e.shorturl);
          e.url=`http://127.0.0.1:8899${e.shorturl}`;
          return e
        })
      };
      //img封面的预览
     this.imageUrl = this.form.imgList[0].url;
     console.log(this.form);
    //console.log(this.imageUrl);
    });
  }
};
</script>

<style scoped>
.avatar-uploader >>> .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader >>> .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
