<template>
  <div>
    <el-button type="primary" @click="show">添加</el-button>
    <add :info="info" ref="one" />
    <list @edit="edit" />
  </div>
</template>
<script>
import list from "./components/list";
import add from "./components/add";
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
        title: "角色添加"
      }
    };
  },
  methods: {
    show() {
      this.$refs.one.empty();
      this.info = {
        show: true,
        isAdd: true,
        title: "角色添加"
      };
    },
    edit(e) {
      this.info = {
        show: true,
        isAdd: false,
        title: "角色修改"
      };
      this.$refs.one.look(e);
    }
  },
  mounted() {}
};
</script>
<style scoped></style>
