<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <!-- 菜单名称 input文本输入框 -->
        <el-form-item label="菜单名称" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>

        <!-- 上级菜单 下拉列表 -->
        <el-form-item label="上级菜单" :label-width="formLabelWidth">
          <el-select v-model="form.pid" placeholder="--请选择--" @change="pid">
            <el-option label="顶级菜单" :value="0"></el-option>
            <!-- 往这里动态循环添加数据  菜单分类 -->
            <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <!-- 菜单类型  单选框 -->
        <!-- 单选框中的 :label可以作为value使用 -->
        <el-form-item label="菜单类型" :label-width="formLabelWidth">
          <el-radio v-model="form.type" :label="1" disabled>目录</el-radio>
          <el-radio v-model="form.type" :label="2" disabled>菜单</el-radio>
        </el-form-item>

        <!-- 菜单图标 下拉列表 在用户选择目录时出现 -->
        <el-form-item
          label="菜单图标"
          :label-width="formLabelWidth"
          v-if="form.type == 1"
        >
          <el-select v-model="form.icon" placeholder="--请选择--">
            <el-option label="飞机" value="el-icon-s-promotion">
              <i class="el-icon-s-promotion"> 小飞机</i>
            </el-option>
            <el-option label="小手" value="el-icon-thumb">
              <i class="el-icon-thumb"> 点我啊</i>
            </el-option>
            <el-option label="瞄准" value="el-icon-aim">
              <i class="el-icon-aim"> 瞄准镜</i>
            </el-option>
          </el-select>
        </el-form-item>

        <!-- 菜单地址 下拉列表 在用户选择菜单时出现 -->
        <el-form-item label="菜单地址" :label-width="formLabelWidth" v-else>
          <el-select v-model="form.url" placeholder="--请选择--">
            <!-- 循环添加数据 -->
            <el-option
              v-for="item in indexRouters"
              :key="item.path"
              :label="item.name"
              :value="'/' + item.path"
            >
            </el-option>
          </el-select>
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
        <el-button type="primary" @click="change" v-if="info.isAdd">确 定</el-button>
        <el-button type="info" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { indexRouters } from "../../../router/index";
import { reqMenuAdd, reqMenuOne ,reqMenuChange} from "../../../util/request";
import { mapActions, mapGetters } from "vuex";

export default {
  props: ["info"],
  components: {},
  data() {
    return {
      indexRouters,
      form: {
        pid: "",
        title: "",
        icon: "",
        type: 0,
        url: "",
        status: 2
      },
      show: false,

      formLabelWidth: "120px"
    };
  },
  computed:{
    //只需要获取menu里面的数据渲染到复选框
    ...mapGetters({
      list:'menu/list'
    })
  },
  methods: {
    ...mapActions({
      requestMenuList:'menu/requestMenuList'
    }),

    //当选择点击顶级菜单的时候，菜单类型为目录反之则为菜单
    pid() {
      this.form.type = this.form.pid == 0 ? 1 : 2;
    },
    //点击确定的时候往数据库添加数据
    change() {
      reqMenuAdd(this.form).then(res => {
        this.info.show = false;
      });
      this.requestMenuList();
    },
    //表单页点击编辑时，表单提供该行的id，弹窗提供方法，在父组件中触发事件以后发送请求获取一条数据渲染到弹窗中
    // 修改时需要id所以在点击编辑的时候就往form里面添加id的值
    get(id) {
      reqMenuOne({ id:id}).then(res => {
        this.form = res.data.list;
        this.form.id = id;
      });
    },

    update(){
      reqMenuChange(this.form).then(res=>{
        this.info.show = false;
        this.requestMenuList();
        this.empty();
      })

    },


    //清空弹窗的数据
    empty(){
      this.form= {
        pid: "",
        title: "",
        icon: "",
        type: 0,
        url: "",
        status: 1
      }
    }
  },
  mounted(){

  }
};
</script>
<style></style>
