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
      <el-table-column prop="id" label="商品编号" width="120">
      </el-table-column>
      <el-table-column prop="goodsname" label="商品名称" width="150">
      </el-table-column>
      <el-table-column prop="price" label="商品价格" width="150">
      </el-table-column>
      <el-table-column prop="market_price" label="市场价格" width="150">
      </el-table-column>

      <el-table-column label="图片">
        <template slot-scope="scope">
          <img :src="$preImg + scope.row.img" alt="" />
        </template>
      </el-table-column>

      <el-table-column prop="isnew" label="是否新品" width="100">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.isnew == 1">是</el-button>
          <el-button type="danger" v-else>否</el-button>
        </template>
      </el-table-column>

      <el-table-column prop="ishot" label="是否热卖" width="100">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.ishot == 1">是</el-button>
          <el-button type="danger" v-else>否</el-button>
        </template>
      </el-table-column>

      <el-table-column prop="status" label="状态" width="100">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status == 1"
            >启用</el-button
          >
          <el-button type="danger" v-else>禁用</el-button>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="190">
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
import { reqgoodsDel } from "../../../util/request";
export default {
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "goods/list"
    })
  },
  methods: {
    ...mapActions({
      requestgoodsList: "goods/requestGoodsList"
    }),
    edit(id) {
      this.$emit("edit", id);
    },
    del(id) {
      reqgoodsDel({ id }).then(res => {
        alert("删除成功");
        this.requestgoodsList();
      });
    }
  },
  mounted() {
    this.requestgoodsList();
  }
};
</script>
<style scoped>
img {
  height: 80px;
}
</style>
