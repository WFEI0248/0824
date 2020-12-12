<template>
  <div>
    <!-- 表单 -->
    <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px; margin-top:20px"
      row-key="id"
      border
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <!-- prop中放置循环的属性名 -->
      <el-table-column prop="id" label="编号" sortable width="120">
      </el-table-column>

      <el-table-column prop="title" label="轮播图标题" sortable width="150">
      </el-table-column>

      <el-table-column  label="图片">
        <template slot-scope="scope">
          <img :src="$preImg + scope.row.img" alt="" />
        </template>
      </el-table-column>

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
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { reqbannerDel } from "../../../util/request";
export default {
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "banner/list"
    })
  },
  methods: {
    ...mapActions({
      requestbannerList: "banner/requestbannerList"
    }),
    edit(id) {
      this.$emit("edit", id);
    },
    del(id) {
        reqbannerDel({ id }).then(res => {
          alert("删除成功");
          this.requestbannerList();
        });
    }
  },
  mounted() {
    this.requestbannerList();
  }
};
</script>
<style scoped>
    img{
        height: 80px;
    }
</style>
