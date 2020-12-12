<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="角色名称" :label-width="width">
          <el-input v-model="form.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" :label-width="width">
          <el-tree
            :data="menuList"
            show-checkbox
            node-key="id"
            ref="tree"
            :props="{ children: 'children', label: 'title' }"
          >
          </el-tree>
        </el-form-item>
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
      <div slot="footer" class="dialog-footer">
        <el-button @click="info.show = false">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd"
          >添 加</el-button
        >
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { reqRoleAdd, reqRoleOne, reqRoleChange } from "../../../util/request";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      width: "70px",
      form: {
        rolename: "",
        menus: [],
        status: 0
      },
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  computed: {
    ...mapGetters({
      menuList: "menu/list"
    })
  },
  methods: {
    ...mapActions({
      requestRoleList: "role/requestRoleList",
      requestMenuList: "menu/requestMenuList"
    }),
    empty() {
      this.form = {
        rolename: "",
        menus: [],
        status: 2
      };
      //如果之前form.menus里面没有数据，在setChecjedKeys时就会报错，不能设置给undefined,需要加一个判空的条件
      if (!this.form.menus) {
        this.form.menus = this.$refs.tree.setCheckedKeys([]);
      }
    },

    //点击添加的时候实现添加的功能
    add() {
      //获取选中项返回的数组
      // console.log(this.$refs.tree.getCheckedKeys());
      //树形节点没法通过v-model的方式返回数据，所以用element的方法转成想要的形式赋值
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      reqRoleAdd(this.form).then(res => {
        this.info.show = false;
      });
      this.requestRoleList();
    },
    look(id) {
      reqRoleOne({ id }).then(res => {
        console.log(res);
        this.form = res.data.list;
        this.form.menus = this.$refs.tree.setCheckedKeys(
          JSON.parse(res.data.list.menus)
        );
        this.form.id = id;
      });
    },
    update() {
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      reqRoleChange(this.form).then(res => {
        this.info.show = false;
        alert("修改成功");
        this.requestRoleList();
      });
    }
  },
  mounted() {
    if (!this.menuList.length) {
      this.requestMenuList();
    }
    console.log(this.menuList);
  }
};
</script>
<style scoped></style>
