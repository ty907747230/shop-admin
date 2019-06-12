<template>
  <div class="block">
    <el-tree
      :data="data"
      show-checkbox
      node-key="id"
      default-expand-all
      :expand-on-click-node="false"
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ data.title }}</span>
        <el-input
          class="input"
          @blur="handleblur(data)"
          type="text"
          v-model="data.sort_id"
          style="width:80px"
          @change="handleChange"
        ></el-input>
        <span>
          <el-button type="text" size="mini" @click="() => edit(node, data)">编辑</el-button>
        </span>
      </span>
    </el-tree>
  </div>
</template>
<script>
let id = 1000;

export default {
  data() {
    const data = [];
    return {
      data: JSON.parse(JSON.stringify(data)),
      isChange: false
    };
  },
  mounted() {
    this.getCategoryList();
  },
  methods: {
    //   封装请求分类列表方法
    getCategoryList() {
      this.$axios({
        url: "http://localhost:8899/admin/category/getlist/goods",
        method: "get"
      }).then(res => {
        var { message, status } = res.data;
        if (status == 0) {
          this.data = message;
        }
      });
    },
    edit(node, data) {
      console.log(node, data);
      //   const parent = node.parent;
      //   const children = parent.data.children || parent.data;
      //   const index = children.findIndex(d => d.id === data.id);
      //   children.splice(index, 1);
    },
    handleChange(value) {
      //由于input值改变事件是在失去焦点事件之前的，所以在失去焦点之前判断input值是否改变
      this.isChange = !this.isChange;
    },
    handleblur(data) {
      //如果值发生改变
      if (this.isChange) {
          this.isChange = !this.isChange;
        this.$axios({
          url: "http://localhost:8899/admin/category/edit/" + data.category_id,
          method: "POST",
          data
        }).then(res => {
          var { status, message } = res.data;
          if (status == 0) {
            this.$message.success(message);
            this.getCategoryList();
          }
        });
      }
    }
  }
};
</script>

<style scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.input >>> input {
  padding: 0;
  height: 22px;
}
</style>