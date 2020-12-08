<template>
<div>
    <el-button type="primary" @click="showWin">添加</el-button>

    <add :info='info' ref="one"/>
    <list @edit='edit' />
</div>
</template>
<script>
import add from './components/add'
import list from './components/list'
export default {
    
components:{
    add,
    list
 },
data () {
 return {
     info: {
        show: false, //弹窗的状态
        isAdd:true,  //添加
        title:'商品分类添加'
      }
 }
},
methods:{
    showWin(){
        this.$refs.one.empty();
        this.info={
            show:true,
            isAdd:true,
            title:'商品分类添加'
        }
    },
    edit(id){
         this.info={
            show:true,
            isAdd:false,
            title:'商品分类修改'
        }
        this.$refs.one.get(id)
    }
},
mounted(){
}
}
</script>
<style scoped>
</style>