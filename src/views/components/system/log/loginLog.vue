<template>
    <div class="content_page animated fadeIn">
        <div class="content-title" key="0">
            <div class="title">用户管理</div>
        </div>
        <div class="content-show" key="1">
            <div class="row list-search">
                <div class="col-md-3 search-field">
                    <div class="label">IP：</div>
                    <input type="text" class="form-control input-field" placeholder="请输入IP" v-model="ip" />
                </div>
                <div class="col-md-3 search-field">
                    <div class="label">MAC：</div>
                    <input type="text" class="form-control input-field" placeholder="请输入MAC" v-model="mac" />
                </div>
                <div class="col-md-3 search-field">
                    <div class="label">登录名：</div>
                    <input type="text" class="form-control input-field" placeholder="请输入登录名" v-model="accountUser" />
                </div>
                <div class="col-md-4 search-field">
                    <div style="left:0px" class="label">开始日期：</div>
                    <el-date-picker size="normal" v-model="startTime" type="date" placeholder="选择日期时间" value-format="yyyy-MM-dd">
                    </el-date-picker>
                </div>
                <div class="col-md-4 search-field">
                    <div style="left: 0px" class="label">结束日期：</div>
                    <el-date-picker size="large" v-model="endTime" type="date" placeholder="选择日期时间" value-format="yyyy-MM-dd">
                    </el-date-picker>
                </div>
                <div class="col-md-1 search-field search-field_controls">
                    <button class="btn btn-primary search-btn" @click.stop="searchList(1)">搜索</button>
                </div>
            </div>
            <div class="row ">
                <div class="col-lg-12">
                    <table class="table table-bordered table-striped table-sm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>IP</th>
                                <th>用户登录名</th>
                                <th>Mac</th>
                                <th>登陆时间</th>
                            </tr>
                        </thead>
                        <tbody v-for="(item, index) in logList" :key="index">
                            <tr>
                                <td>{{item.id}}</td>
                                <td>{{item.ip}}</td>
                                <td>{{item.accountUser}}</td>
                                <td>{{item.mac }}</td>
                                <td>{{item.time}}</td>
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
    
    </div>
</template>

<script>
import { Pagination, Dialog } from 'element-ui';
import userSrv from "@/../src/views/services/user.service.js";
/* eslint-disable */
export default {
    data() {
        return {
            ip: '',
            mac: '',
            startTime: '',
            endTime: '',
            logList: [],
            accountUser: "",
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
            userSrv.loginLog(vm.ip, vm.mac, vm.accountUser, vm.startTime, vm.endTime, vm.currentPage, vm.pageSize).then(resp => {
                let data = resp.data.pageInfo;
                vm.logList = data.list;
                vm.totalRecords = data.totalRecords;
            }, err => {
                vm.$message.error(err.msg);
            });
        });
    },
    methods: {
        // 根据参数搜索登陆信息
        searchList(currentPage = this.currentPage) {
            userSrv.loginLog(this.ip, this.mac, this.accountUser, this.startTime, this.endTime, currentPage, this.pageSize).then(resp => {
                let data = resp.data.pageInfo;
                this.logList = data.list;
                this.totalRecords = data.totalRecords;
                this.currentPage = currentPage;
            }, err => {
                this.$message.error(err.msg);
            });
        },


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
