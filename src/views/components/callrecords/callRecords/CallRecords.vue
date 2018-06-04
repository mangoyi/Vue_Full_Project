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
                <!-- <div class="col-md-3 search-field">
                    <div class="label" style="left:0px;">模板名称：</div>
                    <el-input v-model="input" placeholder="请输入内容"></el-input>
                </div> -->
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
                    <button class="btn btn-primary search-btn" v-on:click.stop="searchList">搜索</button>
                </div>
                <div class="audio-wrap col-md-2">
                    <audio :src="recordSrc" controls="controls" class="callaudio" autoplay>
                        Your browser does not support the audio element.
                    </audio>
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
                            <tr v-for="item in cartList" :key="item.id">
                                <td>{{item.sequence}}</td>
                                <td>{{item.line}}</td>
                                <td>{{item.callStatus}}</td>
                                <td>{{item.inCall}}</td>
                                <td>{{item.outCall}}</td>
                                <td>{{item.startTime}}</td>
                                <td>{{item.duration}}</td>
                                <td>{{item.RobotId}}</td>
                                <td>{{item.LaborId}}{{item.recordSrc}}</td>
                                <td>
                                    <a class="i-wrap" @click="listen(item)" style="color: black">
                                        <i class="fa fa-microphone"  v-bind:class="{'text-success': item.recordFlag }"></i>
                                    </a>
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
import { Pagination, DatePicker, Button, Input} from "element-ui";
import axios from 'axios';
import data from "@/../mock/mock-callRecords.json";                             // mock json

/* eslint-disable */
export default {
    data() {
        return {
            startDate: "",
            endDate: "",
            number: "",
            // [false, false, false, false, false, false, false, false, false, false],
            listenFlag: false,
            recordSrc: "",
            centerDialogVisible: false,
            currentPage: 1,
            pageSize: 10,
            // input: '',
            cartList: []
        };
    },
    methods: {
        searchList(currentPage, pageSize) {
            let number    = this.number;
            let startDate = this.startDate;
            let endDate   = this.endDate;
            let _this     = this;
            if(!number && !startDate && !endDate) {
                alert('请填写至少一个搜索条件');
                return;
            }
            axios.post("/api/api/callLog/searchCallRecord", {
                currentPage: currentPage == undefined ? 1 : currentPage,
                pageSize: pageSize == undefined ? 10 : pageSize
            }).then(function(response) {
                let res = response.data;
                if (res.status == 0) {
                    let data = res.data.list;
                    if (data.length == 0) {
                        _this.$message.success("当前无通话记录");
                    } else {
                        _this.cartList = data;
                    }
                }
            }).catch(function(error) {
                alert(error);
            });
        },
        handleCurrentChange(val) {
            alert("当前页:"+`${val}`+", 当前页个数:"+this.pageSize )
            let currentPage = `${val}`;
            let pageSize = this.pageSize;
            this.init(currentPage, pageSize);           
        },
        // 录音
        listen(item) {
            if (!item.recordFlag) {                 // 说明是播放
                this.recordSrc = item.recordSrc;
                console.log(this.recordSrc + "-----------------------播放--------------------------");
            } else {
                // 暂停
                document.getElementsByClassName('callaudio')[0].pause();
            }
            item.recordFlag = !item.recordFlag;
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
        // height: 33px;
    }
    .info {
        padding-top: 14px;
        text-align: center;
        color: #666;
    }
</style>
