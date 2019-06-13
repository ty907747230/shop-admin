<template>
  <el-row type="flex" justify="space-between">
    <div @click="handleClick">
      <i class="el-icon-back"></i>
    </div>
    <div>
      {{user.realname}} {{user.uid}} {{user.uname}}
      <span class="exit" @click="handleExit">退出</span>
    </div>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      user: {}
    };
  },
  methods: {
    handleClick() {
      //触发父组件的改变菜单展示事件
      this.$emit("click");
    },
    //退出按钮点击事件
    handleExit() {
      //请求退出接口
      this.$axios({
        url: "http://localhost:8899/admin/account/logout",
        method: "get",
        // 处理session跨域
        withCredentials: true
      }).then(res => {
        var { status, message } = res.data;
      });
      //退出按钮退出页面回到登录并删除本地存储的数据
      if (status == 0) {
        localStorage.removeItem("user");
        this.$router.push("/login");
      }
    }
  },
  mounted() {
    //获取仓库数据并赋值给Header组件
    this.user = this.$store.state.user;
    console.log(this.user);
  }
};
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}

.el-icon-back {
  cursor: pointer;
}

.exit {
  cursor: pointer;
}
</style>
