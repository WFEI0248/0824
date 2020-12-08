<template>
  <div>
    <div
      id="main"
      style="width:800px;height:400px;border:1px dashed #ccc"
    ></div>
  </div>
</template>
<script>
//导入echarts图标插件，使用事件监听，可实现实时更新数据
import echarts from "echarts";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    ...mapGetters({
      list: "cate/list"
    })
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      requestCateList: "cate/requestCateList"
    })
  },
  mounted() {
    this.requestCateList();
  },
  watch:{
    deep:true,
    handler(){
       var option = {
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            legend: {
                data:['销量']
            },
            xAxis: {
                data: this.list.map(item=>item.catename)
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'line',
                data: this.list.map(item=>item.children?item.children.length:0)
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option); 
    }
  }
};
</script>
<style scoped></style>
