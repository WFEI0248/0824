<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          router
          background-color="#20222a"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <!-- 首页侧边栏 -->
          <el-menu-item index="/index/home">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>



          <!-- 用户登录成功后根据返回的个人权限内容显示 -->
          <div v-for="item in list.menus" :key="item.id">
            <!-- 如果有子菜单的情况 -->
            <el-submenu :index="String(item.id)" v-if="item.children">
              <template slot="title">
                <i class="el-icon-s-tools"></i>
                <span>{{ item.title }}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item
                  v-for="i in item.children"
                  :key="i.id"
                  :index="'/index'+i.url"
                  >
                  {{i.title}}
                  </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <!-- 如果没有子菜单就只显示菜单名 -->
            <el-submenu index="2" v-else>
              <template slot="title">
                <i class="el-icon-s-tools"></i>
                <span>{{ item.title }}</span>
              </template>
            </el-submenu>
          </div>
          <!-- 系统设置侧边栏 -->
          <!-- <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-s-tools"></i>
              <span>系统设置</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/index/menu">菜单管理</el-menu-item>
              <el-menu-item index="/index/role">角色管理</el-menu-item>
              <el-menu-item index="/index/manger">管理员管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu> -->
          <!-- 商城管理侧边栏 -->
          <!-- <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-s-goods"></i>
              <span>商城管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/index/classify">商品分类</el-menu-item>
              <el-menu-item index="/index/spec">商品规格</el-menu-item>
              <el-menu-item index="/index/goods">商品管理</el-menu-item>
              <el-menu-item index="/index/vip">会员管理</el-menu-item>
              <el-menu-item index="/index/banner">轮播图管理</el-menu-item>
              <el-menu-item index="/index/seckill">秒杀活动</el-menu-item>
            </el-menu-item-group>
          </el-submenu> -->
        </el-menu>
      </el-aside>

      <!-- 右边的头部和主体部分 -->
      <el-container>
        <el-header>
          <div class="user">
            <p>{{ list.username }}</p>
            <a @click="quit">退出</a>
          </div>
        </el-header>

        <el-main>
          <!-- 面包屑导航 -->
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item
              ><a href="#">{{ $route.name }}</a></el-breadcrumb-item
            >
          </el-breadcrumb>
          <!-- 二级路由出口 -->
          <div class="sed"><router-view></router-view></div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "user/list"
    })
  },
  methods: {
    ...mapActions({
      requestUserList: "user/requestUserList"
    }),
    quit() {
      this.requestUserList({});
      this.$router.push("/login");
    }
  },
  mounted() {
    console.log(this.list);
  }
};
</script>
<style scope>
.user {
  display: flex;
  float: right;
}
.user a {
  text-decoration: underline;
  color: blue;
}

.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #20222a;

  color: #333;
  min-height: 100vh;
  height: auto;
  text-align: center;
  line-height: 200px;
  overflow: hidden;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}
.sed {
  margin-top: 20px;
}
</style>
