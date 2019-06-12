<template>
  <div>
    <!-- 按钮与搜索框一行显示 -->
    <el-row type="flex" justify="space-between" class="goodtop">
      <div>
        <el-button @click="handleToGoodAdd">新增</el-button>
        <el-button type="danger" @click="handleDeleteMore">删除</el-button>
      </div>
      <div>
        <!-- 将输入查询条件数据绑定便于查询 -->
        <el-input placeholder="请输入内容" class="input-with-select" v-model="searchValue">
          <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
        </el-input>
      </div>
    </el-row>
    <!-- 列表部分 -->
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="标题" width="300">
        <!-- 通过运行模板能推出scope.row就是那一行的数据 -->
        <template slot-scope="scope">
          <el-row type="flex" align="middle">
            <img :src="scope.row.imgurl" class="goods-img">
            <div>{{scope.row.title}}</div>
          </el-row>
        </template>
      </el-table-column>
      <!-- 显示数据的另一种方法,prop就是data的数据 -->
      <el-table-column prop="categoryname" label="类型" width="120"></el-table-column>
      <el-table-column prop="sell_price" label="价格" width="120" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <!-- 第一参数$index是当前数据在页面中的索引,第二个是当前按钮所在行的数据 -->
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      searchvalue: "",
      multipleSelection: [],
      searchValue: "",

      //设置分页功能的数据
      pageIndex: 1, //当前页索引
      pageSize: 5, //每页显示条数
      total: 0, //总条数
      currentPage: 1 //当前页
    };
  },
  //页面加载的时候请求数据
  mounted() {
    this.getGoodList();
  },
  methods: {
    //编辑按钮点击事件
    handleEdit(data){
      this.$router.push(`/admin/goodedit/${data.id}`)
    },
    //新增商品按钮点击事件
    handleToGoodAdd() {
      this.$router.push("/admin/goodadd");
    },
    //封装请求商品列表数据并渲染页面
    getGoodList() {
      this.$axios({
        url: `http://localhost:8899/admin/goods/getlist?pageIndex=${
          this.pageIndex
        }&pageSize=${this.pageSize}&searchvalue=${this.searchValue}`,
        method: "GET"
      }).then(res => {
        // console.log(res);
        //请求成功渲染
        if (res.status == 200) {
          const data = res.data;
          this.tableData = data.message;

          // 根据请求的数据设置分页参数
          this.total = data.totalcount;
        }
      });
    },
    //封装删除函数
    delectGood(ids) {
      this.$axios({
        url: ` http://localhost:8899/admin/goods/del/${ids}`,
        method: "GET"
      }).then(res => {
        const { message, status } = res.data;
    
        //删除成功
        if (status === 0) {
          //重新发送请求刷新页面
          this.getGoodList();
          //并在页面进行提示
          this.$message({
            message: "删除成功",
            type: "success"
          });
        } else {
          this.$message.error(message);
        }
      });
    },
    //搜索数据
    handleSearch() {
      //通过查询条件获取商品列表
      this.getGoodList();
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    // 获取已选择的数据
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(val);
    },
    //页面大小改变事件
    handleSizeChange(val) {
      //改变data数据的页面大小
      this.pageSize = val;
      //刷新数据
      this.getGoodList();
    },
    //当前页面改变事件
    handleCurrentChange(val) {
      //改变data数据的当前页码
      this.pageIndex = val;
      //刷新数据
      this.getGoodList();
    },
    //删除多条数据
    handleDeleteMore() {
      //获取需要删除数据的id
      var arr = this.multipleSelection.map(v => {
        return v.id;
      });
      var ids = arr.join(",");
      this.delectGood(ids);
    },
    // 删除单条数据
    handleDelete(index, data) {
      //分别传入索引与数据
      var id = data.id;
      this.delectGood(id);
    }
  }
};
</script>

<style scoped>
.goods-img {
  width: 60px;
  height: 60px;
  /*表示元素压缩的倍数，如果是0，表示不会被挤压*/
  flex-shrink: 0;
  margin-right: 5px;
}
</style>
