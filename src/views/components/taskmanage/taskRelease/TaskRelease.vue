<template>
    <div class="animated fadeIn content_page">
        <div class="content-title">
            <div class="title">任务发布</div>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="search-field">
                    <div class="label" style="left:0px;top: 4px;">任务名称：</div>
                    <el-input v-model.trim="taskName" placeholder="请输入内容"  :disabled="checkTaskflag"></el-input>
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
                    <a style="margin-left: 10px; color: rgb(0,192,239)" :href="Url" download="tel.txt" v-if="checkTaskflag">点击下载文件>>></a>
                </div>
                <div class="col-md-12 search-field" style="margin-bottom: 40px;">
                    <div class="label" style="left: -11px;">机器人坐席：</div>
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
                <div class="col-md-12 search-field" style="margin-bottom: 40px;">
                    <div class="label" style="left: -11px">人工座席：</div>
                    <div class="transfer-wrap">
                        <el-transfer 
                            v-model="checkedTransferData1" 
                            :data="transferData1"
                            :titles="['所有员工', '工作员工']"
                            :button-texts="['移除', '添加']"
                        ></el-transfer>
                    </div>
                </div>
                
                <!-- <div class="search-field" style="margin-bottom: 36px;">
                    <div class="label" style="left:0px;top: 4px;">短信模板：</div>
                    <el-input v-model="input2" placeholder="选择模板"  @focus="selectSmsTemplate=true"  ></el-input>
                </div> -->
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

        <!-- 选择模板 -->
        <!--
        <el-dialog title="选择模板" :modal-append-to-body="false" :visible.sync="selectSmsTemplate" width="60%" center>
            <div class="row mb-6">
                <div class="col-lg-12">
                    <table class="table table-bordered table-striped table-sm">
                        <thead>
                            <tr>
                                <th>选择</th>
                                <th>序列</th>
                                <th>模板ID</th>
                                <th>模板名称</th>
                                <th>模板内容</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in templateList" :key="item.id">
                                <td>
                                    <el-radio v-model="radio" :label="item.smsTemplateId" ></el-radio>
                                </td>
                                <td>{{item.sequence}}</td>
                                <td>{{item.smsTemplateId}}</td>
                                <td>{{item.smsTemplateName}}</td>
                                <td>{{item.smsTemplateText}}</td>
                            </tr>                                          
                        </tbody>
                    </table>
                    <div class="page" style="float: right;maring-top: 20px;">
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
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="confirmSmsTemplate">确 定</el-button>
            </span>
        </el-dialog>
        -->

    </div>
</template>

<script>
import { Pagination, DatePicker, Button, Input} from "element-ui";
import axios from 'axios';
import data from "@/../mock/mock-callRecords.json";                             // mock json
import robotList from "@/../mock/mock-robotList.json";                          // mock json
import laborList from "@/../mock/mock-laborList.json";                          // mock json
import smsTemplate from "@/../mock/mock-smsTemplate.json";                     // mock json

/* eslint-disable */
export default {
    data() {
        return {
            checkTaskflag: false,                                // 默认创建任务
            centerDialogVisible: false,
            // currentPage: 1,
            // pageSize: 10,
            taskName: '',
            fileList: [],       
            formfile: "",

            transferData: [],                                   // 所有机器人坐席
            checkedTransferData: [],                            // 工作的机器人坐席

            // labor data
            transferData1: [],                                  // 所有的员工坐席
            checkedTransferData1: [],                           // 工作的员工坐席

            // selectSmsTemplate: false,
            // templateList: [],
            // radio: '',

            // 服务器地址
            Url: "http://www.baidu.com"
        };
    },
    mounted() {
        this.checkTaskid();
        this.initRobot();
        this.initLabor();
    },
    methods: {
        checkTaskid() {
            if(this.$route.query.taskId) {              //  如果存在taskId那么说明是修改任务
                this.checkTaskflag = true;
            }

            // 初始化当前任务已上传的zip文件
            this.initZipfile();
        },
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
        initZipfile() {
            if (this.checkTaskflag) {
                this.fileList.push({
                    name: "something.zip",
                    url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
                });

                // 初始化 当前任务zip文件
                /*
                    axios.post('/home/taskZipfile', {
                        taskId: "10001"
                    }).then((response) => {
                        let res = response.data;
                        console.log('获取压缩文件成功');
                    });
                */

            }
        },
        handleRemove(file, fileList) {
            this.$message.success("已成功移除了" + file.name + "文件");
        },
        handleLimit(file, fileList) {                                                   // 超出文件个数的钩子
            this.$message.warning('只能上传单个zip文件！');
        },

        initRobot() {
            let data = "";

            // let data = robotList.data.list;                      // 所有机器人
            let thatcheckedTransferData = this.checkedTransferData;

            let _this = this;
            // 请求所有机器人

            axios.post("/api/api/account/getFreeRobotList",{}).then((response) => {
                let res = response.data;
                if (res.status == 0) {
                    data = res.data.list;
                    data.forEach((item, index) => {
                        this.transferData.push(
                            (function() {
                                console.log(item);
                                if(_this.checkTaskflag){                                                        // 表示url中有taskId,是从修改的入口到此页面
                                    console.log("==============================================================================修改任务");
                                
                                    if ( item.robotState == 1 && item.robotTask != 10001) {                    // 机器人在工作，并且不是在当前这个任务中。 所以不能选择
                                        return {
                                            key: index,
                                            label: "" + item.Raccount,
                                            disabled: true
                                        }
                                    } else if ( item.robotState == 1 && item.robotTask == 10001) {
                                        thatcheckedTransferData.push(index);                                // 机器人在工作，并且在当前这个任务中。所以显示在右侧
                                    } 
                                    return {
                                        key: index,                                                         // 自增, 所有机器人(空闲机器人)
                                        label: item.Raccount ,
                                        disabled: false
                                    }
                                } else {                                                                    // 表示url中没有taskId,是直接创建任务的入口

                                    console.log("==============================================================================创建任务");
                                    
                                    if ( item.robotState == 1) {                                           // 机器人在工作 所以不能选择
                                        return {
                                            key: index,
                                            label: item.Raccount,
                                            disabled: true
                                        }
                                    }
                                    return {
                                        key: index,                                                         // 自增, 所有机器人(空闲机器人)
                                        label: item.Raccount,
                                        disabled: false
                                    }
                                
                                }

                            })()
                        );
                    });
                }
            });
        },

        // labor
        initLabor() {
            // 员工坐席
            let _this = this;
            let thatcheckedTransferData = this.checkedTransferData1;

            axios.post("/api/api/account/getFreeManualList",{}).then((response) => {
                let res = response.data;
                if (res.status == 0) {
                    let data = res.data.list;
                    console.log(data);
                    data.forEach((item, index) => {
                        this.transferData1.push(
                            (function() {
                                console.log(item);
                                if(_this.checkTaskflag) {
                                    console.log("==============================================================================修改任务");
                                    if ( item.manualState == 1 && item.taskId != 10001) {                    // 员工在工作，并且不是在当前这个任务中。 所以不能选择
                                        return {
                                            key: index,
                                            label: item.Maccount,
                                            disabled: true
                                        }
                                    } else if ( item.manualState == 1 && item.taskId == 10001) {
                                        thatcheckedTransferData.push(index);                                // 员工在工作，并且在当前这个任务中。所以显示在右侧
                                    } 
                                    return {
                                        key: index,                                                         // 自增, 所有员工(空闲员工)
                                        label: item.Maccount,
                                        disabled: false
                                    }

                                } else {
                                    console.log("==============================================================================创建任务");
                                    
                                    if ( item.manualState == 1) {                                           // 员工在工作，所以不能选择
                                        return {
                                            key: index,
                                            label: item.Maccount,
                                            disabled: true
                                        }
                                    } 
                                    return {
                                        key: index,                                                         // 自增, 所有员工(空闲员工)
                                        label: item.Maccount + "("+item.manualState+")",
                                        disabled: false
                                    }
                                }
                            })()
                        );
                    });

                }
            });            
             
        },

        /*
        confirmSmsTemplate() {
            this.selectSmsTemplate = false;
            if (!this.radio) {
                alert("请选择模板");
            }else {
                this.input2 = this.radio;
            }
        },
        */
        confirmCreate() {                                                           // 创建任务
            let taskId = this.$route.query.taskId;                                  // 任务ID
            
            let taskName = this.taskName;                                             // 任务名称
              
            let robotSeat = [];                                                     // 机器人坐席
            this.checkedTransferData.forEach(item => {
                robotSeat.push(this.transferData[item].label);
            });

            let manualSeat = [];                                                     // 员工坐席
            this.checkedTransferData1.forEach(item => {
                manualSeat.push(this.transferData1[item].label);
            });

            // let smsTemplate = this.input2;                                        // 短信模板
            let formData = new FormData();
            // 多个文件就要采用这样的遍历方式
            // for(let key in this.formfile) {
            //     formData.append(key, this.formfile);
            // }
            formData.append("file", this.formfile.raw);                              // 单文件formdata
            let obj = {
                taskId: taskId == undefined ? -1 : taskId,                          // 如果是新增任务是-1，如果是修改任务是任务ID
                taskName: taskName,
                publisher: "mangoyi",
                robotSeat: robotSeat,
                manualSeat: manualSeat
            };  
            for(let key in obj){
                formData.append(key, obj[key]);
            };

            if ( !!taskName && !!this.formfile && robotSeat.length > 0 && manualSeat.length > 0) {
                if (!this.checkTaskflag) {                                                          // 新增任务
                    axios({
                        url: "/api/api/task/addNewTask",
                        method: "post",
                        data: formData,
                        headers: {"Content-Type": "multipart/form-data"}
                    }).then((response) => {
                        let res = response.data;
                        if (res.status == 0) {
                            this.$message.success("任务创建成功！");
                        } else if (res.status == 1) {
                            this.$message.error("任务创建失败！请重试")
                        }
                    });
                } else {
                    axios({
                        url: "/api/api/task/updateTask",
                        method: "post",
                        data: formData,
                        headers: {"Content-Type": "multipart/form-data"}
                    }).then((response) => {
                        let res = response.data;
                        if (res.status == 0) {
                            this.$message.success("任务修改成功！");
                        } else if (res.status == 1) {
                            this.$message.error("任务修改失败！请重试")
                        }
                    });
                }
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
</style>
