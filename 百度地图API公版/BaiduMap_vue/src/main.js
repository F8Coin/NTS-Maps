import Vue from 'vue';
import App from './App.vue';
import axios from "axios";
import Vuex from 'vuex';
import store from './vuex/store';
import router from './router/index'
import layer from 'vue-layer';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'vue-layer/lib/vue-layer.css';



Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(Vuex);
Vue.prototype.axios = axios;
Vue.prototype.$layer = layer(Vue);

new Vue({
    render: h => h(App),
    router,
    store,
    created() {
        if(localStorage.getItem('isLogin') === null) {
            localStorage.setItem('isLogin','');
        }
        this.$store.state.isLogin = localStorage.getItem('isLogin');
    }
}).$mount('#app')
