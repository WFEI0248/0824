<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <!-- 活动名称 input文本输入框 -->
        <el-form-item label="活动名称" :label-width="width">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>

        <!-- 活动限期 时间活动选择器 -->
        <el-form-item label="活动期限" :label-width="width">
          <template>
            <div class="block">
              <el-date-picker
                v-model="timeValue"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                @change="chan"
              >
              </el-date-picker>
            </div>
          </template>
        </el-form-item>

        <!-- 一级分类 下拉列表 -->
        <el-form-item label="一级分类" :label-width="width">
          <el-select
            @change="firstChange"
            v-model.number="form.first_cateid"
            placeholder="--请选择--"
          >
            <!-- 往这里动态循环添加数据  菜单分类 -->
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <!-- 二级分类 下拉列表 -->
        <el-form-item label="二级分类" :label-width="width">
          <el-select
            @change="secChange"
            v-model.number="form.second_cateid"
            placeholder="--请选择--"
          >
            <!-- 往这里动态循环添加数据  菜单分类 -->
            <el-option
              v-for="item in secondGood"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <!-- 三级分类 下拉列表 -->
        <el-form-item label="商品" :label-width="width">
          <el-select v-model.number="form.goodsid" placeholder="--请选择--">
            <el-option
              v-for="item in treeGood"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            ></el-option>
          </el-select>
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
import { reqseckAdd, reqseckOne, reqseckChange } from "../../../util/request";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      form: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1
      },
      timeValue: [],
      secondGood: [],
      treeGood: [],
      width: "70px",
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  computed: {
    ...mapGetters({
      cateList: "cate/list",
      goodsList: "goods/list"
    })
  },
  methods: {
    ...mapActions({
      requestcateList: "cate/requestCateList",
      requestgoodsList: "goods/requestGoodsList",
      requestseckList:'seck/requestseckList'
    }),
    empty() {
      this.form = {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1
      };
      this.timeValue= []
    },

    //活动日期发生改变的时候
    chan() {
      this.form.begintime = Date.parse(this.timeValue[0]);
      this.form.endtime = Date.parse(this.timeValue[1]);
    },
    firstChange() {
      this.form.second_cateid = '',
      this.form.goodsid = '',
      this.secondGood = this.cateList.find(item => {
        return item.id == this.form.first_cateid;
      }).children;
    },

    secChange() {
      this.form.goodsid = '',
      this.treeGood=[];
      this.goodsList.map(item => {
        if( this.form.second_cateid==item.second_cateid ){
          this.treeGood.push(item)
        }
      });
    },

    //点击添加的时候实现添加的功能
    add() {

        reqseckAdd(this.form).then(res => {
          this.info.show = false;
        });
        this.requestseckList();
    },
    look(id) {
        reqseckOne({ id }).then(res => {
          console.log(res);
          this.form = res.data.list;
          this.form.id = id;
          this.timeValue=[new Date(Number(this.form.begintime)), new Date(Number(this.form.endtime))]
        });
    },
    update() {
        reqseckChange(this.form).then(res => {
          this.info.show = false;
          alert("修改成功");
          this.requestseckList();
        });
    }
  },
  mounted() {
    if (!this.cateList.length) {
      this.requestcateList();
    }
    if (!this.goodsList.length) {
      this.requestgoodsList();
    }
  }
};
</script>
<style scoped></style>
