<template>
    <div class="content_page animated zoomIn yi_addUser">
        <div class="content-title">
            <div class="title">新增用户信息</div>
            <router-link class="btn btn-info back" :to="'/system/user'">
                返回
            </router-link>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">登录名：</div>
                    <input type="text" v-model.trim="loginName" class="form-control input-field" placeholder="请输入用户登录名" v-on:blur="checkName"/>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">密码：</div>
                    <input type="text" v-model.trim="password" class="form-control input-field" placeholder="请输入用户密码" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">姓名：</div>
                    <input type="text" v-model.trim="username" class="form-control input-field" placeholder="请输入姓名" />
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">角色：</div>
                    <el-select ref="selectRole" size="large" v-model="role" class="el-field-input" placeholder="请选择">
                        <el-option v-for="item in roleOptions" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">状态：</div>
                    <el-select ref="selectStatus" size="large" v-model="status" class="el-field-input" placeholder="请选择">
                        <el-option label="正常" value="normal"></el-option>
                        <el-option label="锁定" value="lock"></el-option>
                    </el-select>
                </div>
            </div>
        </div>
        <div class="content-footer row yi_footer">
            <span :class="{'login-info-error animated shake':login_err}" v-show="login_err">登录名重复，请修改</span>
        </div>
        <div class="content-footer">
            <el-button class="btn btn-primary makesure" :plain="true" @click="open">确定</el-button>
        </div>

    </div>
</template>

<script>
import { Button } from 'element-ui'
import userSrv from "@/../src/views/services/user.service.js";
/* eslint-disable */
export default {
    data() {
        return {
            loginName: '',
            password: '',
            username: '',
            role:'',
            status: "normal",
            roleOptions: [
                {
                    value: 1,
                    label: '普通员工'
                }, 
                {
                    value: 2,
                    label: '系统管理员'
                }
            ],
            login_err: false
        }
    },
    components: {
        'el-button': Button,
    },
    mounted(){
        this.$el.addEventListener('animationend',this.resizeRole);
        this.$el.addEventListener('animationend',this.resizeStatus);
        this.initRoles;
    },
    methods: {
        initRoles() {
            userSrv.getAllRoles().then(resp => {
                // todos
            }, err => {

            });
        },
        checkName() {
            userSrv.checkLoginName(this.loginName).then(resp => {
                console.log(resp);
                // todos
            }, err => {

            });
        },
        resizeStatus(){
            this.$refs.selectStatus.resetInputWidth()
        },
        resizeRole(){
            this.$refs.selectRole.resetInputWidth()
        },
        open() {
            // 0: 正常状态   5: 锁定状态
            let tempStatus = 0;
            if (this.status == 'lock') {
                tempStatus = 5;
            }
            if (this.loginName && this.password && this.username && this.role && this.status) {   
                userSrv.addUser(this.loginName, this.password, this.username, this.role, tempStatus, 0).then(resp => {
                    console.log(resp);
                    // todos
                }, err => {

                });
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .login-info-error {
        background: #F2DEDE;
        text-align: center;
        font-size: 14px;
        color: red;
        height: 30px;
        border-radius: 5px;
        line-height: 30px;
        padding: 0 10px;
    }
    .yi_addUser .content-footer {
        position: relative;
        left: 0;
        bottom: 10px;
        text-align: center;
        justify-content: center;
    }
    .yi_addUser .yi_footer {
        margin-bottom: 14px;
    }
</style>
