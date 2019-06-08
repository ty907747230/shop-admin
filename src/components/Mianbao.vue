<template>
  <div class="mianbao">
      <el-breadcrumb  separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">后台管理</el-breadcrumb-item>
    <el-breadcrumb-item :to="{ path: '/' }">商品列表</el-breadcrumb-item>
  </el-breadcrumb>
  </div>
</template>

<script>
export default {};
</script>

<style>
.mianbao{
    padding-bottom: 10px;
    border-bottom: 1px #ddd solid;
}
</style>
