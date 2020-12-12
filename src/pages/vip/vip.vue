<template>
  <div>
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
        title: "会员修改"
      }
    };
  },
  methods: {
    edit(e) {
      this.info.show = true;
      this.$refs.one.look(e);
    }
  },
  mounted() {}
};
</script>
<style scoped></style>
