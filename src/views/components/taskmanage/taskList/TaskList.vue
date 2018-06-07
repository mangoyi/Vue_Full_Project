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
                    <button class="btn btn-primary search-btn" v-on:click.stop="searchList">搜索</button>
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
                            <tr v-for="item in taskList" :key="item.id">
                                <td>{{item.Id}}</td>
                                <td>{{item.taskName}}</td>
                                <td>{{item.taskStatus}}</td>
                                <td>{{item.publisher}}</td>
                                <td>{{item.startTime}}</td>
                                <td>{{item.zipUpdateTime}}</td>
                                <td>{{item.speed}}</td>
                                <td>{{item.robotNum}}</td>
                                <td>
                                    <router-link :to="{path: '/taskManage/TaskDetails', query: {
                                        taskId: item.taskID
                                    }}">查看明细</router-link>
                                </td>
                                <td>
                                    <button class="btn btn-primary" style="color: #fff;" @click="stop(item.taskID)">暂停</button>
                                    <router-link class="btn btn-warning" :to="{path: '/taskmanage/TaskRelease', query: {
                                        taskId: '20180529123701'
                                    }}" style="color: #fff;">修改</router-link>
                                    <button class="btn btn-danger" style="color: #fff;" @click="over(item.taskID)">结束</button>
                                </td>
                            </tr>                                          
                        </tbody>
                    </table>
                    <div class="page" v-show="taskList.length > 0">
                        <el-pagination 
                            background 
                            @current-change="handleCurrentChange"
                            :current-page.sync="currentPage"
                            :page-size="10"
                            layout="total, prev, pager, next"
                            :total="totalPage"
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
    </div>
</template>

<script>
import { Pagination, DatePicker, Button, Input, Message} from "element-ui";
import axios from 'axios';
import data from "@/../mock/mock-taskList.json";                                                                        // mock json

/* eslint-disable */
export default {
    data() {
        return {
            startDate: "",
            endDate: "",
            stopTaskid: "",            
            centerDialogVisible: false,
            currentPage: 1,
            pageSize: 10,
            totalPage: 3,
            taskList: []                                                    // json数据
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        searchList() {
            let startDate = this.startDate;
            let endDate   = this.endDate;
            let _this     = this;
            if(startDate == false && endDate == false) {
                this.init();
                return;
            }
            axios.post("/api/api/task/searchTaskList", {                        // 查询任务列表
                startTime: startDate,
                endTime  : endDate
            }).then((response) => {
                let res = response.data;
                _this.taskList = res.data.list;
            });
        },
        handleCurrentChange(val) {                                            // 分页
            alert("当前页:"+`${val}`+", 当前页个数:"+this.pageSize )
            let currentPage = `${val}`;
            let pageSize = this.pageSize;
            this.init(currentPage, pageSize);           
        },
        init(currentPage, pageSize) {
           let _this = this;
           axios.post("/api/api/task/taskList", {
               currentPage: currentPage == undefined ? 1 : currentPage,
               pageSize: pageSize == undefined ? 10 : pageSize
           }).then(function(response) {
               console.log(response);
               let res = response.data;
               if (res.status == 0) {
                    _this.taskList  =  res.data.list;
                    _this.totalPage =  res.data.totalPageNum;
               }
           }).catch(function(error) {
               alert(error);
           });
        },
        stop(taskId) {
            this.centerDialogVisible = true;
            this.stopTaskid = taskId;
            console.log(this.stopTaskid);
        },
        confirmStop() {
            let _this = this;
            this.centerDialogVisible = false;
            
            axios.post("/api/api/task/pauseTask", {                                                  // 暂停任务
                taskId: this.stopTaskid
            }).then(function(response) {
                let res = response.data;
                if (res.status == 0) {
                    _this.$message.success("任务暂停成功!");
                    _this.init();
                }
            });
        },
        over(taskID) {
            let _this = this;

            this.$confirm('此操作将永久结束该任务, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: 'true'
            }).then(() => {
                axios.post("/api/api/task/overTask", {                                              //  结束任务
                    taskId: taskID
                }).then((response ) => {
                    let res = response.data;
                    if (res.status == 0) {
                        this.$message.success("任务结束");
                        _this.init();
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消结束'
                });          
            }); 
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
