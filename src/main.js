// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'


//Element-ui的引入
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//引入静态文件
import './assets/css/reset.css'

//引入仓库
import store from './store/index'


//图片公用的前缀
Vue.prototype.$preImg = 'http://localhost:3000';
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
