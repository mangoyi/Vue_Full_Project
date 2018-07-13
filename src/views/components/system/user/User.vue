<template>
    <div class="content_page animated fadeIn">
        <div class="content-title" key="0">
            <div class="title">用户管理</div>
        </div>
        <div class="content-show" key="1">
            <div class="row list-search">
                <div class="col-md-3 search-field">
                    <div class="label">姓名：</div>
                    <input type="text" class="form-control input-field" placeholder="请输入姓名" v-model="username" />
                </div>
                <div class="col-md-1 search-field search-field_controls">
                    <button class="btn btn-primary search-btn" @click.stop="searchList(1)">搜索</button>
                </div>
                <div class="col-md-1 search-field search-field_controls">
                    <router-link class="btn btn-success" :to="'/system/AddUser'">
                        新增
                    </router-link>
                </div>
            </div>
            <!-- <div class="wait-loading"><img src="/static/img/loading.gif"></div> -->
            <div class="row ">
                <div class="col-lg-12">
                    <table class="table table-bordered table-striped table-sm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>姓名</th>
                                <th>用户登录名</th>
                                <th>角色</th>
                                <th>状态</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody v-for="(item, index) in userList" :key="index">
                            <tr>
                                <td>{{item.id}}</td>
                                <td>{{item.accountName}}</td>
                                <td>{{item.accountUser}}</td>
                                <td>{{ revoleRole(item.roles) }}</td>
                                <td>{{item.accountState == 0 ? "正常" : "锁定"}}</td>
                                <td>
                                    <!-- <router-link :to="{path: '/system/updateUser', query: {Id: item.Id, currentPage: currentPage}}">
                                        修改
                                    </router-link> -->
                                    <router-link :to="{path: '/system/updateUser', query: {Id: item.id}}">
                                        修改
                                    </router-link>
                                    <a @click="toggleLockUser(item)" >{{ item.accountState == 0 ? "锁定" : "解锁" }}</a>
                                    <a @click="deleteUser(item.id)">删除</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    
                    <div class="page" v-show="totalRecords > 10">
                        <el-pagination 
                            background 
                            @current-change="searchList"
                            :current-page.sync="currentPage"
                            :page-size="pageSize"
                            layout="prev, pager, next" 
                            :total="totalRecords" 
                        >
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog title="锁定" :modal-append-to-body="false" :visible.sync="lockDialog" width="20%" center>
            <div class="text-center">
                <span>确定要锁定此状态吗?</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="confirmLockUser">确 定</el-button>
            </span>
        </el-dialog>
        
        <el-dialog title="解锁" :modal-append-to-body="false" :visible.sync="unLockDialog" width="20%" center>
            <div class="text-center">
                <span>确定解除锁定吗?</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="confirmUnLockUser">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="删除" :modal-append-to-body="false" :visible.sync="deleteDialog" width="20%" center>
            <div class="text-center">
                <span>删除后无法找回，确定要删除此用户吗?</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="confirmDeleteUser">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { Pagination, Dialog } from 'element-ui';
import userSrv from "@/../src/views/services/user.service.js";
/* eslint-disable */
export default {
    data() {
        return {
            passwordDialog: false,
            lockDialog: false,
            unLockDialog: false,
            deleteDialog: false,
            userList: [],
            username: "",
            currentPage: 1,
            pageSize: 10,
            totalRecords: 0,
            deleteUserId: '',
            lockUserId: '',
            unlockUserId: ''
        }
    },
    components: {
        'el-pagination': Pagination,
        'el-dialog': Dialog
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            // let temCurrentPage = 1;                                                     // 如果是从修改用户页面跳转过来，那么要显示当前用户所在页

            //if (Number(vm.$route.query.currentPage) !== 1) {
                // 如果是从修改用户页面跳转过来，那么要显示当前用户所在页
               // temCurrentPage = Number(vm.$route.query.currentPage);
            //}

            userSrv.getAllUsers(vm.username, vm.currentPage, vm.pageSize).then(resp => {
                let data = resp.data.pageInfo;
                vm.userList = data.list;
                vm.totalRecords = data.totalRecords;
                // vm.currentPage = temCurrentPage;
            }, err => {
                vm.$message.error(err.msg);
            })
        });
    },
    methods: {
        // 根据参数搜索用户信息
        searchList(currentPage = this.currentPage) {
            userSrv.getAllUsers(this.username, currentPage, this.pageSize).then(resp => {
                let data = resp.data.pageInfo;
                this.userList = data.list;
                this.totalRecords = data.totalRecords;
                this.currentPage = currentPage;
            }, err => {
                this.$message.error(err.msg);
            });
        },
        revoleRole(roles) {
            if (roles.length == 0) {    // 普通用户
                return "普通用户";
            } else {
                let arr = roles.map(x => x.roleName == "admin" ? "管理员" : "普通用户");
                // return Array.from(new Set(roles.map(x => x.RoleName == "admin" ? "管理员" : "普通用户"))).join();
                return arr.join();
            }
        },

        // 删除用户
        deleteUser(Id) {
            this.deleteUserId = Id;
            this.deleteDialog = true;
            console.log(this.deleteUserId);
        },
        confirmDeleteUser() {
            userSrv.deleteUser(this.deleteUserId).then(resp => {
                this.searchList(this.currentPage);                  // 第2页删除并且保留在第2页
                this.deleteDialog = false;
                this.$message.success("用户已删除");
            }, err => {
                this.$message.error(err.msg);
            });
        },

        // 锁定用户
        toggleLockUser(item) {
            if (item.accountState === 0) {                // 锁定用户
                this.lockUserId = item.id;
                this.lockDialog = true;
            } else {                                // 解除锁定
                this.unlockUserId = item.id;    
                this.unLockDialog = true; 
            }
        },
        confirmLockUser() {
            userSrv.lockUser(this.lockUserId).then(resp => {
                this.searchList(this.currentPage);                  // 第2页锁定并且保留在第2页
                this.lockDialog = false;
                this.$message.success("用户已锁定");
            }, err => {
                this.$message.error(err.msg);
            });
        },
        confirmUnLockUser() {
            userSrv.unLockUser(this.unlockUserId).then(resp => {
                this.searchList(this.currentPage);                  // 第2页解锁并且保留在第2页
                this.unLockDialog = false;
                this.$message.success("成功解锁用户");
            }, err => {
                this.$message.error(err.msg);
            });
        }

    }

}
</script>

<style lang="scss" scoped>
.content_page {
    .content-show {
        .list-search {
            .search-field {
                .label {
                    position: absolute;
                    left: 20px;
                    top: 8px;
                    text-align: right;
                }
            }
        }
    }
}
</style>
