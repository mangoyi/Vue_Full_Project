<template>
    <div class="animated fadeIn content_page">
        <div class="content-title">
            <div class="title">通话记录</div>
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
                <div class="col-md-3 search-field">
                    <div style="left: 0px" class="label">查询号码：</div>
                    <input type="text" class="form-control input-field" placeholder="请输入电话号码" v-model.trim="phone" />
                </div>
                <div class="col-md-1 search-field search-field_controls">
                    <button class="btn btn-primary search-btn" v-on:click.stop="searchList">搜索</button>
                </div>
                <div class="audio-wrap col-md-2">
                    <audio :src="recordSrc" controls="controls" class="callaudio" autoplay>
                        Your browser does not support the audio element.
                    </audio>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <table class="table table-bordered table-striped table-sm">
                        <thead>
                            <tr>
                                <th>编号</th>
                                <th>线路</th>
                                <th>通话状态</th>
                                <th>呼入号码</th>
                                <th>拨出号码</th>
                                <th>开始时间</th>
                                <th>通话时长</th>
                                <th>机器人工号</th>
                                <th>人工工号</th>
                                <th>录音</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in recordList" :key="item.id">
                                <td>{{item.Id}}</td>
                                <td>{{item.line}}</td>
                                <td>{{item.callState}}</td>
                                <td>{{item.inCall}}</td>
                                <td>{{item.outCall}}</td>
                                <td>{{item.startTime}}</td>
                                <td>{{item.duration}}</td>
                                <td>{{item.robotId}}</td>
                                <td>{{item.manualId}}{{item.recordSrc}}</td>
                                <td>
                                    <a class="i-wrap" @click="listen(item)" style="color: black">
                                        <i class="fa fa-microphone"  v-bind:class="{'text-success': item.recordPlayState }"></i>
                                    </a>
                                </td>
                            </tr>                                          
                        </tbody>
                    </table>
                    <div class="page" v-show="(recordList.length > 0 && totalPageNum > 10)">
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
                    <div class="info" v-show="recordList.length == 0">
                        请根据条件搜索通话记录
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
import { Pagination, DatePicker, Button, Input, Message} from "element-ui";
import axios from 'axios';
import data from "@/../mock/mock-callRecords.json";                             // mock json

/* eslint-disable */
export default {
    data() {
        return {
            startDate: "",
            endDate: "",
            phone: "",
            listenFlag: false,
            recordSrc: "",
            centerDialogVisible: false,
            currentPage: 1,
            pageSize: 10,
            totalPageNum: 1,
            recordList: []
        };
    },
    methods: {
        searchList(currentPage, pageSize) {
            let phone    = this.phone;
            let startDate = this.startDate;
            let endDate   = this.endDate;
            let _this     = this;
            if(!phone && !startDate && !endDate) {
                alert('请填写至少一个搜索条件');
                return;
            }
            axios.post("/api/api/callLog/searchCallRecord", {
                startTime: startDate,
                endTime: endDate,
                phone: phone,
                currentPage: currentPage == undefined ? 1 : currentPage,
                pageSize: pageSize == undefined ? 10 : pageSize
            }).then(function(response) {
                let res = response.data;
                if (res.status == 0) {
                    let data = res.data;
                    data.length == 0 ? _this.$message.success("当前无通话记录") : _this.recordList = data.list;
                    _this.totalPageNum = data.totalPageNum;
                } else {
                    _this.$message.error(res.msg);
                }
            }).catch(function(error) {
                alert(error);
            });
        },
        handleCurrentChange(val) {
            let currentPage = `${val}`;
            let pageSize = this.pageSize;
            this.searchList(currentPage, pageSize);           
        },
        // 录音
        listen(item) {
            console.log(!item.recordPlayState);
            if (!item.recordPlayState) {                                                     // 播放
                this.recordSrc ="http://www.zzbn.cn:8090"+item.recordSrc;
                console.log(this.recordSrc + "-----------------------播放--------------------------");
            } else {                                                                    // 暂停     
                document.getElementsByClassName('callaudio')[0].pause();
                console.log("---------------------暂停=---------------------------------------");
            }
            item.recordPlayState = !item.recordPlayState;
        }
    }
};
</script>

<style lang="scss" scoped>
    .i-wrap {
        padding: 10px;
        cursor: pointer;
        &:hover {
            color: rgba(78 ,189 ,116, .6);
        }
    }
    .callaudio{
        width: 100%;
    }
    .info {
        padding-top: 14px;
        text-align: center;
        color: #666;
    }
</style>
