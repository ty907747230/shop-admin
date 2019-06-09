<template>
  <div class="mianbao">
    <el-breadcrumb separator="/">
      <!-- :key="index"是这个框架会提示index,所以加上防止提示,不加也不会有影响 -->
      <el-breadcrumb-item v-for="(item,index) in info" :key="index" >{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      // 路由对象信息的meta数组,用于页面中的面包屑
      info: []
    };
  },
  watch: {
    //监控路由对象信息,当路由发生改变时获取里面的meta值,并生成面包屑的内容
    $route() {
      this.getRoute();
    }
  },
  // 当路由没有发生改变时就没有面包屑内容,所以当页面刚加载进来的时候需要给面包屑一个默认的内容
  mounted: function() {
    this.getRoute();
  },
  methods: {
    //封装获取路由对象信息(面包屑菜单信息)的方法
    getRoute() {
      var arr = this.$route.matched.map(v => {
        return v.meta;
      });
      this.info = arr;
    }
  }
};
</script>

<style>
.mianbao {
  padding-bottom: 10px;
  border-bottom: 1px #ddd solid;
}
</style>
