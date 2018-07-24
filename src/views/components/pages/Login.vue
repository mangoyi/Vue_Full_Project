<template>
    <div class="app flex-row align-items-center">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-8">
                    <h1 class="title">智慧鸟(AIbrid)智能外呼系统</h1>
                    <div class="card-group mb-0">
                        <form class="card p-4" name="loginForm" novalidate>
                            <div class="card-block">
                                <p :class="{'login-info-error animated shake':login_err}" v-show="login_err">
                                    {{info}}</p>
                                <div class="input-group mb-3">
                                    <span class="input-group-addon input-group-bg">
                                        <i class="icon-user"></i>
                                    </span>
                                    <input type="text" @focus="login_err=false" v-model="username" class="form-control"
                                           placeholder="请输入用户名">
                                </div>
                                <div class="input-group mb-4">
                                    <span class="input-group-addon">
                                        <i class="icon-lock"></i>
                                    </span>
                                    <input type="password" @focus="login_err=false" v-model="password"
                                           class="form-control" placeholder="请输入密码" @keyup.enter="login">
                                </div>
                                <div class="text-center">
                                    <button type="button" class="btn btn-primary px-4" @click="login">登录</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <!-- <p class="cp">©2018 CengMei 上海澄美信息服务有限公司</p> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {Loading} from "element-ui";
import loginSrv from "@/../src/views/services/login.service.js";
import axios from "axios";

/* eslint-disable */
export default {
    name: 'Login',
    data() {
        return {
            username: '',
            password: '',
            info: '',
            login_err: false
        }
    },
    methods: {
        login() {
            let loading = {};
            if (!(this.username && this.password)) {
                this.login_err = true;
                this.info = '请输入用户信息';
            } else {
                loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.5)'
                });
                this.login_err = false;
                loginSrv.login(this.username, this.password).then(resp => {
                    loading.close();

                    // token安全验证                    
                    for (let [key, value] of Object.entries(resp.data)) {
                        window.sessionStorage.setItem(key, value);
                    }
                    axios.defaults.headers.common["Authorization"] =resp.data.token;

                    this.$router.push("/dashboard");
                }, err => {
                    loading.close();                                        
                    this.$message.error(err.msg);
                })
            }
        }
    }
}
</script>

<style scoped>
h1 {
    font-family: 'Courier New', Courier, monospace;
    margin-bottom: 20px;
    text-align: center;
    color: #fff;
}
form {
    background: rgba(0, 0, 0, 0.3);
}
input {
    border-radius: 5px;
    height: 40px;
}
input:-webkit-autofill {
    background-color: #ffffff;
    background-image: none;
}
.login-info-error {
    background: #F2DEDE;
    text-align: center;
    font-size: 16px;
    color: red;
    height: 35px;
    border-radius: 5px;
    line-height: 35px;
}
.card {
    border-radius: 8px;
    /* ie11 */
    -ms-flex: 1 0;
}
.cp {
    text-align: center;
}
.app, app-dashboard, app-root {
    /* ie11 */
    height: 100vh;              
}
</style>
