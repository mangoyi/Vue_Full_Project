<template>
    <div class="content_page animated zoomIn">
        <div class="content-title">
            <div class="title">修改用户信息</div>
            <router-link class="btn btn-info back" :to="{
                path: '/system/user',
                query: {currentPage: userCurrentPage}
            }">
            返回
            </router-link>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">登录名：</div>
                    <input type="text" v-model.trim="loginName" class="form-control input-field" placeholder="请输入用户登录名" disabled/>
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
                    <el-select ref="selectRole" size="large" v-model="role" class="el-field-input" placeholder="请选择" multiple >
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
        <div class="content-footer row">
            <el-button class="col-md-1 btn btn-primary makesure" :plain="true" @click="update">确定</el-button>
        </div>
    </div>
</template>

<script>
import { DatePicker, Button } from 'element-ui';
import userSrv from "@/../src/views/services/user.service.js";
/* eslint-disable */
export default {
    data() {
        return {
            loginName: '',
            password: '',
            username: '',
            role:[],
            status: "normal",
            roleOptions: [],
            login_err: false,
            loginNameFlag: false,
            Id: '',                // 当前用户Id
            userCurrentPage: 1     // 在用户列表中的当前页数
        }
    },
    components: {
        'el-date-picker': DatePicker,
        'el-button': Button,
    },
    mounted() {
        this.$el.addEventListener('animationend', this.resizeRole)
        this.$el.addEventListener('animationend', this.resizeStatus)
    },
    beforeRouteEnter(from, to, next) {
        next(vm => {
            vm.userCurrentPage = vm.$route.query.currentPage;           // 确保返回到用户列表的时候是当前用户所在页

            // 获取所有用户角色
            userSrv.getAllRoles().then(resp => {
                let dataArr = resp.data.roles;
                dataArr.map( ( item )=> {
                    let roleOption = {};
                    roleOption["value"] = item.Id;
                    roleOption["label"] = item.RoleName == "admin" ? "管理员" : "普通用户";
                    vm.roleOptions.push(roleOption);
                });
                console.log(vm.roleOptions);
            }, err => {
                vm.$message.error(err.msg);
            });

            // 获取用户信息
            userSrv.getUser(vm.$route.query.Id).then(resp => {
                let userData = resp.data.userInfo;
                vm.loginName = userData.accountUser;                    // 登录名
                vm.password = userData.accountPWD;                      // 密码
                vm.username = userData.accountName;                     // 姓名
                
                // 角色
                userData.Roles.map(x => {
                    vm.role.push(x.Id);
                });

                // 状态
                if (userData.accountState === 1) {                          // 锁定状态
                    vm.status = "lock";
                }

            }, err => {
                vm.$message.error(err.msg);
            });

        });
    },
    methods: {
        resizeStatus() {
            this.$refs.selectStatus.resetInputWidth()
        },
        resizeRole() {
            this.$refs.selectRole.resetInputWidth()
        },
        update() {
            // 0: 正常状态   5: 锁定状态
            let tempStatus = 0;
            if (this.status == 'lock') {
                tempStatus = 5;
            }

            let tempRole = [];                  // 提交后台数据格式
            this.role.forEach(x => {
                let tempOption = {};
                tempOption["Id"] = x;
                tempRole.push(tempOption);
            });

            if (this.loginName && this.password && this.username && tempRole.length > 0 && this.status) {    
                console.log("提交啦提交啦提交啦提交啦");              
                userSrv.updateUser(this.$route.query.Id ,this.loginName, this.password, this.username, tempRole, tempStatus, 0).then(resp => {
                    this.$message.success("用户修改成功!");
                    this.$router.push({path: "/system/user", query:{currentPage: this.$route.query.currentPage}});          // 跳回任务列表所在当前页
                }, err => {
                    this.$message.error(err.msg);
                });
            } else {
                this.$message.error("请填写所有数据!!!");
            }
            
        },

    }
}
</script>

<style lang="scss" scoped>

</style>
