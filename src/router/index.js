import Vue from "vue";
import Router from "vue-router";
//导入仓库查看是否有登录成功的数据
import store from "../store/index";

const login = () => import("../pages/login/login");
const index = () => import("../pages/index/index");
const home = () => import("../pages/home/home");
const menu = () => import("../pages/menu/menu");
const manger = () => import("../pages/manger/manger");
const role = () => import("../pages/role/role");
const classify = () => import("../pages/classify/classify");
const spec = () => import("../pages/spec/spec");
const goods = () => import("../pages/goods/goods");
const banner = () => import("../pages/banner/banner");
const vip = () => import("../pages/vip/vip");
const seckill = () => import("../pages/seckill/seckill");

Vue.use(Router);

export const indexRouters = [
  {
    path: "menu",
    component: menu,
    name: "菜单管理"
  },
  {
    path: "role",
    component: role,
    name: "角色管理"
  },
  {
    path: "manger",
    component: manger,
    name: "管理员管理"
  },
  {
    path: "classify",
    component: classify,
    name: "商品分类"
  },
  {
    path: "spec",
    component: spec,
    name: "商品规格"
  },
  {
    path: "goods",
    component: goods,
    name: "商品管理"
  },
  {
    path: "vip",
    component: vip,
    name: "会员管理"
  },
  {
    path: "banner",
    component: banner,
    name: "轮播图管理"
  },
  {
    path: "seckill",
    component: seckill,
    name: "秒杀活动"
  }
];

const router = new Router({
  routes: [
    {
      path: "/login",
      component: login
    },
    {
      path: "/index",
      component: index,
      name: "主页",
      children: [
        {
          path: "",
          redirect: home,
          name: "首页"
        },
        {
          path: "home",
          component: home,
          name: "首页"
        },
        ...indexRouters
      ]
    },
    {
      path: "/",
      component: login
    },
    {
      path: "*",
      redirect: "/login"
    }
  ]
});

//全局守卫
router.beforeEach((to, from, next) => {
  //是否去登录页面
  if (to.path == "/login" || store.state.user.list.menus) {
    next();
    //在登录页面已经有登录验证，所以下一步只要判断是否去登录页面就行
    if (to.path.includes("index") ) {
      next();
    }
  }
});


export default router;
