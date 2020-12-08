<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px; margin-top:20px"
      row-key="id"
      border
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="用户编号" sortable width="120">
      </el-table-column>

      <el-table-column prop="username" label="用户名" sortable width="150">
      </el-table-column>

      <el-table-column prop="roleid" label="所属角色"> </el-table-column>

      <el-table-column prop="status" label="状态" sortable width="100">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status == 1"
            >启用</el-button
          >
          <el-button type="danger" v-else>禁用</el-button>
        </template>
      </el-table-column>

      <el-table-column label="操作" sortable width="190">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.uid)"
            >编辑</el-button
          >
          <el-button type="danger" @click="del(scope.row.uid)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 页码 -->
    <!-- total:总条目数  current-page当前页 -->
    <el-pagination
      @current-change="pageChange"
      class="block"
      background
      :current-page="req.page"
      layout="prev, pager, next"
      :total="total"
    >
    </el-pagination>
  </div>
</template>
<script>
import {
  reqMangerList,
  reqMangerNum,
  reqMangerDel
} from "../../../util/request";
export default {
  props: ["req"],
  components: {},
  data() {
    return {
      list: [],
      total: 0 //分页的数量
      //   req: {
      //     size: 2,
      //     page: 1
      //   }
    };
  },
  methods: {
    edit(uid) {
      this.$emit("edit", uid);
    },
    del(uid) {
      reqMangerDel({ uid }).then(res => {});
      alert("删除成功");
      reqMangerList(this.req).then(res => {
        this.list = res.data.list;
      });
    },
    pageChange(n) {
      this.req.page = n;
      reqMangerList(this.req).then(res => {
        this.list = res.data.list;
      });
    }
  },
  mounted() {
    reqMangerList(this.req).then(res => {
      this.list = res.data.list;
    });
    reqMangerNum().then(res => {
      this.total = Math.ceil(res.data.list[0].total / 2) * 10;
    });
  }
};
</script>
<style scoped>
.block {
  float: right;
}
</style>
