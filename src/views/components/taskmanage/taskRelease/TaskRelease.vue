<template>
    <div class="animated fadeIn content_page">
        <svg style="position: absolute; width: 0; height: 0; overflow: hidden;" version="1.1"
             xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <defs>
                <symbol id="icon-add" viewBox="0 0 32 32">
                    <title>add2</title>
                    <path class="path1"
                          d="M15 17h-13.664c-0.554 0-1.002-0.446-1.002-1 0-0.552 0.452-1 1.002-1h13.664v-13.664c0-0.554 0.446-1.002 1-1.002 0.552 0 1 0.452 1 1.002v13.664h13.664c0.554 0 1.002 0.446 1.002 1 0 0.552-0.452 1-1.002 1h-13.664v13.664c0 0.554-0.446 1.002-1 1.002-0.552 0-1-0.452-1-1.002v-13.664z"></path>
                </symbol>
                <symbol id="icon-ok" viewBox="0 0 32 32">
                    <title>ok</title>
                    <path class="path1"
                          d="M31.020 0.438c-0.512-0.363-1.135-0.507-1.757-0.406s-1.166 0.435-1.529 0.937l-17.965 24.679-5.753-5.67c-0.445-0.438-1.035-0.679-1.664-0.679s-1.219 0.241-1.664 0.679c-0.917 0.904-0.917 2.375 0 3.279l7.712 7.6c0.438 0.432 1.045 0.681 1.665 0.681l0.195-0.008c0.688-0.057 1.314-0.406 1.717-0.959l19.582-26.9c0.754-1.038 0.512-2.488-0.538-3.233z"></path>
                </symbol>
                <symbol id="icon-edit" viewBox="0 0 32 32">
                    <title>edit</title>
                    <path class="path1"
                          d="M28.287 8.51l-4.805-4.806 0.831-0.831c0.472-0.472 1.086-0.777 1.564-0.777 0.248 0 0.452 0.082 0.622 0.253l3.143 3.144c0.539 0.54 0.133 1.529-0.524 2.186l-0.831 0.831zM26.805 9.992l-1.138 1.138-4.805-4.806 1.138-1.138 4.805 4.806zM24.186 12.612l-14.758 14.762-4.805-4.806 14.758-14.762 4.805 4.806zM7.379 28.288l-4.892 1.224 1.223-4.894 3.669 3.67zM31.123 4.011l-3.143-3.144c-0.567-0.567-1.294-0.867-2.103-0.867-1.036 0-2.174 0.52-3.045 1.391l-20.429 20.436c-0.135 0.134-0.23 0.302-0.276 0.487l-2.095 8.385c-0.089 0.355 0.017 0.736 0.276 0.995 0.198 0.198 0.461 0.307 0.741 0.307 0.085 0 0.171-0.010 0.254-0.031l8.381-2.096c0.185-0.047 0.354-0.142 0.487-0.276l20.43-20.436c1.409-1.41 2.042-3.632 0.524-5.15v0z"></path>
                </symbol>
                <symbol id="icon-del" viewBox="0 0 32 32">
                    <title>delete</title>
                    <path class="path1"
                          d="M11.355 4.129v-2.065h9.29v2.065h-9.29zM6.194 29.935v-23.742h19.613v23.742h-19.613zM30.968 4.129h-8.258v-3.097c0-0.569-0.463-1.032-1.032-1.032h-11.355c-0.569 0-1.032 0.463-1.032 1.032v3.097h-8.258c-0.569 0-1.032 0.463-1.032 1.032s0.463 1.032 1.032 1.032h3.097v24.774c0 0.569 0.463 1.032 1.032 1.032h21.677c0.569 0 1.032-0.463 1.032-1.032v-24.774h3.097c0.569 0 1.032-0.463 1.032-1.032s-0.463-1.032-1.032-1.032v0z"></path>
                    <path class="path2"
                          d="M10.323 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z"></path>
                    <path class="path3"
                          d="M16 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z"></path>
                    <path class="path4"
                          d="M21.677 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z"></path>
                </symbol>
                <symbol id="icon-clock" viewBox="0 0 32 32">
                    <title>clock</title>
                    <path class="path1" fill="#605f5f"
                          d="M16 29c-7.168 0-13-5.831-13-13s5.832-13 13-13c7.168 0 13 5.832 13 13s-5.832 13-13 13zM16 0c-8.822 0-16 7.178-16 16s7.178 16 16 16c8.822 0 16-7.178 16-16s-7.178-16-16-16z"></path>
                    <path class="path2" fill="#605f5f"
                          d="M23.958 21.837l-6.958-6.489v-6.282c0-0.827-0.673-1.5-1.5-1.5s-1.5 0.673-1.5 1.5v6.934c0 0.414 0.174 0.814 0.477 1.098l7.435 6.934c0.279 0.259 0.642 0.402 1.023 0.402 0.415 0 0.814-0.174 1.096-0.477 0.564-0.605 0.532-1.555-0.073-2.12z"></path>
                </symbol>
            </defs>
        </svg>
        <div class="content-title">
            <div class="title">任务发布</div>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <!-- <div class="col-md-3 search-field">
                    <div style="left:0px" class="label">开始日期：</div>
                    <el-date-picker size="large" v-model="startDate" type="date" placeholder="选择日期时间" value-format="yyyy-MM-dd">
                    </el-date-picker>
                </div> -->
                <!-- <div class="col-md-3 search-field">
                    <div class="label" style="left:0px;">模板名称：</div>
                    <el-input v-model="input" placeholder="请输入内容"></el-input>
                </div> -->
                <!-- <div class="col-md-3 search-field">
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
                </div> -->
                <!-- <div class="col-md-1 search-field search-field_controls">
                    <router-link class="btn btn-success" :to="'/message/addModal'">
                        新增
                    </router-link>
                </div> -->
                <div class="search-field">
                    <div class="label" style="left:0px;top: 4px;">任务名称：</div>
                    <el-input v-model="input1" placeholder="请输入内容"  :disabled="checkTaskflag"></el-input>
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
                <div class="search-field" style="margin-bottom: 36px;">
                    <div class="label" style="left:0px;top: 4px;">短信模板：</div>
                    <el-input v-model="input2" placeholder="选择模板"  @focus="selectSmsTemplate=true"  ></el-input>
                    <!-- <button class="btn btn-success" @click="selectSmsTemplate=true">选择模板</button> -->
                </div>
                <div class="col-md-12 search-field">
                    <el-button type="primary" class="col-md-2">确认创建</el-button>
                </div>
            </div>
        </div>

        <el-dialog title="提示" :modal-append-to-body="false" :visible.sync="centerDialogVisible" width="20%" center>
            <div class="text-center">
                <span>确定要取消吗?</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <!-- <el-button @click="centerDialogVisible = false">取 消</el-button> -->
                <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 选择模板 -->
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
            input2: '',
            fileList: [],       
            cartList: [],

            // transferData: generateData(),
            transferData: [],
            checkedTransferData: [],

            // labor data
            transferData1: [],
            checkedTransferData1: [],

            selectSmsTemplate: true,
            templateList: [],
            radio: '',
            
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
            // const isJPG = file.type === 'application/zip';

            const testmsg=file.name.substring(file.name.lastIndexOf('.')+1);  
            const extention = testmsg === 'zip';
            const isLt2M = file.size / 1024 / 1024 < 2;
            console.log(extention);
            if (!extention) {
                this.$message.error('上传文件格式只能是 zip 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传文件不能超过 2MB!');
            }
            return extention && isLt2M;
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
            console.log(file, fileList);
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

        confirmSmsTemplate() {
            this.selectSmsTemplate = false;
            if (!this.radio) {
                alert("请选择模板");
            }else {
                this.input2 = this.radio;
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
