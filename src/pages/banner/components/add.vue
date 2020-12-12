<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <!-- 分类名称 input文本输入框 -->
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off"></el-input>
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
import { reqbannerAdd, reqbannerOne, reqbannerChange } from "../../../util/request";
import { mapActions, mapGetters } from "vuex";

export default {
  props: ["info"],
  components: {},
  data() {
    return {
      imageUrl: "",
      form: {
        title: "",
        img: null,
        status: 2
      },
      formLabelWidth: "120px"
    };
  },
  computed: {
    ...mapGetters({
      list: "banner/list"
    })
  },
  methods: {
    ...mapActions({
      requestbannerList: "banner/requestbannerList"
    }),

    //当图片提交的时候
    changeImg(e) {
      // 将文件转换成路径
      this.imageUrl = URL.createObjectURL(e.raw);
      this.form.img = e.raw;
    },

    //点击确定
    change() {
      console.log(this.form);
      reqbannerAdd(this.form).then(res => {
        this.info.show = false;
        alert("添加成功");
        this.requestbannerList();
      });
    },
    //表单页点击编辑时，表单提供该行的id，弹窗提供方法，在父组件中触发事件以后发送请求获取一条数据渲染到弹窗中
    // 修改时需要id所以在点击编辑的时候就往form里面添加id的值
    get(id) {
      reqbannerOne({ id: id }).then(res => {
        this.form = res.data.list;
        this.form.id = id;
        this.imageUrl = this.$preImg + this.form.img;
      });
    },

    update() {
      reqbannerChange(this.form).then(res => {
        this.info.show = false;
        this.requestbannerList();
      });
    },

    //清空弹窗的数据
    empty() {
      this.imageUrl = "";
      this.form = {
        title: "",
        img: null,
        status: 2
      };
    }
  },
  mounted() {}
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
