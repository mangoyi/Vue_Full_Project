<template>
    <div class="animated fadeIn content_page">
        <div class="content-title">
            <div class="title">任务列表</div>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div style="left:0px" class="label">开始日期：</div>
                    <el-date-picker size="large" v-model="startDate" type="date" placeholder="选择日期时间" value-format="yyyy-MM-dd">
                    </el-date-picker>
                </div>
                <div class="col-md-4 search-field">
                    <div style="left: 0px" class="label">结束日期：</div>
                    <el-date-picker size="large" v-model="endDate" type="date" placeholder="选择日期时间" value-format="yyyy-MM-dd">
                    </el-date-picker>
                </div>
                <div class="col-md-1 search-field search-field_controls">
                    <button class="btn btn-primary search-btn" v-on:click.stop="searchList(1)">搜索</button>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <table class="table table-bordered table-striped table-sm">
                        <thead>
                            <tr>
                                <th>编号</th>
                                <th>任务名称</th>
                                <th>任务状态</th>
                                <th>发布者</th>
                                <th>创建时间</th>
                                <th>修改时间</th>
                                <th>任务进度</th>
                                <th>机器人个数</th>
                                <th>明细</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in taskList" :key="index">
                                <td>{{item.id}}</td>
                                <td :title="item.taskID">{{item.taskName}}</td>
                                <td>{{objStatus[item.taskStatus]}}</td>
                                <td>{{item.publisher}}</td>
                                <td>{{item.startTime.substring(0, 16).replace("T", " ")}}</td>
                                <td>{{item.zipUpdateTime.substring(0, 16).replace("T", " ")}}</td>
                                <td>{{item.speed}}</td>
                                <td>{{item.robotNum}}</td>
                                <td>
                                    <router-link :to="{path: '/taskManage/TaskDetails', query: {
                                        taskId: item.taskID,
                                        currentPage: currentPage
                                    }}">查看明细</router-link>
                                    <a @click="exportDetail(item.taskID)">导出明细</a>
                                </td>
                                <td>
                                    <button class="btn btn-primary" style="color: #fff;" @click="togglePause(item)" :disabled="item.taskStatus === 2 ? true : false" >{{item.taskStatus == 1 ? '开启' : '暂停'}}</button>
                                    <button class="btn btn-warning"  :disabled="(item.taskStatus === 2 || item.taskStatus === 1) ? true : false" @click="taskUpdate(taskID)">
                                        修改
                                    </button>
                                    <button class="btn btn-danger" style="color: #fff;" @click="over(item.taskID)" :disabled="item.taskStatus === 2 ? true : false">结束</button>
                                    <button class="btn btn-info" style="color: #fff;" @click="deleteTask(item.taskID)" v-if="roleAdmin">删除</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="page" v-show="(taskList.length > 0 && totalRecords > 10)">
                        <el-pagination
                            background
                            @current-change="searchList"
                            :current-page.sync="currentPage"
                            :page-size="pageSize"
                            layout="total, prev, pager, next"
                            :total="totalRecords"
                        >
                        </el-pagination>
                    </div>
                    <div class="info" v-show="taskList.length == 0">
                        请根据条件搜索任务列表
                    </div>
                </div>
            </div>
        </div>

        <el-dialog title="提示" :modal-append-to-body="false" :visible.sync="centerDialogVisible" width="20%" center>
            <div class="text-center">
                <span>确定要暂停任务吗?</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="confirmStop">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="提示" :modal-append-to-body="false" :visible.sync="centerDialogVisible2" width="20%" center>
            <div class="text-center">
                <span>确定要开启任务吗?</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="confirmOpen">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { Pagination, DatePicker, Button, Input, Message, Loading} from "element-ui";
import taskListSrv from "@/../src/views/services/taskList.service.js";

/* eslint-disable */
export default {
    data() {
        return {
            startDate: "",
            endDate: "",
            pauseTaskId: "",
            openTaskId: "",
            objStatus: {
                "0": "进行中",
                "1": "已暂停",
                "2": "已结束"
            },
            centerDialogVisible: false,
            centerDialogVisible2: false,
            currentPage: 1,
            pageSize: 10,
            totalRecords: 1,
            taskList: [],                                                    // json数据
            downLoadUrl: '',
            roleAdmin: false
        };
    },
    beforeRouteEnter: (to, from, next) => {
        console.log(to);
        next(vm => {
            let loading = {};
            let temCurrentPage = 1;

            if (vm.$route.query.currentPage) {
                // 说明从任务修改中跳转过来: 确保第几页修改，修改完成（返回）就回到第几页。
                temCurrentPage =Number( vm.$route.query.currentPage);
            }
            // //加载动画 fl----- 6.26
            loading = vm.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.5)'
            });

            taskListSrv.taskList(vm.startDate, vm.endDate, temCurrentPage, vm.pageSize).then(resp => {
                loading.close();
                let taskData  =  resp.data.pageInfo;
                vm.taskList = taskData.list;
                vm.totalRecords = taskData.totalRecords;
                vm.currentPage = temCurrentPage;
            }, err => {
                loading.close();
                vm.$message.error(err.msg);
            });

            // 管理员才有删除按钮
            if (window.sessionStorage.getItem("roles").indexOf("admin") > -1) {
                vm.roleAdmin = true;
            }
        })
    },
    methods: {
        searchList(currentPage = this.currentPage) {
            let loading = {};
            loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.5)'
            });
            taskListSrv.taskList(this.startDate, this.endDate, currentPage, this.pageSize).then(resp => {
                loading.close();
                let taskData = resp.data.pageInfo;
                this.taskList = taskData.list;
                this.totalRecords = taskData.totalRecords;
                this.currentPage = currentPage;
            }, err => {
                loading.close();
                this.$message.error(err.msg);
            });
        },
        togglePause(item) {
            if (item.taskStatus === 0) {            // 暂停
                this.centerDialogVisible = true;
                this.pauseTaskId = item.taskID;
            } else if (item.taskStatus === 1) {     // 开启
                this.centerDialogVisible2 = true;
                this.openTaskId = item.taskID;
            }
        },
        confirmStop() {
            this.centerDialogVisible = false;
            taskListSrv.pauseTask(this.pauseTaskId).then(resp => {
                this.searchList(this.currentPage);
                this.$message.success("任务已暂停!");
            }, err => {
                this.$message.error(err.msg);
            })
        },
        confirmOpen() {
            this.centerDialogVisible2 = false;
            taskListSrv.openTask(this.openTaskId).then(resp => {
                this.searchList(this.currentPage);
                this.$message.success("任务已开启!");
            }, err => {
                this.$message.error(err.msg);
            })
        },
        over(taskId) {
            this.$confirm('此操作将永久结束该任务, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: 'true'
            }).then(() => {
                taskListSrv.overTask(taskId).then(resp => {
                    this.searchList(this.currentPage);
                }, err => {
                    this.$message.error(err.msg);
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消结束'
                });
            });
        },
        taskUpdate(taskID) {
            this.$router.push({
                path: '/taskmanage/TaskUpdate',
                query: {
                    taskId: taskID
                    // currentPage: this.currentPage
                }
            });
        },

        // 下载文件
        exportDetail(taskID) {
            taskListSrv.exportDetail(taskID).then(resp => {
                this.download(resp);
            }, err => {
                this.$message.error("请刷新页面重试");
            })            
        },

        // download下载文件方法
        download(data) {
            if (!data) {
                return;
            }
            let url = window.URL.createObjectURL(new Blob([data]));
            let link = document.createElement('a');
            link.style.display = "none";
            link.href = url;
            link.setAttribute("download", "任务明细.xlsx");
            document.body.appendChild(link);
            link.click();
        },

        // 删除任务
        deleteTask(taskId) {
            this.$confirm('此操作将永久删除该任务, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: 'true'
            }).then(() => {
                taskListSrv.deleteTask(taskId).then(resp => {
                    this.searchList(this.currentPage);
                    this.$message.success("任务已经删除");
                }, err => {
                    this.$message.error(err.msg);
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消结束'
                });
            });
        }
    },
    activated() {
        console.log("activete")
        // this.searchList();
    }
};
</script>

<style lang="scss" scoped>
    .info {
        padding-top: 14px;
        text-align: center;
        color: #666;
    }
</style>
