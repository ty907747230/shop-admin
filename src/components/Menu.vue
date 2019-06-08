<template>
  <el-menu
    default-active="1"
    class="el-menu-vertical-demo"
    background-color="#001529"
    text-color="#fff"
    active-text-color="#ffd04b"
    :collapse="isShow"
  >
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span>购物商城</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="1-1">商品管理</el-menu-item>
        <el-menu-item index="1-2">栏目管理</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
    //接收父类传过来是否展示的参数
    props:["isShow"]
};
</script>

<style scoped>
.el-menu-vertical-demo {
  height: 100%;
}
</style>
