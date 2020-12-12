import Vue from "vue"
import Vuex from 'vuex'
Vue.use(Vuex)

import menu from './modules/menu'
import role from './modules/role'
import cate from './modules/cate'
import specs from './modules/specs'
import goods from './modules/goods'
import user from './modules/user'
import vip from './modules/vip'
import banner from './modules/banner'
import seck from './modules/seck'


//分模块导出，使用 模块/方法  例如menu/方法
export default new Vuex.Store({
    modules:{
        menu,  //菜单管理
        role,  //角色管理
        cate, //商品分类
        specs, //商品规格
        goods, //商品管理
        user,  //login页面的登录处理
        vip,  // 会员管理
        banner, //轮播图管理
        seck,   //限时秒杀
        
    }
})