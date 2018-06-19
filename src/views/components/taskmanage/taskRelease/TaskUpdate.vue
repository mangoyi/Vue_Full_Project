<template>
    <div class="animated fadeIn content_page">
        <div class="content-title">
            <div class="title">任务修改</div>
            <router-link class="btn btn-info back" :to="{
                path: '/taskManage/TaskList',
                query: {currentPage: currentPage}
            }">
                返回
            </router-link>
        </div>
        <div class="content-show">
            <div class="row list-search">
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
                    <a style="margin-left: 10px; color: rgb(0,192,239)" :href="zipFileUrl" download="tel.txt">点击下载任务文件>>></a>
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
            zipFileUrl: "",

            // 在任务列表中的页数
            currentPage: 1
        };
    },
    beforeRouteEnter: (to, from, next) => {
        next(vm => {
            taskSrv.getRobot().then(resp => {
                let data = resp.data.list;
                let thatcheckedTransferData = [];
                
                data.forEach((item, index) => {
                    vm.transferData.push(
                        (function() {
                            if ( item.robotState == 1 && item.taskId != vm.$route.query.taskId) {                    // 机器人在工作，并且不是在当前这个任务中。 所以不能选择
                                return {
                                    key: index,
                                    label: item.Raccount + "("+item.Rname+")",
                                    disabled: true
                                }
                            } else if ( item.robotState == 1 && item.taskId == vm.$route.query.taskId) {
                                thatcheckedTransferData.push(index);                                            // 机器人在工作，并且在当前这个任务中。所以显示在右侧
                            } 
                            return {
                                key: index,                                                                     // 自增, 所有机器人(空闲机器人)
                                label: item.Raccount + "("+item.Rname+")",
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

            taskSrv.getManual().then(resp => {
                let data = resp.data.list;
                let thatcheckedTransferData = vm.checkedTransferData1;
                data.forEach((item, index) => {
                    vm.transferData1.push(
                        (function() {
                            if ( item.manualState == 1 && item.taskId != vm.$route.query.taskId) {                    // 员工在工作，并且不是在当前这个任务中。 所以不能选择
                                return {
                                    key: index,
                                    label: item.Maccount + "("+item.Mname+")",
                                    disabled: true
                                }
                            } else if ( item.manualState == 1 && item.taskId == vm.$route.query.taskId) {
                                thatcheckedTransferData.push(index);                                                    // 员工在工作，并且在当前这个任务中。所以显示在右侧
                            } 
                            return {
                                key: index,                                                                              // 自增, 所有员工(空闲员工)
                                label: item.Maccount + "("+item.Mname+")",
                                disabled: false
                            }
                        })()
                    );
                });
            }, err => {
                vm.$message.error(err.msg);
            });

            taskSrv.getZip(vm.$route.query.taskId).then(resp => {
                let zipUrl = resp.msg;
                vm.zipFileUrl = zipUrl;
                
                vm.taskName = resp.data.list[0].taskName;
            }, err => {
                vm.$message.error(err.msg);
            });

            vm.currentPage = vm.$route.query.currentPage;                    
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
                manualSeat: manualSeat
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
                    this.$router.push({path: "/taskManage/TaskList", query:{currentPage: this.$route.query.currentPage}});          // 跳回任务列表所在当前页
                }, err => {
                    loading.close();
                    this.$message.error(err.msg);
                });

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
</style>
