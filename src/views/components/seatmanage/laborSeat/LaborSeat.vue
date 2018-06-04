<template>
    <div class="animated fadeIn content_page">
        <div class="content-title">
            <div class="title">任务列表</div>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <!-- <div class="col-md-3 search-field">
                    <div style="left:0px" class="label">开始日期：</div>
                    <el-date-picker size="large" v-model="startDate" type="date" placeholder="选择日期时间" value-format="yyyy-MM-dd">
                    </el-date-picker>
                </div>
                <div class="col-md-3 search-field">
                    <div style="left: 0px" class="label">结束日期：</div>
                    <el-date-picker size="large" v-model="endDate" type="date" placeholder="选择日期时间" value-format="yyyy-MM-dd">
                    </el-date-picker>
                </div> -->
                <div class="col-md-3 search-field">
                    <div class="label" style="left:0px;">员工ID：</div>
                    <el-input v-model="input" placeholder="请输入员工ID"></el-input>
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
                                <th>员工ID</th>
                                <th>工作状态</th>
                                <th>任务ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in cartList" :key="item.id">
                                <td>{{item.accountName}}</td>
                                <td>{{item.accountUser}}</td>
                                <td>
                                    <i class="fa fa-lg" :class="{'fa-phone': item.onLineState == '未知' ? true : false}"></i>
                                </td>
                                <td>
                                    <span v-for="info in item.taskInfo" :key="info.id">{{info.taskName}} ,</span>
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
                            :total="20"
                        >
                        </el-pagination>
                    </div>
                    <div class="info" v-show="cartList.length == 0">
                        请根据条件搜索任务列表  
                    </div>
                </div>
            </div>
        </div>

        <!-- <el-dialog title="提示" :modal-append-to-body="false" :visible.sync="centerDialogVisible" width="20%" center>
            <div class="text-center">
                <span>确定要暂停任务吗?</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirmStop">确 定</el-button>
            </span>
        </el-dialog> -->
    </div>
</template>

<script>
import { Pagination, DatePicker, Button, Input} from "element-ui";
import axios from 'axios';
import data from "@/../mock/mock-laborList.json";                                   // mock json

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
            input: "",
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
            let _this = this;
            axios.post("/api/api/account/manualWorkState ", {
                currentPage: currentPage == undefined ? 1 : currentPage,
                pageSize   : pageSize    == undefined ? 10: pageSize
            }).then((response) => {
                let res = response.data;
                if(res.status == 0) {
                    _this.cartList = response.data.data.list;
                }
            });
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
