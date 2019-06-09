<template>
  <el-container>
    <el-aside width="auto">
      <Menu :isShow="isShow"></Menu>
    </el-aside>
    <el-container>
      <el-header>
        <Header @click="handleChangeShow"></Header>
      </el-header>
      <el-main>
        <Mianbao></Mianbao>
        <!-- 路由子组件占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
//导入组件
import Menu from "../components/Menu.vue";
import Header from "../components/Header.vue";
import Mianbao from "../components/Mianbao.vue";

export default {
  //指定菜单栏是否展开得属性
  data: function() {
    return {
      isShow: false
    };
  },
  components: {
    Menu,
    Header,
    Mianbao
  },
  methods: {
    //改变是否显示得状态
    handleChangeShow() {
      this.isShow = !this.isShow;
    }
  },
  
};
</script>

<style scoped>
.el-header,
.el-footer {
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}

body > div > .el-container {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
