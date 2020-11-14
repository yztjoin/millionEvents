import Vue from 'vue'
import './cube-ui';
import App from './App.vue';
import router from './router';
// import {Button, Scroll} from 'cube-ui'
// Vue.use(Scroll)
import { util, app, jsBridge, http, wxShare, uPop } from "@plugin/tool-common"
// 移动端引入amfe-flexible依赖 并在postcss.config.js中打开px2rem插件
import "amfe-flexible"
Vue.use(http);
Vue.config.productionTip = false;
// window.$app = app

//引入并自动注册全局组件
require('@/components');
/**
 * 处理iOS 微信客户端高于6.7.4  键盘收起页面未下移bug 
 */
(/iphone|ipod|ipad/i.test(navigator.appVersion)) && document.addEventListener('blur', (e) => {
  // 这里加了个类型判断，因为a等元素也会触发blur事件
  ['input', 'textarea'].includes(e.target.localName) && document.body.scrollIntoView(false)
}, true);

//测试以及开发环境添加调试
if ((/(localhost)|(192\.168)|(ab)|(test)/).test(window.location.host)) {
  document.write('<scr' + 'ipt src="//uufefile.uupt.com/CDN/js/eruda.min.js"></scr' + 'ipt>');
  document.write('<scr' + 'ipt> (function () {' +
    'window.location.href.indexOf("noeruda") === -1 && eruda.init(); })(); </scr' + 'ipt>');
};
new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
