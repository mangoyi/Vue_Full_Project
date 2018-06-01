<template>
    <div class="animated fadeIn content_page">
        <div class="content-title">
            <div class="title">任务发布</div>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="search-field">
                    <div class="label" style="left:0px;top: 4px;">任务名称：</div>
                    <el-input v-model.trim="input1" placeholder="请输入内容"  :disabled="checkTaskflag"></el-input>
                </div>
                <div class="col-md-12 search-field">
                    <div class="label" style="left:0px;top: 24px;">选择文件：</div>
                    <div class="upload-wrap">
                        <el-upload
                            class="upload-file"
                            ref="upload"
                            action="https://jsonplaceholder.typicode.com/posts/"                                        
                            :before-upload = "beforeAvatarUpload"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :on-change = "handleFileChange"
                            :limit = 1
                            :file-list="fileList"
                            :auto-upload="false">
                            <el-button slot="trigger" size="small" type="primary">选取压缩文件</el-button>
                            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传单个zip文件，且不超过2MB</div>
                        </el-upload>
                    </div>
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
                                @change="handleChange"
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
                            @change="handleChange1"
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
        // const generateData = _ => {
        //     const transferData = [];
        //     for (let i = 1; i <= 15; i++) {
        //         transferData.push({
        //             key: i,
        //             label: `机器人 ${ i }`,
        //             disabled: i % 4 === 0
        //         });
        //     }
        //     console.log(transferData);
        //     return transferData;
        // };

        return {
            checkTaskflag: false,
            startDate: "",
            endDate: "",
            number: "",
            listenFlag: false,
            recordSrc: "",
            centerDialogVisible: false,
            currentPage: 1,
            pageSize: 10,
            input1: '',
            // input2: '',
            fileList: [],       
            cartList: [],

            formData: "",
            formfile: "",

            // transferData: generateData(),
            transferData: [],
            checkedTransferData: [],

            // labor data
            transferData1: [],
            checkedTransferData1: [],

            // selectSmsTemplate: false,
            // templateList: [],
            // radio: '',
            
            pesk: "action"

        };
    },
    mounted() {
        this.checkTaskid();
        this.initRobot();
        this.initLabor();

        this.initsmsTemplate();
    },
    methods: {
        checkTaskid() {
            if(this.$route.query.taskId) {              //  如果存在taskId那么说明是从修改任务过来
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
            let fileType = this.beforeAvatarUpload(file);                  // 判断上传格式和大小并反馈给管理者
            let obj = {
                name: name,
                file
            }
            if (fileType) {                                                // 文件格式和大小都符合要求
                this.formfile = obj;
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
        submitUpload() {
            this.$refs.upload.submit();
        },
        handleRemove(file, fileList) {
            console.log(file, this.fileList);
        },
        handlePreview(file) {
            console.log(file);
        },


        initRobot() {

            // 请求所有机器人
            /*
                axios.post("/home/robotList", {}).then((response) => {
                    let res = response.data;                    // 获取所有机器人
                    if (res.status == 0) {
                        console.log("请求成功");
                    }
                });
            */
            let data = robotList.data.list;                      // 所有机器人
            let thatcheckedTransferData = this.checkedTransferData;

            let _this = this;

            data.forEach((item, index) => {
                this.transferData.push(
                    (function() {
                        console.log(item);
                        if(_this.checkTaskflag){                                                        // 表示url中有taskId,是从修改的入口到此页面
                            console.log("==============================================================================修改任务");
                        
                            if ( item.robotStatus == 1 && item.robotTask != 10001) {                    // 机器人在工作，并且不是在当前这个任务中。 所以不能选择
                                return {
                                    key: index,
                                    label: "" + item.robotId,
                                    disabled: true
                                }
                            } else if ( item.robotStatus == 1 && item.robotTask == 10001) {
                                thatcheckedTransferData.push(index);                                // 机器人在工作，并且在当前这个任务中。所以显示在右侧
                            } 
                            return {
                                key: index,                                                         // 自增, 所有机器人(空闲机器人)
                                label: "" + item.robotId,
                                disabled: false
                            }
                        } else {                                                                    // 表示url中没有taskId,是直接创建任务的入口

                            console.log("==============================================================================创建任务");
                            
                            if ( item.robotStatus == 1) {                                           // 机器人在工作 所以不能选择
                                return {
                                    key: index,
                                    label: "" + item.robotId,
                                    disabled: true
                                }
                            }
                            return {
                                key: index,                                                         // 自增, 所有机器人(空闲机器人)
                                label: "" + item.robotId,
                                disabled: false
                            }
                        
                        }

                    })()
                );
            });
            // console.log("data" + this.transferData);
        },
        handleChange() {
            // 机器人坐席变化时触发的事件  计算变化后的checkedTransferData,  （移除机器人，增加机器人）
            let workRobotList = this.checkedTransferData;
            let workRobotId = [];
            workRobotList.forEach(item => {
                workRobotId.push(Number(this.transferData[item].label));            // 将对应剩下的机器人ID存放到workRobotId数组中
            })

            /*
            axios.post("/home/changetaskRobot/", {
                taskId: 1011,
                workRobot: workRobotId                                              // 将对应剩下的机器人ID传递给后台
            }).then((response) => {
                let res = response.data;
                if(res.status == 0) {
                    console.log("修改成功");
                }
            });
            */

        },

        // labor
        initLabor() {
            // 请求所有员工
            /*
            axios.post("/home/laborList", {}).then((response) => {
                let res = response.data;                        // 获取所有员工
                if (res.status == 0) {
                    console.log("请求成功");
                }
            });
            */
            
            let data = laborList.data.list;                      // 所有员工
            let thatcheckedTransferData = this.checkedTransferData1;

            let _this = this;
            data.forEach((item, index) => {
                this.transferData1.push(
                    (function() {
                        console.log(item);
                        if(_this.checkTaskflag) {
                            console.log("==============================================================================修改任务");
                            if ( item.laborStatus == 1 && item.laborTask != 10001) {                    // 员工在工作，并且不是在当前这个任务中。 所以不能选择
                                return {
                                    key: index,
                                    label: "" + item.laborId,
                                    disabled: true
                                }
                            } else if ( item.laborStatus == 1 && item.laborTask == 10001) {
                                thatcheckedTransferData.push(index);                                // 员工在工作，并且在当前这个任务中。所以显示在右侧
                            } 
                            return {
                                key: index,                                                         // 自增, 所有员工(空闲员工)
                                label: "" + item.laborId,
                                disabled: false
                            }

                        } else {
                            console.log("==============================================================================创建任务");
                            
                            if ( item.laborStatus == 1) {                    // 员工在工作，所以不能选择
                                return {
                                    key: index,
                                    label: "" + item.laborId,
                                    disabled: true
                                }
                            } 
                            return {
                                key: index,                                                         // 自增, 所有员工(空闲员工)
                                label: "" + item.laborId,
                                disabled: false
                            }

                        }
                    })()
                );
            });
            // console.log("data" + this.transferData1);      
        },
        handleChange1() {
            // 员工坐席变化时触发的事件  计算变化后的checkedTransferData1,  （移除员工，增加员工）
            let workLaborList = this.checkedTransferData1;
            let workLaborId = [];
            workLaborList.forEach(item => {
                workLaborId.push(Number(this.transferData1[item].label));            // 将对应剩下的员工ID存放到workLaborId数组中
            })
            workLaborId.forEach(item => {
                console.log(item);
            })

            /*
            axios.post("/home/changetaskLabor/", {
                taskId: 1011,
                workLabor: workLaborId                                              // 将对应剩下的员工ID传递给后台
            }).then((response) => {
                let res = response.data;
                if(res.status == 0) {
                    console.log("修改成功");
                }
            });
            */

        },

        handleCurrentChange() {

        },

        initsmsTemplate() {
            this.templateList = smsTemplate.data.list; 
            console.log(this.templateList+ "-----------------------------------------------");
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
        confirmCreate() {
            // 创建任务
            let taskName = this.input1;                                 // 任务名称
            let robotSeat = this.checkedTransferData;                   // 选择机器人
            let manualSeat = this.checkedTransferData1;                 // 选择员工
            // let smsTemplate = this.input2;                           // 短信模板
            let formData = new FormData();
            
            // 当然如果是多个文件就要采用这样的遍历方式
            // for(let key in this.formfile) {
            //     formData.append(key, this.formfile);
            // }
            formData.append("file", this.formfile.raw);
            let obj = {
                taskName: taskName,
                publisher: "mangoyi",
                robotAccount: robotSeat
            };  
            for(let key in obj){
                formData.append(key, obj);
            };
            if ( !!taskName && !!this.formfile && robotSeat.length > 0 && manualSeat.length > 0 ) {
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
        // height: 33px;
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
