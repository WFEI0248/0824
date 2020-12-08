<template>
  <div>
    <el-button type="primary" @click="showWin">添加</el-button>
    <add :info="info" ref='one'/>
    <list @edit='edit' />
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
        show: false, //弹窗的状态
        isAdd:true, //为true时是菜单添加，false为编辑修改
        title:'菜单添加'
      }
    };
  },
  methods: {
    //点击添加按钮时
    showWin() {
      this.info={
        show:true,
        isAdd:true,
        title:'菜单添加'
      }
      this.$refs.one.empty();
    },
    //表单页点击编辑时，表单提供该行的id，弹窗提供方法，在父组件中触发事件以后发送请求获取一条数据渲染到弹窗
    edit(e){
      this.info = {
        show:true,
        isAdd:false,
        title:'菜单编辑'
      }
      this.$refs.one.get(e);
    }
  },
 
};
</script>
<style></style>
