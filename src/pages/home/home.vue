<template>
  <div>
    <div
      id="main"
      style="width:1100px;height:600px;border:1px dashed #ccc"
    ></div>
  </div>
</template>

<script>
//导入echarts图标插件，使用事件监听，可实现实时更新数据
import { mapActions, mapGetters } from "vuex";
import echarts from "echarts";

export default {
  components: {},
  computed: {
    ...mapGetters({
      list: "cate/list"
    }),
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
    console.log(this.list);
  },
  watch: {
    list: {
      handler() {
        var myChart = echarts.init(document.getElementById("main"));

        // 指定图表的配置项和数据
        var option = {
          title: {
            text: "商品数量折线图"
          },
          tooltip: {},
          legend: {
            data: ["销量"]
          },
          xAxis: {
            data: this.list.map(item => item.catename)
          },
          yAxis: {},
          series: [
            {
              name: "销量",
              type: "line",
              data: this.list.map(item =>
                item.children ? item.children.length : 0
              )
            }
          ]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      },
      deep: true
    }
  }
};
</script>
<style scoped></style>
