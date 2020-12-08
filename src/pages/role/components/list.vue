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
      <!-- prop中放置循环的属性名 -->
      <el-table-column prop="id" label="角色编号" sortable width="200">
      </el-table-column>

      <el-table-column prop="rolename" label="角色名称" sortable width="200">
      </el-table-column>

      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status == 1"
            >启用</el-button
          >
          <el-button type="danger" v-else>禁用</el-button>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { reqRoleDel } from "../../../util/request";
export default {
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "role/list"
    })
  },
  methods: {
    ...mapActions({
      requestRoleList: "role/requestRoleList",
      
    }),
    edit(id) {
      this.$emit("edit", id);
    },
    del(id) {
      reqRoleDel({ id }).then(res => {
        this.requestRoleList();
        alert("删除成功");
      });
    }
  },
  mounted() {
   
    this.requestRoleList();

  }
};
</script>
<style scoped></style>
