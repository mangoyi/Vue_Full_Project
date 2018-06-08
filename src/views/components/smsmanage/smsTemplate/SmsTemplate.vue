<template>
    <div class="animated fadeIn content_page">
        <div class="content-title">
            <div class="title">短信模板</div>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="col-md-3 search-field">
                    <div class="label" style="left:0px;">模板内容：</div>
                    <el-input v-model.trim="templateContent" placeholder="请输入内容"></el-input>
                </div>
                <div class="col-md-1 search-field search-field_controls">
                    <button class="btn btn-primary search-btn" @click="searchSmsTemplate(1)">搜索</button>
                </div>
                <div class="col-md-1 search-field search-field_controls">
                    <router-link class="btn btn-success" :to="'/smsmanage/AddSmsTemplate'">
                        新增
                    </router-link>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <table class="table table-bordered table-striped table-sm">
                        <thead>
                            <tr>
                                <th>序列</th>
                                <th>模板ID</th>
                                <th>模板名称</th>
                                <th>模板内容</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in tempList" :key="item.id">
                                <td>{{item.Id}}</td>
                                <td>{{item.smsTempLateId}}</td>
                                <td>{{item.smsTempLateName}}</td>
                                <td>{{item.smsTemplateText}}</td>
                                <td>
                                    <router-link :to="{path: '/smsmanage/updateSmsTemplate',
                                                        query: {smsTempLateId: item.smsTempLateId}}">修改</router-link>
                                    <a @click="Del(item.smsTempLateId)">删除</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="page">
                        <el-pagination background @current-change="searchSmsTemplate" :current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next" :total="totalPageNum">
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog title="提示" :modal-append-to-body="false" :visible.sync="centerDialogVisible" width="20%" center>
            <div class="text-center">
                <span>确定要删除吗?</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirmDel">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { Pagination, DatePicker, Button, Input, Message } from "element-ui";
import axios from 'axios';

import data from "@/../mock/mock-smsTemplate.json";                         // mock json
import searchData from "@/../mock/mock-searchSmsTemplate.json";

import smsTemplateSrv from "@/../src/views/services/smsTemplate.service.js";

/* eslint-disable */
export default {
    data() {
        return {
            centerDialogVisible: false,
            currentPage: 1,
            pageSize: 10,//放在统一的变量中去更改展示的条数
            totalPageNum: 1,
            templateContent: '',
            tempList: [],
            delsmsTemplateId: ''
        };
    },
    // mounted() {
    //     this.init();
    // },
    //这里是页面初始化渲染，使用mouted时候页面有时候会渲染不了的
    beforeRouteEnter: (to, from, next) => {
        next(vm => {
            //这里调sevrices里面定义的方法 需要传刚才的三个参数
            smsTemplateSrv.messageTemplateList(vm.templateContent, vm.currentPage, vm.pageSize).then(resp => {
                console.log(resp) //这里看一下返回值
                vm.tempList = resp.data.list
                vm.totalPageNum = resp.data.totalPageNum
            }, err => {
                vm.$message.error(err.msg) //这个是错误提示用的，element里面的
            })
        })
    },
    methods: {
        //这个方法和上面的beforeRouteEnter基本一样就是上面绑在vm上面，下面是在this上面 
        searchSmsTemplate(currentPage = this.currentPage) {
             smsTemplateSrv.messageTemplateList(this.templateContent, currentPage, this.pageSize).then(resp => {
                this.tempList = resp.data.list
                this.currentPage = currentPage //这里注意一下，需要把当前点击的页数再告诉分页插件让他去显示数据
                this.totalPageNum = resp.data.totalPageNum
            }, err => {
                this.$message.error(err.msg)
            })
        },




        // searchSmsTemplate(currentPage) {
        //     let _this = this;
        //     let templateContent = this.templateContent;
        //     if (!templateContent) {
        //         this.$message.info("请输入搜索的模块内容");
        //         this.init(1, 10);
        //         return;
        //     };
        //     axios.post("/api/api/sms/searchSmsTemplate", {
        //         templateContent: templateContent,
        //         currentPage: currentPage,
        //         pageSize: this.pageSize
        //     }).then((response) => {
        //         let res = response.data;
        //         if (res.status == 0) {
        //             let data = res.data;
        //             _this.tempList = data.list;
        //             _this.totalPageNum = data.totalPageNum;
        //         }

        //     });
        // },
        // handleCurrentChange(val) {
        //     let currentPage = `${val}`;
        //     let pageSize = this.pageSize;
        //     let e = '';
        //     this.templateContent ? this.searchSmsTemplate(e, currentPage, pageSize) : this.init(currentPage, pageSize);
        // },
        // init(currentPage, pageSize) {
        //     let _this = this;
        //     axios.get("/api/api/sms/smsTempList", {                                                     // 短信模板
        //         params: {
        //             currentPage: currentPage == undefined ? 1 : currentPage,
        //             pageSize: pageSize == undefined ? 10 : pageSize
        //         }
        //     }).then(function(response) {
        //         let res = response.data;
        //         if (res.status == 0) {
        //             _this.tempList = res.data.list;
        //             _this.totalPageNum = res.data.totalPageNum;
        //         }
        //     }).catch(function(error) {
        //         alert(error);
        //     });
        // },
        Del(templateId) {
            this.centerDialogVisible = true;
            this.delsmsTemplateId = templateId;
        },
        confirmDel() {
            this.centerDialogVisible = false;
            axios.post("/api//api/sms/delSmsTemplate", {
                smsTemplateId: this.delsmsTemplateId
            }).then((response) => {
                let res = response.data;
                console.log("删除成功!");
                this.$message.success("删除成功！");
            }).catch((error) => {
                this.$message.error("删除失败，请重试!");
            });
        }
    }
};
</script>

<style lang="scss" scoped>

</style>
