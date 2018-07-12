<template>
    <div class="animated fadeIn content_page">
        <div class="content-title">
            <div class="title">任务修改</div>
            <!-- <router-link class="btn btn-info back" :to="{
                path: '/taskManage/TaskList',
                query: {currentPage: currentPage}
            }">
                返回
            </router-link> -->
            <router-link class="btn btn-info back" :to="{
                path: '/taskManage/TaskList'}">
                返回
            </router-link>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="col-md-12 search-field" style="padding-left: 0px;">
                    <div class="yi-remarkWrap"><span class="startTime">开始日期： {{remarkStartTime}}</span><span class="endTime">结束日期： {{remarkEndTime}}</span> <span>任务ID：{{remarkTaskId}}</span></div>
                </div>
                <div class="search-field col-md-12">
                    <!-- <a style="margin-left: 10px; color: rgb(0,192,239)" :href="zipFileUrl" class="yi-zip" >点击下载任务文件>>></a> -->
                    <a style="margin-left: 10px; color: rgb(0,192,239)"  class="yi-zip" @click="downloadFile(taskID)" >点击下载任务文件>>></a>
                </div>
                <div class="search-field">
                    <div class="label" style="left:0px;top: 4px;">任务名称：</div>
                    <el-input v-model.trim="taskName" placeholder="请输入内容"  disabled class="yi-taskName" style="color: #409EFF;"></el-input>
                </div>
                <div class="col-md-12 search-field">
                    <div class="label" style="left:0px;top: 24px;">选择文件：</div>
                    <div class="upload-wrap">
                        <el-upload
                            class="upload-file"
                            ref="upload"
                            :before-upload = "beforeAvatarUpload"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :on-remove="handleRemove"
                            :on-change = "handleFileChange"
                            :limit = 1
                            :on-exceed="handleLimit"
                            :file-list="fileList"
                            :auto-upload="false">
                            <el-button slot="trigger" size="small" type="primary">选取压缩文件</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传单个zip文件，且不超过2MB</div>
                        </el-upload>
                    </div>
                </div>
                <div class="col-md-12 search-field row " style="margin-top: -10px; margin-bottom: 2em;">
                    <div class="label" style="left:14px;top: 5px;">时间段一：</div>
                    <div class="col-md-2 yi_placeholder_start">
                        <el-time-select
                            placeholder="起始时间"
                            v-model="startTime1"
                            :picker-options="{
                                start: '09:00',
                                step: '00:10',
                                end: '20:00'
                            }">
                        </el-time-select>
                    </div>
                    <div class="col-md-2 yi_placeholder_end">
                        <el-time-select
                            placeholder="结束时间"
                            v-model="endTime1"
                            :picker-options="{
                                start: '09:00',
                                step: '00:10',
                                end: '20:00',
                                minTime: startTime1
                            }">
                        </el-time-select>                       
                    </div>
                </div>
                <div class="col-md-12 search-field row " style="margin-top: -10px; margin-bottom: 2em;">
                    <div class="label" style="left:14px;top: 5px;">时间段二：</div>
                    <div class="col-md-2 yi_placeholder_start">
                        <el-time-select
                            placeholder="起始时间"
                            v-model="startTime2"
                            :picker-options="{
                                start: '09:00',
                                step: '00:10',
                                end: '20:00',
                                minTime: endTime1
                            }">
                        </el-time-select>
                    </div>
                    <div class="col-md-2 yi_placeholder_end">
                        <el-time-select
                            placeholder="结束时间"
                            v-model="endTime2"
                            :picker-options="{
                                start: '09:00',
                                step: '00:10',
                                end: '20:00'
                            }">
                        </el-time-select>                       
                    </div>
                </div>
                <div class="col-md-12 search-field" style="margin-bottom: 40px;">
                    <div class="yi-transferWrap yi-transferWrapL">
                        <div class="label" style="left: -88px;">机器人坐席：</div>
                        <div class="transfer-wrap">
                            <template>
                                <el-transfer 
                                    v-model="checkedTransferData" 
                                    :data="transferData"
                                    :titles="['所有机器人', '工作机器人']"
                                    :button-texts="['移除', '添加']"
                                ></el-transfer>
                            </template>                        
                        </div>
                    </div>
                    <div class="yi-transferWrap yi-transferWrapR">
                        <div class="label" style="left: -88px">人工座席：</div>
                        <div class="transfer-wrap">
                            <el-transfer 
                                v-model="checkedTransferData1" 
                                :data="transferData1"
                                :titles="['所有员工', '工作员工']"
                                :button-texts="['移除', '添加']"
                            ></el-transfer>
                        </div>
                    </div>
                </div>
                <div class="col-md-12 search-field">
                    <el-button type="primary" class="col-md-2" @click="confirmUpdate">确认修改</el-button>
                </div>
            </div>
        </div>

        <el-dialog title="提示" :modal-append-to-body="false" :visible.sync="centerDialogVisible" width="20%" center>
            <div class="text-center">
                <span>确定要取消吗?</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
import { Pagination, DatePicker, Button, Input, Message, Loading} from "element-ui";
import taskSrv from "@/../src/views/services/task.service.js";

/* eslint-disable */
export default {
    data() {
        return {
            centerDialogVisible: false,
            taskName: '',
            fileList: [],       
            formfile: "",

            transferData: [],                                   // 所有机器人坐席
            checkedTransferData: [],                            // 工作的机器人坐席

            // labor data
            transferData1: [],                                  // 所有的员工坐席
            checkedTransferData1: [],                           // 工作的员工坐席

            // 服务器地址
            // zipFileUrl: "",

            // 任务ID
            taskID: '',

            // 在任务列表中的页数
            // currentPage: 1,

            // 备注信息
            remarkStartTime: '',
            remarkEndTime: '',
            remarkTaskId: '',
            
            // 时间段
            startTime1: '',
            endTime1: '',
            startTime2: '',
            endTime2: ''
        };
    },
    beforeRouteEnter: (to, from, next) => {
        next(vm => {
            let currentTaskId = vm.$route.query.taskId;
            
            taskSrv.getCurrentRobot(currentTaskId).then(resp => {
                let data = resp.data.list;
                let thatcheckedTransferData = [];
                data.forEach((item, index) => {
                    vm.transferData.push(
                        (function() {
                            if ( item.robotState == 1 && item.taskId == currentTaskId) {
                                thatcheckedTransferData.push(index);                                            // 机器人在工作，并且在当前这个任务中。所以显示在右侧
                            } 
                            return {
                                key: index,                                                                     // 自增, 所有机器人(空闲机器人)
                                label: item.raccount + "("+item.rname+")",
                                disabled: false
                            }
                        })()
                    );
                });
                vm.checkedTransferData = thatcheckedTransferData;
                console.log(thatcheckedTransferData);
            }, err => {
                vm.$message.error(err.msg);
            });

            taskSrv.getManual(currentTaskId).then(resp => {
                let data = resp.data.list;
                let thatcheckedTransferData1 = [];
                data.forEach((item, index) => {
                    vm.transferData1.push(
                        (function() {
                            if ( item.manualState == 1 && item.taskId != currentTaskId) {                    // 员工在工作，并且不是在当前这个任务中。 所以不能选择
                                return {
                                    key: index,
                                    label: item.Maccount + "("+item.Mname+")",
                                    disabled: true
                                }
                            } else if ( item.manualState == 1 && item.taskId == currentTaskId) {
                                thatcheckedTransferData1.push(index);                                                    // 员工在工作，并且在当前这个任务中。所以显示在右侧
                            } 
                            return {
                                key: index,                                                                              // 自增, 所有员工(空闲员工)
                                label: item.Maccount + "("+item.Mname+")",
                                disabled: false
                            }
                        })()
                    );
                });
                vm.checkedTransferData1 = thatcheckedTransferData1;
            }, err => {
                vm.$message.error(err.msg);
            });

            taskSrv.getZip(currentTaskId).then(resp => {
                let data = resp.data.task;
                // vm.zipFileUrl = data.zipSrc;
                // console.log(vm.zipFileUrl);
                vm.taskID = data.taskID;

                vm.taskName = data.taskName;     // 任务名称
                vm.remarkStartTime = data.startTime;
                vm.remarkEndTime = data.endTime;
                vm.remarkTaskId = data.taskID;

                let executeTime = data.taskExecuteTime;
                vm.startTime1 = executeTime.startTime1;
                vm.endTime1 = executeTime.endTime1;
                vm.startTime2 = executeTime.startTime2;
                vm.endTime2 = executeTime.endTime2;

            }, err => {
                vm.$message.error(err.msg);
            });

            // vm.currentPage = vm.$route.query.currentPage;                    
        });
    },
    methods: {
        beforeAvatarUpload(file){
            const testmsg=file.name.substring(file.name.lastIndexOf('.')+1);  
            const extention = testmsg === 'zip';
            const isLt4M = file.size / 1024 / 1024 < 4;
            if (!extention) {
                this.$confirm('上传文件只能是zip格式,请重新选择', '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$message({
                            type: 'warning',
                            message: `action: ${ action }`
                        });
                    }
                });
            }
            if (!isLt4M) {
                this.$confirm('上传文件不能超过4MB,请重新选择', '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$message({
                            type: 'warning',
                            message: `action: ${ action }`
                        });
                    }
                });
            }
            return extention && isLt4M;
        },
        handleFileChange(file) {
            this.formfile = ""; 
            let fileType = this.beforeAvatarUpload(file);                  // 判断上传格式和大小
            // let obj = {
            //     name: name,
            //     file
            // }
            if (fileType) {                                                // 文件格式和大小都符合要求
                this.formfile = file;
            }
        },
        handleRemove(file, fileList) {
            this.$message.success("已成功移除了" + file.name + "文件");
        },
        handleLimit(file, fileList) {                                                   // 超出文件个数的钩子
            this.$message.warning('只能上传单个zip文件！');
        },
        confirmUpdate() {            
            let loading = {};                                              
            let taskId = this.$route.query.taskId;                                  // 任务ID
            
            let taskName = this.taskName;                                             // 任务名称
            
            // 外呼时间段
            let startTime1 = this.startTime1;
            let endTime1 = this.endTime1;
            let startTime2 = this.startTime2;
            let endTime2 = this.endTime2;

            let temrobotSeat = [];                                                     // 机器人坐席
            this.checkedTransferData.forEach(item => {
                temrobotSeat.push(this.transferData[item].label);
            });

            let robotSeat = temrobotSeat.map((item) => {
                return item.substring(0, 4);
            });

            let temmanualSeat = [];                                                     // 员工坐席
            this.checkedTransferData1.forEach(item => {
                temmanualSeat.push(this.transferData1[item].label);
            });

            let manualSeat = temmanualSeat.map((item) => {
                return item.substring(0, 4);
            })

            let formData = new FormData();
            // 多个文件就要采用这样的遍历方式
            // for(let key in this.formfile) {
            //     formData.append(key, this.formfile);
            // }
            formData.append("file", this.formfile.raw);                              // 单文件formdata
            let obj = {
                taskId: taskId,                                                     
                taskName: taskName,
                publisher: "mangoyi",
                robotSeat: robotSeat,
                manualSeat: manualSeat,
                startTime1: startTime1,
                endTime1: endTime1,
                startTime2: startTime2,
                endTime2: endTime2
            };  
            for(let key in obj){
                formData.append(key, obj[key]);
            };
            
            if ( !!this.formfile || robotSeat.length > 0 || manualSeat.length > 0) {                // zip文件/机器人坐席/人工座席 存在一个即可
                loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.5)'
                });
                taskSrv.updateTask(formData).then(resp => {
                    loading.close();
                    this.$message.success("任务修改成功");
                    // this.$router.push({path: "/taskManage/TaskList", query:{currentPage: this.$route.query.currentPage}});          // 跳回任务列表所在当前页
                    this.$router.push({path: "/taskManage/TaskList"});          // 跳回任务列表所在当前页                    
                }, err => {
                    loading.close();
                    this.$message.error(err.msg);
                });

            } else {
                this.$message.error("请填写所有内容！");
            }
        },
        downloadFile(taskID) {
            console.log(taskID);
            taskSrv.downloadFile(taskID).then(resp => {
                console.log(".......................................下载文件...................");
                this.download(resp);
            }, err => { 
                this.$message.error(err.msg);
            })
        },

        // download下载文件方法
        download(data) {
            if (!data) {
                return;
            }
            let url = window.URL.createObjectURL(new Blob([data]));
            let link = document.createElement('a');
            link.style.display = "none";
            link.href = url;
            link.setAttribute("download", this.taskID + ".zip");
            document.body.appendChild(link);
            link.click();
        }
    },
    beforeRouteLeave(to, from, next) {
        // 设置下一个路由的meta
        to.meta.keepAlive = true;   // 跳转到下一个路由不刷新        
        console.log("。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。taskList Live");
        next();
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
    
    .upload-wrap {
        margin-top: 20px;
        margin-bottom: 20px;
        padding-left: 0px;
    }
    .transfer-wrap {
        padding-left: 0px;
    }
    .yi-transferWrap {
        position: relative;
        float: left;
    }
    .yi-transferWrapL{
        margin-right: 130px;
        margin-bottom: 20px;
    }

    .yi-remarkWrap {
        float: right;
        font-size: 12px;
    }
    .endTime {
        margin: 0 15px;
    }
    .yi-zip {
        float: right;
        cursor: pointer;
    }
</style>
