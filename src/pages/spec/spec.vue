<template>
  <div>
    <el-button type="primary" @click="add">点击添加</el-button>
    <add :info='info'  ref="one"/>
    <list @edit='edit'/>
  </div>
</template>
<script>
import add from "./components/add";
import list from "./components/list";
export default {
  components: {
    list,
    add
  },
  data() {
    return {
      info: {
        show: false,
        title: "规格添加",
        isAdd: true //默认添加
      }
    };
  },
  methods: {
     //点击添加按钮
    add() {
      this.info = {
        show: true,
        title: "规格添加",
        isAdd: true
      };
      this.$refs.one.empty();
    },
    edit(id) {
      this.info = {
        show: true,
        title: "规格修改",
        isAdd: false
      };
      this.$refs.one.look(id);
    }
  },
  mounted() {}
};
</script>
<style scoped></style>
