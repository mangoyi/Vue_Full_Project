<template>
    <div class="animated fadeIn content_page">
        <div class="content-title">
            <div class="title">任务明细</div>
            <router-link class="btn btn-info back" :to="{
                path: '/taskManage/TaskList',
                query: {currentPage: taskCurrentPage}
            }">
            返回
            </router-link>
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
                <div class="col-md-2 search-field yi-tDetailOption">
                    <div style="left: 0px" class="label">选择类别：</div>
                    <el-select v-model="tab" clearable placeholder="请选择标记" size="medium" >
                        <el-option key="A" label="A类别" value="A" ></el-option>
                        <el-option key="B" label="B类别" value="B" ></el-option>
                        <el-option key="C" label="C类别" value="C" ></el-option>
                        <el-option key="D" label="D类别" value="D" ></el-option>
                        <el-option key="E" label="E类别" value="E" ></el-option>
                        <el-option key="F" label="F类别" value="F" ></el-option>
                    </el-select>
                </div>
                <div class="col-md-1 search-field search-field_controls">
                    <button class="btn btn-primary search-btn" v-on:click.stop="searchList(1)">搜索</button>
                </div>
                <!-- <div class="audio-wrap col-md-2">
                    <audio :src="recordSrc" controls="controls" class="callaudio" autoplay>
                        Your browser does not support the audio element.
                    </audio>
                </div> -->
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <table class="table table-bordered table-striped table-sm">
                        <thead>
                            <tr>
                                <th>编号</th>
                                <th>电话号码</th>
                                <th>应答状态</th>
                                <th>开始时间</th>
                                <th>呼叫时长</th>
                                <th>机器人工号</th>
                                <th>人工工号</th>
                                <!-- <th>录音</th> -->
                                <th>操作</th>
                                <th>标记</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in detailList" :key="index">
                                <td>{{index + (currentPage -1)*10}}</td>
                                <td>{{item.phone}}</td>
                                <td>{{item.answerState}}</td>
                                <td>{{item.startTime}}</td>
                                <td>{{item.duration}}</td>
                                <td>{{item.robotId}}</td>
                                <td>{{item.manualId}}</td>
                                <!-- <td>
                                    <a class="i-wrap" @click="listen(item)" style="color: black">
                                        <i class="fa fa-microphone"  v-bind:class="{'text-success': !!item.recordPlayState }"></i>
                                    </a>
                                </td> -->
                                <td>
                                    <!-- <el-button class="btn btn-primary" plain @click="openDialog(item.Id)" >查看聊天对话</el-button> -->
                                    <el-button class="btn btn-primary" plain @click="openDialog(item.additionalInfo, item.id, item.phone, item.recordSrc)" >查看聊天对话</el-button>
                                </td>
                                <td>{{item.flag}}</td>
                            </tr>                                          
                        </tbody>
                    </table>
                    <p style="float: left; margin-top: 10px;" v-show="detailList.length > 0" >
                        <span style="margin-right: 10px;" v-for="(typeItem, index) in typeList" :key="index">
                            <span v-if="typeItem.type == '接通率'">{{typeItem.type}}: {{typeItem.percent}}；</span>
                            <span v-else>{{typeItem.type}}类: {{typeItem.percent}}；</span>
                        </span>
                    </p>
                    <div class="page" v-show="detailList.length > 0">
                        <el-pagination 
                            background 
                            @current-change="searchList"
                            :current-page.sync="currentPage"
                            :page-size="pageSize"
                            layout="total, prev, pager, next"
                            :total="totalRecords"
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
        <el-dialog :title="dialogNumber" :modal-append-to-body="false" :visible.sync="recordDialog" width="44%" center @close="closeRecordDialog">
            <div class="yi-wrap">
                <div class="row mb-4" v-for="(item, index) in recordList" :key="index" v-if="recordList.length > 0">
                    <p v-once>{{item.additionalInfo}}</p>
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
                                <source :src="item.voiceSrc">
                            </audio>
                        </div>
                    </div>
                </div>
            </div>
            
            <div slot="footer" class="dialog-footer" v-if="recordList.length > 0" >
                <!-- <el-button type="primary" @click="recordDialog = false">确 定</el-button> -->
                <div class="dialoginfo_wrap">
                    <span class="info_customer">当前用户: <i>{{dialogCustomer}}</i> , </span>
                    <span class="info_month">账单月份: <i>{{dialogMonth}}</i> ,</span>
                    <span class="info_bill">账单金额: <i>{{dialogBill}}元</i></span>
                </div>
                <audio :src="completeRecordUrl" controls="controls" class="" preload="none">
                    Your browser does not support the audio element.
                </audio>
            </div>

            <p v-if="recordList.length == 0" style="text-align: center; margin-top: 10px;">当前通话无聊天内容</p>
        </el-dialog>
    </div>
</template>

<script>
import { Pagination, DatePicker, Button, Input, Notification, MessageBox} from "element-ui";
import taskDetailSrv from "@/../src/views/services/taskDetail.service.js";           

/* eslint-disable */
export default {
    data() {
        return {
            startDate: "",
            endDate: "",
            number: "",
            recordSrc: "",                                                      // 录音地址
            centerDialogVisible: false,
            recordDialog: false,
            currentPage: 1,
            pageSize: 10,
            totalRecords: 1,
            detailList: [],

            // 聊天内容
            showVoice: false,
            recordList: [],
            dialogNumber: "",
            completeRecordUrl: "",
            tab: '',
            dialogCustomer: "",
            dialogMonth: "",
            dialogBill: "",

            // 任务列表中页数
            taskCurrentPage: 1,

            // typeList
            typeList: []
        };
    },
    beforeRouteEnter: (to, from, next) => {
        next(vm => {
            taskDetailSrv.taskDetail(vm.$route.query.taskId, vm.startDate, vm.endDate, vm.number, vm.currentPage, vm.pageSize, vm.tab).then(resp => {
                let detailData = resp.data.pageInfo;
                vm.detailList = detailData.list;
                vm.totalRecords = detailData.totalRecords;
            }, err => {
                vm.$message.error(err.msg);
            });

            vm.taskCurrentPage = vm.$route.query.currentPage;           // 确保返回到任务列表的时候是当前任务所在页
        
            taskDetailSrv.getTaskTypes(vm.$route.query.taskId).then(resp => {
                vm.typeList = resp.data.list;
                console.log(vm.typeList);
            }, err => {
                this.$message.error(err.msg);
            });
        });
    },
    methods: {
        searchList(currentPage = this.currentPage) {
            taskDetailSrv.taskDetail(this.$route.query.taskId, this.startDate, this.endDate, this.number, currentPage, this.pageSize, this.tab).then(resp => {
                let detailData = resp.data.pageInfo;
                this.detailList = detailData.list;
                this.totalRecords = detailData.totalRecords;
                this.currentPage = currentPage;
            }, err => {
                this.$message.error(err.msg);
            });
        },
        // open 对话
        openDialog(additionalInfo, id, phone, Src) {
            console.log(JSON.parse(additionalInfo));
            let JS_addtional = JSON.parse(additionalInfo);
            this.dialogCustomer = JS_addtional.customer;
            this.dialogMonth = JS_addtional.month;
            this.dialogBill = JS_addtional.bill;

            if (this.recordList.length > 0) {
                this.recordList = [];                                       // 清空上次数据
            }
            this.recordDialog = true;
            this.dialogNumber = "聊天内容 ("+ phone +")";
            this.completeRecordUrl = Src;
            taskDetailSrv.dialog(id).then(resp => {
                let data = resp.data.diaglogTexts;
                console.log(data);
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
            console.log(refIndex);
            console.log(this.$refs[refIndex][0]);
        },
        ended(item) {
            item.imgFlag = false;
        },
        closeRecordDialog() {
            this.recordList = [];
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
        font-size: 12px;
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
    .dialog-footer {
        line-height: 37px;
    }
    .dialog-footer audio {
        vertical-align: middle;
    }
    .dialoginfo_wrap i {
        color: #1985ac;
    }
</style>
