import Vue from 'vue'
import Router from 'vue-router'

/*
  首页 
*/
import Home from '../pages/home/Home'
/*
  登录、注册、忘记密码
*/
import Login from '../pages/loginRegist/Login'
import Logout from '../pages/loginRegist/Logout.vue'
import Regist from '../pages/loginRegist/Regist.vue'
import RegistEntry from '../pages/loginRegist/RegistEntry.vue'

Vue.use(Router)


const vueRouter = new Router({
    linkActiveClass: 'active',
    mode: 'history',
    // mode: 'hash',
    routes: [
        /**
         * 首页
         */
        {
            path: '',
            redirect: '/login'
        },
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/home',
            name: 'home',
            component: Home,
            redirect: '/home',
            children: [
                {
                    path: '/home',
                    name: 'home',
                    component: Home,
                }, 
            ]
        },
        /**
         * 登录
         */
        {
            path: '/login',
            name: 'login',
            component: Login,
            meta: {
                keepAlive: false // 不需要被缓存
            }
        },
        /**
         * 退出
         */
        {
            path: '/logout',
            name: 'logout',
            component: Logout,
            meta: {
                keepAlive: false // 不需要被缓存
            }
        },
        /**
         * 注册
         */
        {
            path: '/regist',
            name: 'regist',
            component: Regist,
            meta: {
                keepAlive: false // 不需要被缓存
            }
        },
        /**
         * 导入表格
         */
        {
            path: '/registentry',
            name: 'registentry',
            component: RegistEntry,
            meta: {
                keepAlive: false // 不需要被缓存
            }
        },
    ],
});

// 全局路由守卫
vueRouter.beforeEach((to, from, next) => {
    // to: Route: 即将要进入的目标 路由对象
    // from: Route: 当前导航正要离开的路由
    // next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
    // debugger
    const route = ['home','regist'];
    let user = JSON.parse(localStorage.getItem("userInfo"));
    let isLogin = false; // 是否登录
    if (user) {
        isLogin = true;
    } else {
        isLogin = false;
    }
    // 未登录状态；当路由到route指定页时，跳转至login
    if (route.indexOf(to.name) >= 0) {
        if (!isLogin) {
            vueRouter.push({ path: '/login', });
            return;
        }
    }
    // 已登录状态；当路由到login时，跳转至home 
    if (to.name === 'login') {
        if (isLogin) {
            vueRouter.push({ path: '/home', });
        }
    }
    next();
});
export default vueRouter