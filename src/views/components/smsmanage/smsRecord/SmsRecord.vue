<template>
    <div class="animated fadeIn content_page">
        <div class="content-title">
            <div class="title">短信记录</div>
        </div>
        <div class="content-show">
            <div class="row list-search" style="margin-bottom: 20px;">
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
                <div class="col-md-3 search-field">
                    <div style="left: 0px" class="label">查询号码：</div>
                    <input type="text" class="form-control input-field" placeholder="请输入电话号码" v-model="number" />
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
                                <th>序列</th>
                                <th>任务ID</th>
                                <th>电话号码</th>
                                <th>发送时间</th>
                                <th>发送内容</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in cartList" :key="item.id">
                                <td>{{item.sequence}}</td>
                                <td>{{item.taskId}}</td>
                                <td>{{item.number}}</td>
                                <td>{{item.sendTime}}</td>
                                <td>{{item.sendText}}</td>
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
                            :total="totalPageNum"
                        >
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog title="提示" :modal-append-to-body="false" :visible.sync="centerDialogVisible" width="20%" center>
            <div class="text-center">
                <span>确定要取消吗?</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { Pagination, DatePicker, Button, Input} from "element-ui";
import axios from "axios";
import data from "@/../mock/mock-smsRecords.json";
import smsRecordSrv from "@/../src/views/services/smsRecord.service.js";

/* eslint-disable */
export default {
    data() {
        return {
            value1:'',
            centerDialogVisible: false,
            currentPage: 1,
            pageSize: 10,
            totalPageNum: 1,
            input: '',
            startDate: '',
            endDate: '',
            number: '',
            cartList: []
        };
    },
    // mounted() {
    //     let currentPage;
    //     let pageSize;
    //     this.initSmsRecords(currentPage, pageSize);
    // },
    beforeRouteEnter: (to, from, next) => {
        next(vm => {
            smsRecordSrv.smsRecord("", "", "", vm.currentPage, vm.pageSize).then(resp => {
                let data = resp.data.list;
                console.log(data);
            }, err => {

            });
        })
    },

    methods: {

        searchList(currentPage = this.currentPage) {
            smsRecordSrv.smsRecord(this.startDate, this.endDate, this.number, currentPage, this.pageSize).then(resp => {
                this.cartList = resp.data.list;
            }, err => {
                this.$message.error(err.msg);
            });
        }


        // handleCurrentChange(val) {
        //     alert("当前页:"+`${val}`+", 当前页个数:"+this.pageSize )
        //     let currentPage = `${val}`;
        //     let pageSize = this.pageSize;
        //     this.init(currentPage, pageSize);           
        // },
        // initSmsRecords(currentPage, pageSize) {
        //     this.cartList = data.data.list;

        //     // smsRecordSrv.smsRecordSrv("", "", "", )
        //     axios.post('/api/home/initSmsRecords', {
        //        currentPage: currentPage == undefined ? 1 : this.currentPage,
        //        pageSize: pageSize == undefined ? 10 : this.pageSize 
        //     }).then((response) => {
        //         let res = response.data;
        //         console.log(res);
        //     })
        // },
        // searchList() {
            
        //     if (this.startDate != "" && this.endDate != "" && this.number != "") {
                
        //         /*
        //         axios.post('/api/home/searchSmsRecord', {
        //             startDate: this.startDate,
        //             endDate: this.endDate,
        //             number : this.number
        //         }).then((response) => {
        //             let res = response.data;
        //             console.log(res);
        //         })
        //         */
                
        //     } else {
        //         this.$message.error("请填写完信息在搜索");
        //     }

        // }

    }
};
</script>

<style lang="scss" scoped>

</style>
