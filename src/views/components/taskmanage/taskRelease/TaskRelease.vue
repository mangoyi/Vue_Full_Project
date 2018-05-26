<template>
    <div class="animated fadeIn content_page">
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
                <div class="col-md-3 search-field">
                    <div class="label" style="left:0px;top: 4px;">任务名称：</div>
                    <el-input v-model="input" placeholder="请输入内容"  :disabled="true"></el-input>
                </div>
                <div class="col-md-12 search-field">
                    <div class="label" style="left:0px;top: 24px;">选择文件：</div>
                    
                    <div class="col-md-3 upload-wrap">
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
                    <div class="col-md-5 transfer-wrap">
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
                <div class="col-md-12 search-field">
                    <div class="label" style="left: -11px">人工座席：</div>
                    <div class="col-md-5 transfer-wrap">
                        <el-transfer 
                            v-model="checkedTransferData1" 
                            :data="transferData1"
                            :titles="['所有员工', '工作员工']"
                            :button-texts="['移除', '添加']"
                            @change="handleChange1"
                        ></el-transfer>
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
import { Pagination, DatePicker, Button, Input} from "element-ui";
import axios from 'axios';
import data from "@/../mock/mock-callRecords.json";                             // mock json
import robotList from "@/../mock/mock-robotList.json";                          // mock json
import laborList from "@/../mock/mock-laborList.json";                          // mock json

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
            startDate: "",
            endDate: "",
            number: "",
            // [false, false, false, false, false, false, false, false, false, false],
            listenFlag: false,
            recordSrc: "",
            centerDialogVisible: false,
            currentPage: 1,
            pageSize: 10,
            input: '',
            fileList: [],
            cartList: [],

            // transferData: generateData(),
            transferData: [],
            checkedTransferData: [],

            // labor data
            transferData1: [],
            checkedTransferData1: []
        };
    },
    mounted() {
        this.initRobot();
        this.initLabor();
    },
    methods: {
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
            data.forEach((item, index) => {
                this.transferData.push(
                    (function() {
                        console.log(item);
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
            data.forEach((item, index) => {
                this.transferData1.push(
                    (function() {
                        console.log(item);
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
