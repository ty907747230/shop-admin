<template>
  <el-menu
    default-active="1-1"
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
        <!-- 将链接与组件绑定 -->
        <!-- 这里有个小bug就是a标签与li标签不一样大，会导致点击li样式变量却没用调转链接,所以要用a标签包裹li标签 -->
        <router-link to="/admin/goodlist">
          <el-menu-item index="1-1">商品管理</el-menu-item>
        </router-link>
        <router-link to="/admin/categorylist">
          <el-menu-item index="1-2">栏目管理</el-menu-item>
        </router-link>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  //接收父类传过来是否展示的参数
  props: ["isShow"]
};
</script>

<style scoped>
.el-menu-vertical-demo {
  height: 100%;
}
.el-menu-vertical-demo a {
  text-decoration: none;
  color: inherit;
}
</style>
