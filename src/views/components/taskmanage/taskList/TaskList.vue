<template>
    <div class="animated fadeIn content_page">
        <div class="content-title">
            <div class="title">任务列表</div>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="col-md-3 search-field">
                    <div style="left:0px" class="label">开始日期：</div>
                    <el-date-picker size="large" v-model="startDate" type="date" placeholder="选择日期时间" value-format="yyyy-MM-dd">
                    </el-date-picker>
                </div>
                <div class="col-md-3 search-field">
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
                                <th>查看明细</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in taskList" :key="index">
                                <td>{{item.Id}}</td>
                                <td>{{item.taskName}}</td>
                                <td>{{objStatus[item.taskStatus]}}</td>
                                <td>{{item.publisher}}</td>
                                <td>{{item.startTime.substring(0, 16).replace("T", " ")}}</td>
                                <td>{{item.zipUpdateTime.substring(0, 16).replace("T", " ")}}</td>
                                <td>{{item.speed}}</td>
                                <td>{{item.robotNum}}</td>
                                <td>
                                    <router-link :to="{path: '/taskManage/TaskDetails', query: {
                                        taskId: item.taskID
                                    }}">查看明细</router-link>
                                </td>
                                <td>
                                    <button class="btn btn-primary" style="color: #fff;" @click="togglePause(item)" :disabled="item.taskStatus === 2 ? true : false" >{{item.taskStatus == 1 ? '开启' : '暂停'}}</button>
                                    <button class="btn btn-warning"  :disabled="item.taskStatus === 2 ? true : false" @click="taskUpdate(item.taskID)">
                                        <!-- <router-link  :to="{path: '/taskmanage/TaskUpdate', query: {
                                            taskId: item.taskID,
                                            currentPage: currentPage
                                        }}" style="color: #fff;">修改</router-link> -->
                                        修改
                                    </button>
                                    <button class="btn btn-danger" style="color: #fff;" @click="over(item.taskID)" :disabled="item.taskStatus === 2 ? true : false">结束</button>
                                </td>
                            </tr>                                          
                        </tbody>
                    </table>
                    <div class="page" v-show="(taskList.length > 0 && totalPageNum > 10)">
                        <el-pagination 
                            background 
                            @current-change="searchList"
                            :current-page.sync="currentPage"
                            :page-size="pageSize"
                            layout="total, prev, pager, next"
                            :total="totalPageNum"
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
import { Pagination, DatePicker, Button, Input, Message} from "element-ui";
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
            totalPageNum: 1,
            taskList: []                                                    // json数据
        };
    },
    beforeRouteEnter: (to, from, next) => {
        console.log(to);
        next(vm => {
            let temCurrentPage = 1;

            if (Number(vm.$route.query.currentPage) !== 1) {
                // 说明从任务修改中跳转过来: 确保第几页修改，修改完成（返回）就回到第几页。
                temCurrentPage = vm.$route.query.currentPage;
            }

            taskListSrv.taskList(vm.startDate, vm.endDate, temCurrentPage, vm.pageSize).then(resp => {    
                vm.taskList = resp.data.list;
                vm.totalPageNum = resp.data.totalPageNum;
                vm.currentPage = temCurrentPage;
            }, err => {
                vm.$message.error(err.msg);
            });
        })
    },
    methods: {
        searchList(currentPage = this.currentPage) {
            taskListSrv.taskList(this.startDate, this.endDate, currentPage, this.pageSize).then(resp => {
                this.taskList = resp.data.list;
                this.totalPageNum = resp.data.totalPageNum;
                this.currentPage = currentPage; 
            }, err => {
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

                // axios.post("/api/api/task/overTask", {                                              //  结束任务
                //     taskId: taskID
                // }).then((response ) => {
                //     let res = response.data;
                //     if (res.status == 0) {
                //         this.$message.success("任务结束");
                //         _this.init();
                //     }
                // })
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
                    taskId: taskID,
                    currentPage: this.currentPage
                }
            })
        }
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
