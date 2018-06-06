<template>
    <div class="animated fadeIn content_page">
        <div class="content-title">
            <div class="title">任务列表</div>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="col-md-3 search-field">
                    <div class="label" style="left:0px;">机器人ID：</div>
                    <el-input v-model="robotId" placeholder="请输入机器人ID"></el-input>
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
                                <th>机器人ID</th>
                                <th>工作状态</th>
                                <th>任务ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in cartList" :key="item.id">
                                <td>{{item.accountName}}</td>
                                <td>{{item.accountUser}}</td>
                                <td>
                                    <i class="fa fa-lg" :class="{'fa-phone': item.robotStatus == '未知' ? false : true}"></i>
                                </td>
                                <td>
                                    <span v-for="info in item.taskInfo" :key="info.id">{{info.taskID}} ,</span>
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
    </div>
</template>

<script>
import { Pagination, DatePicker, Button, Input} from "element-ui";
import axios from 'axios';
import data from "@/../mock/mock-robotList.json";                                   // mock json

/* eslint-disable */
export default {
    data() {
        return {
            currentPage: 1,
            pageSize: 10,
            robotId: "",
            cartList: []
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        searchList() {
            if (this.robotId) {
                /*
                axios.post('/api/api/account/searchManual', {
                    robotId: this.robotId
                }).then((response) => {
                    let res = response.data;
                    if (res.status == 0) {
                        let data = res.data.list;
                    }
                });
                */
            } else {
                this.init();
            }
        },
        handleCurrentChange(val) {
            alert("当前页:"+`${val}`+", 当前页个数:"+this.pageSize )
            let currentPage = `${val}`;
            let pageSize = this.pageSize;
            this.init(currentPage, pageSize);           
        },
        init(currentPage, pageSize) {
            let _this = this;
            axios.post("/api/api/account/robotWorkState", {
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
