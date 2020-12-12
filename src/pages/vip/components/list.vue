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
      <el-table-column prop="id" label="用户编号" sortable width="200">
      </el-table-column>

      <el-table-column prop="nickname" label="昵称" sortable width="200">
      </el-table-column>
      <el-table-column prop="phone" label="手机号" sortable width="200">
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
          <el-button type="primary" @click="edit(scope.row.uid)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "vip/list"
    })
  },
  methods: {
    ...mapActions({
      requestvipList: "vip/requestVipList",
      
    }),
    edit(uid) {
      this.$emit("edit", uid);
    },
 
  },
  mounted() {
   
    this.requestvipList();

  }
};
</script>
<style scoped></style>
