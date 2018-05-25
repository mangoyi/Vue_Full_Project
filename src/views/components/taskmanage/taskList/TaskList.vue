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
                <!-- <div class="col-md-3 search-field">
                    <div class="label" style="left:0px;">模板名称：</div>
                    <el-input v-model="input" placeholder="请输入内容"></el-input>
                </div>
                <div class="col-md-3 search-field">
                    <div style="left: 0px" class="label">查询号码：</div>
                    <input type="text" class="form-control input-field" placeholder="请输入电话号码" v-model="number" />
                </div> -->
                <div class="col-md-1 search-field search-field_controls">
                    <button class="btn btn-primary search-btn" v-on:click.stop="searchList">搜索</button>
                </div>
                <!-- <div class="col-md-1 search-field search-field_controls">
                    <router-link class="btn btn-success" :to="'/message/addModal'">
                        新增
                    </router-link>
                </div> -->
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
                                <th>时间</th>
                                <th>任务进度</th>
                                <th>机器人个数</th>
                                <th>查看明细</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in cartList" :key="item.id">
                                <td>{{item.sequence}}</td>
                                <td>{{item.taskName}}</td>
                                <td>{{item.taskStatus}}</td>
                                <td>{{item.promulgator}}</td>
                                <td>{{item.startTime}}</td>
                                <td>{{item.speed}}</td>
                                <td>{{item.RobotNub}}</td>
                                <td>
                                    <router-link :to="{path: '/taskManage/TaskDetails', query: {
                                        taskId: item.taskId
                                    }}">查看明细</router-link>
                                </td>
                                <td>
                                    <button class="btn btn-danger" style="color: #fff;" @click="stop(item.taskId)">暂停</button>
                                    <router-link class="btn btn-warning" :to="{path: '/taskmanage/TaskRelease', query: {
                                        taskId: item.taskId
                                    }}" style="color: #fff;">修改</router-link>
                                </td>
                            </tr>                                          
                        </tbody>
                    </table>
                    <div class="page" v-show="cartList.length > 0">
                        <el-pagination 
                            background 
                            @current-change="handleCurrentChange"
                            :current-page.sync="currentPage"
                            :page-size="10"
                            layout="total, prev, pager, next"
                            :total="1000"
                        >
                        </el-pagination>
                    </div>
                    <div class="info" v-show="cartList.length == 0">
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
                <el-button @click="centerDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirmStop">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { Pagination, DatePicker, Button, Input} from "element-ui";
import axios from 'axios';
import data from "@/../mock/mock-taskList.json";                             // mock json

/* eslint-disable */
export default {
    data() {
        return {
            startDate: "",
            endDate: "",
            number: "",
            stopTaskid: "",            
            centerDialogVisible: false,
            currentPage: 1,
            pageSize: 10,
            cartList: []
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        searchList() {
            let startDate = this.startDate;
            let endDate   = this.endDate;
            if(startDate == false && endDate == false) {
                alert('请填写至少一个搜索条件');
                return;
            }
            this.cartList = data.data.list;
        },
        handleCurrentChange(val) {
            alert("当前页:"+`${val}`+", 当前页个数:"+this.pageSize )
            let currentPage = `${val}`;
            let pageSize = this.pageSize;
            this.init(currentPage, pageSize);           
        },
        init(currentPage, pageSize) {
            /*
           axios.post("/api/home/taskList", {
               currentPage: currentPage == undefined ? 1 : currentPage,
               pageSize: pageSize == undefined ? 10 : pageSize
           }).then(function(response) {
               let res = response.data;
               this.cartList = res.list;
           }).catch(function(error) {
               alert(error);
           });
           */
          this.cartList = data.data.list;
        },
        stop(taskId) {
            this.centerDialogVisible = true;
            this.stopTaskid = taskId;
            console.log(this.stopTaskid);
        },
        confirmStop() {
            this.centerDialogVisible = false;
            /*
            axios.post("/home/stopTask", {
                taskId: this.stopTaskid
            }).then(function(response) {
                let res = response.data;
                if (res.status == '0') {
                    console.log("删除成功");
                }
            });
            */
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
