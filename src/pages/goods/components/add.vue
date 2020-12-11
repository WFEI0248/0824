<template>
  <div>
    <!-- open事件：当弹窗打开的时候 -->
    <el-dialog
      @opened="changeState"
      :title="info.title"
      :visible.sync="info.show"
    >
      <el-form :model="form">
        <!-- 一级分类 下拉列表 -->
        <el-form-item label="一级分类" :label-width="formLabelWidth">
          <el-select
            v-model.number="form.first_cateid"
            placeholder="--请选择--"
            @change="cateChange"
          >
            <!-- 往这里动态循环添加数据  -->
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 二级分类 下拉列表 -->
        <el-form-item label="二级分类" :label-width="formLabelWidth">
          <el-select
            v-model.number="form.second_cateid"
            placeholder="--请选择--"
          >
            <!-- 往这里动态循环添加数据  -->
            <el-option
              v-for="item in secondCate"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <!-- 商品名称 input文本输入框 -->
        <el-form-item label="商品名称" :label-width="formLabelWidth">
          <el-input v-model="form.goodsname" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 价格 input文本输入框 -->
        <el-form-item label="价格" :label-width="formLabelWidth">
          <el-input v-model.number="form.price" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 市场价格 input文本输入框 -->
        <el-form-item label="市场价格" :label-width="formLabelWidth">
          <el-input
            v-model.number="form.market_price"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <!-- 图片选择框 -->
        <el-form-item label="图片" :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="changeImg"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <!-- 商品规格 下拉列表 -->
        <el-form-item label="商品规格" :label-width="formLabelWidth">
          <el-select
            v-model.number="form.specsid"
            placeholder="--请选择--"
            @change="specsChange"
          >
            <!-- 往这里动态循环添加数据  -->
            <el-option
              v-for="item in specsList"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <!-- 规格属性 下拉列表 -->
        <el-form-item label="规格属性" :label-width="formLabelWidth">
          <el-select
            v-model="form.specsattr"
            multiple=""
            placeholder="--请选择--"
          >
            <!-- 往这里动态循环添加数据  -->
            <el-option
              v-for="item in secondSpecs"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>

        <!-- 是否新品 单选框 -->
        <el-form-item label="是否新品" :label-width="formLabelWidth">
          <el-radio v-model="form.isnew" :label="1">是</el-radio>
          <el-radio v-model="form.isnew" :label="2">否</el-radio>
        </el-form-item>

        <!-- 是否热卖 单选框 -->
        <el-form-item label="是否热卖" :label-width="formLabelWidth">
          <el-radio v-model="form.ishot" :label="1">是</el-radio>
          <el-radio v-model="form.ishot" :label="2">否</el-radio>
        </el-form-item>

        <!-- 状态  Switch开关 -->
        <!-- 开关绑定的是布尔值，如果需要指定对应状态的内容需要添加对应的方法 -->
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="form.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>

        <!-- 商品描述 富文本框 -->
        <el-form-item label="商品描述" :label-width="formLabelWidth">
          <!-- <textarea v-model="form.description" name="" id="" cols="30" rows="10"></textarea> -->
          <!-- wangEdit 富文本作用域 -->
          <div id="div1" v-if="info.show"></div>
        </el-form-item>
      </el-form>
      <!-- 确定取消按钮 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="info.show = false">取 消</el-button>
        <el-button type="primary" @click="change" v-if="info.isAdd"
          >确 定</el-button
        >
        <el-button type="info" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
//引入富文本编辑器
import E from "wangeditor";

import {
  reqgoodsAdd,
  reqgoodsOne,
  reqgoodsChange
} from "../../../util/request";
import { mapActions, mapGetters } from "vuex";

export default {
  props: ["info"],
  components: {},
  data() {
    return {
      imageUrl: "",
      form: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: "",
        isnew: 1,
        ishot: 1,
        status: 1
      },
      formLabelWidth: "120px",

      secondCate: [],
      secondSpecs: []
    };
  },
  computed: {
    ...mapGetters({
      cateList: "cate/list",
      specsList: "specs/list"
    })
  },
  methods: {
    ...mapActions({
      requestCateList: "cate/requestCateList",
      requestSpecsList: "specs/requestSpecsList",
      requestGoodsList: "goods/requestGoodsList"
    }),

    //当弹窗打开的时候
    changeState() {
      this.editor = new E("#div1");
      this.editor.create();
      this.editor.txt.html(this.form.description);
    },
    //二级分类
    cateChange() {
      this.secondCate = this.cateList.find(item => {
        return item.id == this.form.first_cateid;
      }).children;
    },

    //规格属性
    specsChange() {
      this.form.specsattr = "";
      this.secondSpecs = this.specsList.find(item => {
        return item.id == this.form.specsid;
      }).attrs;
    },

    //当图片提交的时候
    changeImg(e) {
      // 将文件转换成路径
      this.imageUrl = URL.createObjectURL(e.raw);
      this.form.img = e.raw;
    },

    //点击确定
    change() {
      reqgoodsAdd(this.form).then(res => {
        this.info.show = false;
        alert("添加成功");
        this.requestGoodsList();
      });
    },
    //表单页点击编辑时，表单提供该行的id，弹窗提供方法，在父组件中触发事件以后发送请求获取一条数据渲染到弹窗中
    // 修改时需要id所以在点击编辑的时候就往form里面添加id的值
    get(id) {
      reqgoodsOne({ id: id }).then(res => {
        this.form = res.data.list;
        this.form.id = id;
        this.imageUrl = this.$preImg + this.form.img;

        //取回来的规格属性是数组，需要进行分割
        this.form.specsattr = this.form.specsattr.split(",");
      });
    },
    //点击修改的时候
    update() {
      this.form.description = this.editor.txt.html()
      reqgoodsChange(this.form).then(res => {
        this.info.show = false;
        this.requestGoodsList();
      });
    },

    //清空弹窗的数据
    empty() {
      this.imageUrl = "";
      this.form = {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: "",
        isnew: 1,
        ishot: 1,
        status: 1
      };
    }
  },
  mounted() {
    this.requestCateList();
    this.requestSpecsList();
  }
};
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
