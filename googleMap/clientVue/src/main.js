import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'

import './components/iconSvg' // iconSvg

import '@/permission' // permission control

import '@/mockjs'; // mock数据

// i18n国际化
import i18n from "@/lang";
// 'development',use package;'production':use cdn;
if(process.env.NODE_ENV === "development" ){
  // import ElementUI from 'element-ui';
  // Vue.use(ElementUI, { size: 'mini'});
  // import('element-ui/lib/theme-chalk/index.css');
}

// import VueGooglemap from 'vue2-googlemap';
// Vue.use(VueGooglemap)

// VueGooglemap.initGooglemap({
//   key: 'AIzaSyDHsQydosNpZrjm1ikwvwDtIzfSe7JO2X4',
//   // language: 'zh-CN',
//   // v: '3'
// })


// 分享功能集合
// import { shareConfig } from './utils/share';
// Vue.prototype.shareConfig = shareConfig;


Vue.config.productionTip = false;

Vue.prototype.showMessage = function(type,message){
  this.$message({
      type: type,
      message: message
  });
}



new Vue({
  router,
  store,
  i18n,  // 便于可以直接在组件中通过this.$i18n使用，也可以按需引用
  render: h => h(App),
}).$mount('#app')
