<template>
    <div class="animated fadeIn content_page">
        <div class="content-title">
            <div class="title">任务发布</div>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="search-field">
                    <div class="label" style="left:0px;top: 4px;">任务名称：</div>
                    <el-input v-model.trim="taskName" placeholder="请输入内容" ></el-input>
                </div>
                <div class="col-md-12 search-field">
                    <div class="label" style="left:0px;top: 24px;">选择文件：</div>
                    <div class="upload-wrap">
                        <el-upload
                            class="upload-file"
                            ref="upload"
                            :before-upload = "beforeZipUpload"
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
                                end: '20:00',
                                minTime: startTime2                                
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
                    <el-button type="primary" class="col-md-2" @click="confirmCreate">确认创建</el-button>
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
import { Pagination, DatePicker, Button, Input, Loading, TimePicker} from "element-ui";
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

            // 机器人工作时间段
            startTime1: '',
            endTime1: '',
            startTime2: '',
            endTime2: ''
        };
    },
    beforeRouteEnter: (to, from, next) => {
        next(vm => {
            taskSrv.getRobot().then(resp => {
                let data = resp.data.list;
                data.forEach((item, index) => {
                    vm.transferData.push(
                        (function() {
                            // if ( item.robotState == 1) {                                           // 机器人在工作 所以不能选择
                            //     return {
                            //         key: index,
                            //         label: item.raccount + "("+item.rname+")",
                            //         disabled: true
                            //     }
                            // }
                            return {
                                key: index,                                                         // 自增, 所有机器人(空闲机器人)
                                label: item.raccount + "(" + item.rname + ")",
                                disabled: false
                            }
                        })()
                    );
                });
            });

            taskSrv.getManual().then(resp => {
                let data = resp.data.list;
                data.forEach((item, index) => {
                    vm.transferData1.push(
                        (function() {
                            // if ( item.manualState == 1) {                                           // 员工在工作，所以不能选择
                            //     return {
                            //         key: index,
                            //         label: item.maccount + "(" + item.mname +")",
                            //         disabled: true
                            //     }
                            // } 
                            return {
                                key: index,                                                         // 自增, 所有员工(空闲员工)
                                label: item.maccount + "("+ item.mname +")",
                                disabled: false
                            }
                        })()
                    );
                });
            });
        });
    },
    methods: {
        beforeZipUpload(file){
            const testmsg=file.name.substring(file.name.lastIndexOf('.')+1);  
            const extention = testmsg === 'zip';
            const isLt4M = file.size / 1024 / 1024 < 4;
            if (!extention) {
                this.$confirm('上传文件只能是zip格式,请移除并重新选择', '提示', {
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
                this.$confirm('上传文件不能超过4MB,请移除并重新选择', '提示', {
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
            let fileType = this.beforeZipUpload(file);                  // 判断上传格式和大小
            // let obj = {
            //     name: name,
            //     file
            // }
            if (fileType) {                                                // 文件格式和大小都符合要求
                this.formfile = file;
            }
        },
        handleRemove(file, fileList) {
            this.formfile.raw = '';
            this.$message.success("已成功移除了" + file.name + "文件");
        },
        handleLimit(file, fileList) {                                                   // 超出文件个数的钩子
            this.$message.warning('只能上传单个zip文件！');
        },
        confirmCreate() {                                                           // 创建任务
            let loading = {};
            let taskName = this.taskName;                                             // 任务名称
              
            let publisher = window.sessionStorage.getItem("username");                // 发布者

            // 外呼时间段
            let startTime1 = this.startTime1;
            let endTime1 = this.endTime1;
            let startTime2 = this.startTime2;
            let endTime2 = this.endTime2;

            let robotSeat = [];                                                     // 机器人坐席
            this.checkedTransferData.forEach(item => {
                robotSeat.push(this.transferData[item].label);
            });

            // 拆分
            // let robotSeat = temrobotSeat.map((item) => {
            //     return item.substring(0,4);
            // });



            let manualSeat = [];                                                     // 员工坐席
            this.checkedTransferData1.forEach(item => {
                manualSeat.push(this.transferData1[item].label);
            });

            // 拆分
            // let manualSeat = temmanualSeat.map((item) => {
            //     return item.substring(0, 4);
            // });

            let formData = new FormData();
            // 多个文件就要采用这样的遍历方式
            // for(let key in this.formfile) {
            //     formData.append(key, this.formfile);
            // }
            formData.append("file", this.formfile.raw);                              // 单文件formdata
            let obj = {
                taskName: taskName,
                publisher: publisher,
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

            if ( startTime1 && endTime1 && startTime2 && endTime2 && taskName && !!this.formfile.raw && robotSeat.length > 0) {
                loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.5)'
                });
                taskSrv.taskRelease(formData).then(resp => {
                    loading.close();
                    this.$message.success("任务创建成功！");
                    this.$router.push("/taskManage/TaskList");
                }, err => {
                    loading.close();
                    this.$message.error(err.msg);
                })
            } else {
                this.$message.error("请填写所有内容！");
            }
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

    .yi_placeholder_start .el-date-editor input {
        // todoes
    }
    
</style>
