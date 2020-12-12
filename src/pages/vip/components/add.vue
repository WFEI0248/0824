<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="手机号" :label-width="width">
          <el-input v-model.number="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="昵称" :label-width="width">
          <el-input v-model="form.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="width">
          <el-input v-model="form.password" autocomplete="off"></el-input>
          <p>留空则不会修改</p>
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
        <el-button type="primary" @click="update">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { reqVipOne, reqVipChange } from "../../../util/request";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      width: "70px",
      form: {
        phone: "",
        nickname: "",
        password: "",
        status: 1
      },
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  methods: {
    ...mapActions({
      requestvipList: "vip/requestVipList"
    }),
    empty() {
      form = {
        phone: "",
        nickname: "",
        password: "",
        status: 1
      };
    },

    look(uid) {
      reqVipOne({ uid }).then(res => {
        console.log(res);
        this.form = res.data.list;
        this.form.uid = uid;
        this.form.password = "";
      });
    },
    update() {
      reqVipChange(this.form).then(res => {
        this.info.show = false;
        alert("修改成功");
        this.requestvipList();
      });
    }
  },
  mounted() {}
};
</script>
<style scoped></style>
