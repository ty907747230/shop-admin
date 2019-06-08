<template>
  <div class="form-wrapper">
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="form">
      <el-form-item label="账号" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item  label="密码" prop="password">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">登录</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      // 表单数据
      form: {
        username: "",
        password: ""
      },
      rules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    onSubmit() {
      //提交到后台的数据
      const data = {
        uname: this.form.username,
        upwd: this.form.password
      };
      //表单验证成功发送请求
      this.$refs["form"].validate(valid => {
        if (valid) {
          //发送axios请求
          this.$axios({
            url: "http://localhost:8899/admin/account/login",
            method: "POST",
            data,
            //处理session跨域
            withCredentials: true
          }).then(res => {
              console.log(res);
            // 解构并且赋值
            const { message, status } = res.data;
            //登录成功
            if(status===0){
                this.$router.push("/")
            }
            //登录失败
            if(status===1){
                this.$message.error(message);
            }
          });
        }
      });
    }
  }
};
</script>

<style scoped>
.form-wrapper {
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  background-color: #ccc;
}
.form {
  width: 500px;
  position: absolute;
  left: 50%;
  margin-left: -250px;
  top: 50%;
  margin-top: -95px;
}
</style>
