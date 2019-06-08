<template>
  <el-row type="flex" justify="space-between">
    <div @click="handleClick">
        <i class="el-icon-back"></i>
    </div>
    <div>admin 超级管理员 退出</div>
  </el-row>
</template>

<script>
export default {
    methods:{
        handleClick(){
            //触发父组件的改变菜单展示事件
            this.$emit("click");
        }
    }
};
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}

.el-icon-back{
    cursor: pointer
}
</style>
