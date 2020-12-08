<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <!-- 所属角色 下拉列表 -->
        <!-- scope.row.id -->

        <el-form-item label="所属角色" :label-width="width">
          <el-select v-model.number="form.roleid" placeholder="--请选择--">
            <!-- 往这里动态循环添加数据  菜单分类 -->
            <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <!-- 用户名 input文本输入框 -->
        <el-form-item label="用户名" :label-width="width">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>

        <!-- 密码 input文本输入框 -->
        <el-form-item label="密码" :label-width="width">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>

        <!-- 状态  Switch开关 -->
        <!-- 开关绑定的是布尔值，如果需要指定对应状态的内容需要添加对应的方法 -->
        <el-form-item label="状态" :label-width="width">
          <el-switch
            v-model="form.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <!-- 确定取消按钮 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="info.show = false">取 消</el-button>
        <el-button type="primary" @click="change" v-if="info.isAdd"
          >确 定</el-button
        >
        <el-button type="info" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import {
  reqMangerAdd,
  reqMangerList,
  reqMangerOne,
  reqMangerChange
} from "../../../util/request";
export default {
  props: ["info", "req"],
  components: {},
  data() {
    return {
      width: "100px",
      form: {
        roleid: "",
        username: "",
        password: "",
        status: 2
      }
    };
  },
  computed: {
    ...mapGetters({
      list: "role/list"
    })
  },
  methods: {
    ...mapActions({
      requestRoleList: "role/requestRoleList"
    }),
    empty() {
      this.form = {
        roleid: "",
        username: "",
        password: "",
        status: 2
      };
    },
    look(uid) {
      reqMangerOne({ uid }).then(res => {
        // console.table(res.data.list);
        this.form = res.data.list;
        this.form.uid = uid;
      });
    },
    change() {
      reqMangerAdd(this.form).then(res => {
        this.info.show = false;
        alert("添加成功");
        reqMangerList(this.req);
      });
    },
    update() {
      reqMangerChange(this.form).then(res => {
        this.info.show = false;
        console.log("修改成功");
        reqMangerList(this.req);
      });
    }
  },
  mounted() {
    this.requestRoleList();
  }
};
</script>
<style scoped></style>
