<template>
    <div class="animated fadeIn content_page">
        <div class="content-title">
            <div class="title">通话记录</div>
        </div>
        <div class="content-show">
            <div class="row">
                <div class="audio-wrap col-md-12">
                    <audio :src="recordSrc" controls="controls" class="callaudio" autoplay ref="audio_ref">
                        Your browser does not support the audio element.
                    </audio>
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-3 col-ms-4 search-field">
                    <div style="left:0px" class="label">开始日期：</div>
                    <el-date-picker size="large" v-model="startDate" type="date" placeholder="选择日期时间" value-format="yyyy-MM-dd">
                    </el-date-picker>
                </div>
                <div class="col-md-3 col-ms-4 search-field">
                    <div style="left: 0px" class="label">结束日期：</div>
                    <el-date-picker size="large" v-model="endDate" type="date" placeholder="选择日期时间" value-format="yyyy-MM-dd">
                    </el-date-picker>
                </div>
                <div class="col-md-3 search-field">
                    <div style="left: 0px" class="label">查询号码：</div>
                    <input type="text" class="form-control input-field" placeholder="请输入电话号码" v-model.trim="phone" style="font-size: 12px;"/>
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
                                <th>编号</th>
                                <th>线路</th>
                                <th>通话状态</th>
                                <th>呼入号码</th>
                                <th>拨出号码</th>
                                <th>开始时间</th>
                                <th>通话时长(秒)</th>
                                <th>机器人工号</th>
                                <th>人工工号</th>
                                <th>录音</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in recordList" :key="index">
                                <td>{{index + (currentPage - 1)*10}}</td>
                                <td>{{item.line}}</td>
                                <td>{{item.callState}}</td>
                                <td>{{item.inCall}}</td>
                                <td>{{item.outCall}}</td>
                                <td>{{item.startTime.substring(0, 19).replace("T"," ")}}</td>
                                <td>{{item.duration + 's'}}</td>
                                <td>{{item.robotId}}</td>
                                <td>{{item.manualId}}</td>
                                <td>
                                    <a class="i-wrap" @click="listen(item)" style="color: black">
                                        <i class="fa"  v-bind:class="{'text-success': item.recordPlayState , 'fa-microphone': item.callState === '已接' ? true : false}"></i>
                                    </a>
                                </td>
                            </tr>                                          
                        </tbody>
                    </table>
                    <div class="page" v-show="(recordList.length > 0 && totalRecords > 10)">
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
import { Pagination, DatePicker, Button, Input, Message, Select} from "element-ui";
import callRecordSrv from "@/../src/views/services/callRecord.service.js"

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
            totalRecords: 1,
            recordList: []
        };
    },
    methods: {
        searchList(currentPage = this.currentPage) {
            callRecordSrv.callRecord(this.startDate, this.endDate, this.phone, currentPage, this.pageSize, this.tabValue).then(resp => {
                console.log(resp);
                this.recordList = resp.data.pageInfo.list;
                if (this.recordList.length == 0) {
                    this.$message.success("当前无通话记录");
                } else {
                    this.totalRecords = resp.data.pageInfo.totalRecords;
                    this.currentPage = currentPage;
                    this.recordPlayStateArr = resp.data.pageInfo.list.map((item, index) => {
                        return item.recordPlayState;
                    });
                }

            }, err => {
                this.$message.error(err.msg);
            })
        },

        // 录音
        listen(item) {
            if (!item.recordPlayState) {                                                     // 播放
                this.recordSrc = item.recordSrc;
                console.log(this.recordSrc + "-----------------------播放--------------------------");
                let len = this.recordList.length;
                for(let i=0; i<len; i++) {
                    this.recordList[i].recordPlayState = false;
                }
            } else {                                                                         // 暂停     
                console.log(this.$refs["audio_ref"]);
                this.$refs["audio_ref"].pause();
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
.audio-wrap {
    margin: -10px auto 10px 0;
}
</style>
