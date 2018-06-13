<template>
    <div class="animated fadeIn content_page">
        <div class="content-title">
            <div class="title">任务明细</div>
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
                    <input type="text" class="form-control input-field" placeholder="请输入电话号码" v-model.trim="number" />
                </div>
                <div class="col-md-1 search-field search-field_controls">
                    <button class="btn btn-primary search-btn" v-on:click.stop="searchList(1)">搜索</button>
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
                                <th>电话号码</th>
                                <th>开始时间</th>
                                <th>呼叫时长</th>
                                <th>机器人工号</th>
                                <th>人工工号</th>
                                <th>录音</th>
                                <th>操作</th>
                                <th>标记</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in detailList" :key="item.id">
                                <td>{{item.Id}}</td>
                                <td>{{item.phone}}</td>
                                <td>{{item.startTime}}</td>
                                <td>{{item.duration}}</td>
                                <td>{{item.robotId}}</td>
                                <td>{{item.manualId}}</td>
                                <td>
                                    <a class="i-wrap" @click="listen(item)" style="color: black">
                                        <i class="fa fa-microphone"  v-bind:class="{'text-success': !!item.recordPlayState }"></i>
                                    </a>
                                </td>
                                <td>
                                    <!-- <el-button class="btn btn-primary" plain @click="openDialog(item.Id)" >查看聊天对话</el-button> -->
                                    <el-button class="btn btn-primary" plain @click="openDialog(item.Id)" >查看聊天对话</el-button>
                                </td>
                                <td>{{item.flag}}</td>
                            </tr>                                          
                        </tbody>
                    </table>
                    <div class="page" v-show="detailList.length > 0">
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
                    <div class="info" v-show="detailList.length == 0">
                        请根据条件搜索记录
                    </div>
                </div>
            </div>
        </div>

        <!-- 提示 -->
        <el-dialog title="提示" :modal-append-to-body="false" :visible.sync="centerDialogVisible" width="20%" center>
            <div class="text-center">
                <span>确定要取消吗?</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 聊天对话 -->
        <el-dialog title="聊天内容" :modal-append-to-body="false" :visible.sync="recordDialog" width="40%" center>
            <div class="yi-wrap">
                <div class="row mb-4" v-for="(item, index) in recordList" :key="index">
                    <div class="say" v-if="item.infoType == 'R'">
                        <span class="g-time">{{item.startTime}}</span>
                        <div class="say-text common-text">{{item.sayText}}<span style="padding-left: 12px;font-size: 12px;color: #38F;">"匹配规则:"{{item.mathRule}}</span></div>
                    </div>
                    <div class="replay" v-if="item.infoType == 'M'">
                        <span class="g-time replay-time">{{item.startTime}}</span>
                        <div class="replay-content common-text" @click="playVoice(`audio_${index}`, item)">
                            <img src="../../../../../static/img/voice.png" alt="error" :class="{voice: item.imgFlag}" :ref="`img_${index}`">
                            <span class="replay-text">{{item.sayText}}</span>    
                            <audio preload="none" class="wav" :ref="`audio_${index}`" @ended="ended(item)">
                                <source :src="'http://www.zzbn.cn:8090'+item.voiceSrc">
                            </audio>
                            <!-- <audio id="audioPlay" :src="isPlay" @canplay="playing()" @ended="ended()" v-el:audio> </audio> -->
                        </div>
                    </div>
                </div>
            </div>
            
            <span slot="footer" class="dialog-footer">
                <!-- <el-button type="primary" @click="recordDialog = false">确 定</el-button> -->
                    <audio src="http://global.res.btows.com/monitor/2018/05/12/force-13927784678-705-20180512-183058-1526121058.102223_2.wav" controls="controls" class="" preload="none">
                        Your browser does not support the audio element.
                    </audio>
            </span>
        </el-dialog>



    </div>
</template>

<script>
import { Pagination, DatePicker, Button, Input, Notification, MessageBox} from "element-ui";
import axios from 'axios';
import data from "@/../mock/mock-taskDetails.json";                             // mock json
// import chatdata from "@/../mock/mock-chatDialog.json";                          // mock json
import taskDetailSrv from "@/../src/views/services/taskDetail.service.js";           


/* eslint-disable */
export default {
    data() {
        return {
            startDate: "",
            endDate: "",
            number: "",
            // listenFlag: false,
            recordSrc: "",                                                      // 录音地址
            centerDialogVisible: false,
            recordDialog: false,
            currentPage: 1,
            pageSize: 10,
            totalPageNum: 1,
            detailList: [],
            // dialog: ""

            // 聊天内容
            showVoice: false,
            recordList: []
        };
    },
    // mounted() {
    //     this.init();
    // },
    beforeRouteEnter: (to, from, next) => {
        next(vm => {
            taskDetailSrv.taskDetail(vm.$route.query.taskId, vm.startDate, vm.endDate, vm.number, vm.currentPage, vm.pageSize).then(resp => {
                vm.detailList = resp.data.list;
                vm.totalPageNum = resp.data.totalPageNum;
            }, err => {
                vm.$message.error(err.msg);
            });

        })
    },
    methods: {
        searchList(currentPage = this.currentPage) {
            taskDetailSrv.taskDetail(this.$route.query.taskId, this.startDate, this.endDate, this.number, currentPage, this.pageSize).then(resp => {
                this.detailList = resp.data.list;
                this.totalPageNum = resp.data.totalPageNum;
                this.currentPage = currentPage;
            }, err => {
                this.$message.error(err.msg);
            });

        },

        // 录音
        listen(item) {
            if (!item.recordPlayState) {                                                // 说明是播放
                this.recordSrc = "http://www.zzbn.cn:8090"+item.recordSrc;
                console.log(this.recordSrc + "-----------------------播放--------------------------");
            } else {
                // 暂停
                document.getElementsByClassName('callaudio')[0].pause();
            }
            item.recordPlayState = !item.recordPlayState;
            console.log(item.recordPlayState);
        },

        // open 对话
        openDialog(id) {
            this.recordDialog = true;
            taskDetailSrv.dialog("1").then(resp => {
                let data = resp.data.list;
                data.forEach((item) => {
                    item["imgFlag"] = false;
                })
                this.recordList = data;
            }, err => {
                this.$message.error(err.msg);
            })
        },
        playVoice(refIndex, item) {
            item.imgFlag = true;                                // 当前图片动画
            this.$refs[refIndex][0].play();                     // 当前录音播放
        },
        ended(item) {
            item.imgFlag = false;
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
    .table tr:hover>td {
        background-color: #f5f7fa;
    }
    .table tr td {
        transition: background-color .25s ease;
    }
    .el-notification__group .left {
        background: salmon;
    }
    .right {
        background: rebeccapurple;
    }
    
    // 聊天窗口
    .yi-wrap {
        padding: 10px 15px 0 15px;
        margin-top: -15px;
        border-top: 1px solid #ccc;
        max-height: 60vh;
        overflow: auto;
    }
    .say {
        position: relative;
        margin-top: 20px;
        margin-bottom: 20px;
        width:100%;
    }
    .replay {
        position: relative;
        width: 100%;
        margin-top: 20px;
    }
    .common-text {
        max-width: 580px;
        padding: 6px;
        border: 1px solid #d9d9d9;
        border-radius: 8px;
        font-size: 14px;
        line-height: 20px;
        color: #333;
    }
    .replay-content {
        float: right;
        margin-right: 10px;
        word-break: break-all;
        background: #9fe658;
        cursor: pointer;
    }
    .replay-time{
        position: absolute;
        right: 14px;
        top: -20px;
    }

    // 录音效果
    @keyframes onceVoiceAnimation {
        0% {
            opacity: 1;
        } 50% {
            opacity: 0;
        } 100% {
            opacity: 1;
        }
    }

    .voice {
        animation: onceVoiceAnimation 1.6s ease-in-out infinite;
    }
    .wav {
        height: 0px;
        opacity: 0;
        width: 1px;
    }
</style>
