// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import Element from 'element-ui'
import router from './router'
import animate from 'animate.css'
import axios from 'axios'

// 引入echarts
import echarts from 'echarts'

Vue.prototype.$echarts = echarts;

// import vueAntd from 'vue-antd'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(Element, { size: 'small' })
Vue.use(animate)
    /* eslint-disable */
    /* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})

// 判断是否是登录状态, 如果不是登陆状态，永远将路由跳转到login页面
router.beforeEach((to, from, next) => {
    console.log("to", to.meta);
    if (to.meta.requireAuth) { // 判断该路由是否需要登陆权限
        if (window.sessionStorage.getItem("token")) { // 判断当前的token是否存在
            next();
        } else {
            console.log("没有登陆没有登陆没有登陆没有登陆没有登陆没有登陆没有登陆没有登陆没有登陆没有登陆没有登陆");
            next({
                path: "/pages/login",
                query: { redirect: to.fullPath } //将跳转的路由path作为参数，登陆成功后跳转到该路由
            });
        }
    } else {
        next();
    }
});

// http request 全局拦截
axios.interceptors.request.use(
    config => {
        if (window.sessionStorage.getItem("token")) { // 判断是否存在token, 为每个http请求header都加上token
            config.headers.Authorization = `${window.sessionStorage.getItem("token")}`;
            console.log("请求头加上token请求头加上token请求头加上token请求头加上token请求头加上token请求头加上token");
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);

// 替代拦截器
// axios.defaults.headers.common["Authorization"] = window.localStorage.getItem("token")

// http response 全局拦截
axios.interceptors.response.use(
    response => {
        console.log(response.data.msg);
        if (response.data) {
            switch (response.data.status) {
                case 403:
                    router.push("/pages/login"); // token失效执行
            }
        }
        return response;
    },
    error => {
        return Promise.reject(error.response.status); // 返回接口错误信息
    }
)