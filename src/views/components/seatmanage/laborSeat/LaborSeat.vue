<template>
    <div class="animated fadeIn content_page">
        <div class="content-title">
            <div class="title">人工座席</div>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="col-md-3 search-field">
                    <div class="label" style="left:0px;">关键词：</div>
                    <el-input v-model.trim="keyWord" placeholder="请输入员工ID"></el-input>
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
                                <th>员工姓名</th>
                                <th>员工ID</th>
                                <th>工作状态</th>
                                <th>任务ID</th>
                                <th>在线状态</th>
                            </tr>
                        </thead>
                        <tbody >
                            <tr v-for="(item, index) in laborList" :key="index">
                                <td>{{item.accountName}}</td>
                                <td>{{item.accountUser}}</td>
                                <td>{{item.taskState == 0 ? "空闲中" : "工作中"}}
                                    <!-- <i class="fa fa-lg" :class="{'fa-phone': item.onLineState == '未知' ? true : false}"></i> -->
                                </td>
                                <td>
                                    <span v-for="info in item.taskInfo" :key="info.id">{{info.taskName}} ,</span>
                                </td>
                                <td>{{item.onLineState}}</td>
                            </tr>                                          
                        </tbody>
                    </table>
                    <div class="page" v-show="(laborList.length > 0 && totalPageNum > 10)">
                        <el-pagination 
                            background 
                            @current-change="handleCurrentChange"
                            :current-page.sync="currentPage"
                            :page-size="10"
                            layout="total, prev, pager, next"
                            :total="totalPageNum"
                        >
                        </el-pagination>
                    </div>
                    <div class="info" v-show="laborList.length == 0">
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
import data from "@/../mock/mock-laborList.json";                                   // mock json

/* eslint-disable */
export default {
    data() {
        return {
            currentPage: 1,
            pageSize: 10,
            keyWord: "",
            laborList: [],
            totalPageNum: 1
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        searchList() {
            let _this = this;
            if (this.keyWord) {
                axios.post('/api/api/account/searchSeat', {
                    keyWord: this.keyWord
                }).then((response) => {
                    let res = response.data;
                    if (res.status == 0) {
                        _this.laborList = res.data.list;
                        _this.totalPageNum = res.data.totalPageNum;
                    }
                });
            } else {
                this.init();
            }
        },
        handleCurrentChange(val) {
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
                    _this.laborList = res.data.list;
                    // _this.testList = [_this.laborList[0]];
                    _this.totalPageNum = res.data.totalPageNum;
                }
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
