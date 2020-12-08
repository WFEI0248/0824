<template>
  <div>
    <el-button type="primary" @click="add">添加</el-button>
    <add :info="info" :req="req"  ref="one" />
    <list @edit="edit" :req="req" />
  </div>
</template>
<script>
import add from "./components/add";
import list from "./components/list";
export default {
  components: {
    add,
    list
  },
  data() {
    return {
     
      info: {
        show: false,
        isAdd: true,
        title: "用户添加"
      },
      req: {
        size: 2,
        page: 1
      }
    };
  },
  computed: {},
  methods: {
    add() {
      this.$refs.one.empty();
      this.info = {
        show: true,
        isAdd: true,
        title: "用户添加"
      };
    },
    edit(e) {
      this.info = {
        show: true,
        isAdd: false,
        title: "用户修改"
      };
      this.$refs.one.look(e);
    }
  }
};
</script>
<style></style>
