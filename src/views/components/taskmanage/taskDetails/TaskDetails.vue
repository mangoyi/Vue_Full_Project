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
                            <tr v-for="item in cartList" :key="item.id">
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
                                    <el-button class="btn btn-primary" plain @click="openDialog(item.dialogJsonText)" >查看聊天对话</el-button>
                                </td>
                                <td>{{item.flag}}</td>
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
                            :total="totalPage"
                        >
                        </el-pagination>
                    </div>
                    <div class="info" v-show="cartList.length == 0">
                        请根据条件搜索记录
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

        <!-- <el-button
            plain
            @click="open12">
            使用 HTML 片段
        </el-button>     -->
    </div>
</template>

<script>
import { Pagination, DatePicker, Button, Input, Notification} from "element-ui";
import axios from 'axios';
import data from "@/../mock/mock-taskDetails.json";                             // mock json
import chatdata from "@/../mock/mock-chatDialog.json";                          // mock json

/* eslint-disable */
export default {
    data() {
        return {
            startDate: "",
            endDate: "",
            number: "",
            listenFlag: false,
            recordSrc: "",
            centerDialogVisible: false,
            currentPage: 1,
            pageSize: 10,
            totalPage: 1,
            cartList: [],
            dialog: ""
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        searchList() {
            let number    = this.number;
            let startDate = this.startDate;
            let endDate   = this.endDate;
            if(number == false && startDate == false && endDate == false) {
                alert('请填写至少一个搜索条件');
                return;
            }
            // this.cartList = data.data.list;

            /*
            axios.post("/users/setDefault", {
                number     : number,
                startDate  : startDate,
                endDate    : endDate
            }).then((response) => {
                let res = response.data;
                if( res.status == '0') {         // 表示默认地址设置成功
                    console.log("setDefault success");
                    this.init();
                }
            });
            */
        },
        handleCurrentChange(val) {
            alert("当前页:"+`${val}`+", 当前页个数:"+this.pageSize )
            let currentPage = `${val}`;
            let pageSize = this.pageSize;
            this.init(currentPage, pageSize);           
        },
        init(currentPage, pageSize) {
            let taskId = this.$route.query.taskId;
            let _this = this;
            axios.post("/api/api/task/taskDetail", {                                            // 初始化任务明细内容
                taskId: taskId,
                currentPage: currentPage == undefined ? 1 : currentPage,
                pageSize: pageSize == undefined ? 10 : pageSize
            }).then(function(response) {
                let res = response.data;
                if (res.status == 0) {
                    _this.cartList = res.data.list;    
                    _this.totalPage = res.data.totalPageNum;
                }
            }).catch(function(error) {
                alert(error);
            });
        },

        // 录音
        listen(item) {
            if (!item.recordPlayState) {                                                // 说明是播放
                this.recordSrc = item.recordSrc;
                console.log(this.recordSrc + "-----------------------播放--------------------------");
            } else {
                // 暂停
                document.getElementsByClassName('callaudio')[0].pause();
            }
            item.recordPlayState = !item.recordPlayState;
            console.log(item.recordPlayState);
        },

        // open 对话内容
        openDialog(text) {
            // let taskId = item.taskId;
            // let number = item.number;

            // 请求聊天记录数据 chatDialog
            /*
            axios.post('/home/chatDialog', {
                "taskId": taskId,
                "number": number
            }).then(function(response) {
                let res = response.data;
                if(res.status == 0) {
                    console.log("数据请求成功");
                }
            });
            */
            // let data = chatdata.data.list;
            let data = text;
            
            console.log(data);
            let chatDetail = "";
            let chatDetailArr = [];
            data.forEach(item => {
                if(item.infoType == "R") {                                   // 机器人问
                    chatDetail += '<div class="say" style="position: relative;width: 420px;background: #ebebeb;overflow: hidden;"><div class="say_svg common_svg"  style="position: absolute; width: 14px; height: 14px;top: 3px;left: 0px;"><svg viewBox="0 0 120 180" id="trigon-left" width="100%" height="100%" ><path fill="#fff" d="M104.555,178.368l-1.313-1.013l-97.863-76.5C2.064,98.269,0,94.387,0,90.056c0-4.332,2.126-8.212,5.378-10.8l97.676-76.443l1.626-1.294C106.243,0.563,108.119,0,110.12,0c5.44,0,9.88,4.162,9.88,9.338l0,0v161.324l0,0c0,5.175-4.439,9.338-9.88,9.338C108.057,180,106.118,179.381,104.555,178.368L104.555,178.368z"></path></svg></div><div class="say_text common_text" style="max-width: 390px;padding: 6px; border: 1px solid #d9d9d9;border-radius: 8px;font-size: 14px;line-height: 18px;color: #333;word-break: break-all;margin-left: 10px; background: #fff;">'+item.speakText+'</div></div>';
                } else if(item.infoType == "M") {                            // 客户回答
                    chatDetail += '<div class="replay" style="position: relative;width: 420px;background: #ebebeb;overflow: auto;"><div class="replay_svg common_svg"  style="position: absolute; width: 14px; height: 14px; right: 0px;top: 3px;"><svg viewBox="0 0 120 180" id="trigon-left" width="100%" height="100%" ><path fill="#9fe658" d="M15.446,1.631l1.313,1.013l97.863,76.5c3.313,2.587,5.378,6.469,5.378,10.8c0,4.332-2.126,8.212-5.378,10.8l-97.676,76.443l-1.626,1.294C13.757,179.438,11.881,180,9.88,180C4.44,180,0,175.838,0,170.662l0,0V9.337l0,0C0,4.163,4.44,0,9.88,0C11.944,0,13.882,0.619,15.446,1.631L15.446,1.631z"></path></svg></div><div class="replay_text common_text" style="max-width: 390px;padding: 6px; border: 1px solid #d9d9d9;border-radius: 8px;font-size: 14px;line-height: 18px;color: #333;word-break: break-all;float: right;margin-right: 10px; background: #9fe658;">'+item.speakText+'</div></div>';
                }
            });
            console.log(chatDetail);               // 聊天的html文件

            this.$notify({
                title: '聊天内容',
                duration: 0,
                dangerouslyUseHTMLString: true,
                message: chatDetail
            });
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

</style>
