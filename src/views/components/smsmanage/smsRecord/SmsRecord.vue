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
                    <input type="text" class="form-control input-field" placeholder="请输入电话号码" v-model="phone" />
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
                            <tr v-for="(item, index) in recordList" :key="index">
                                <td>{{index + (currentPage - 1)*10}}</td>
                                <td>{{item.taskId}}</td>
                                <td>{{item.phone}}</td>
                                <td>{{item.sendTime.replace("T"," ")}}</td>
                                <td>{{item.smsTemplateText}}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="page" v-show="totalPageNum >= 10">
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
            phone: '',
            recordList: []
        };
    },
    beforeRouteEnter: (to, from, next) => {
        next(vm => {
            smsRecordSrv.smsRecord(vm.startDate, vm.endDate, vm.phone, vm.currentPage, vm.pageSize).then(resp => {
                vm.recordList = resp.data.list;
                vm.totalPageNum = resp.data.totalPageNum;
            }, err => {
                vm.$message.error(err.msg);
            });
        })
    },
    methods: {
        searchList(currentPage = this.currentPage) {
            smsRecordSrv.smsRecord(this.startDate, this.endDate, this.phone, currentPage, this.pageSize).then(resp => {
                this.recordList = resp.data.list;
                this.totalPageNum = resp.data.totalPageNum;
                this.currentPage = currentPage;
            }, err => {
                this.$message.error(err.msg);
            });
        }
    }
};
</script>
