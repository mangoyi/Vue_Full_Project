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
                    <div class="label" style="left:0px;">任务名称：</div>
                    <el-input v-model="input" placeholder="请输入内容"  :disabled="true"></el-input>
                </div>
                <div class="col-md-3">
                    <el-upload
                        class="upload-demo"
                        ref="upload"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :file-list="fileList"
                        :auto-upload="false">
                        <el-button slot="trigger" size="small" type="primary">选取压缩文件</el-button>
                        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </div>
                <div class="col-md-8">
                    <template>
                        <el-transfer v-model="value1" :data="data"></el-transfer>
                    </template>
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

/* eslint-disable */
export default {
    data() {
        const generateData = _ => {
            const data = [];
            for (let i = 1; i <= 15; i++) {
            data.push({
                key: i,
                label: `备选项 ${ i }`,
                disabled: i % 4 === 0
            });
            }
            return data;
        };

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
            fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
            cartList: [],

            data: generateData(),
            value1: [1, 4]
        };
    },
    methods: {
        submitUpload() {
            this.$refs.upload.submit();
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
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
</style>
