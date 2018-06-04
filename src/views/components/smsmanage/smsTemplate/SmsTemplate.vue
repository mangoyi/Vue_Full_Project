<template>
    <div class="animated fadeIn content_page">
        <div class="content-title">
            <div class="title">短信模板</div>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="col-md-3 search-field">
                    <div class="label" style="left:0px;">模板内容：</div>
                    <el-input v-model="input" placeholder="请输入内容"></el-input>
                </div>
                <div class="col-md-1 search-field search-field_controls">
                    <button class="btn btn-primary search-btn" v-on:click.stop="searchSmsTemplate">搜索</button>
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
                            <tr v-for="item in cartList" :key="item.id">
                                <td>{{item.sequence}}</td>
                                <td>{{item.smsTempLateId}}</td>
                                <td>{{item.smsTempLateName}}</td>
                                <td>{{item.smsTemplateText}}</td>
                                <td>
                                    <!-- <router-link :to="{path: '/horse/updateTreatment',       
                                                 query: { disable: 1,}}"> 查看</router-link> -->
                                    <router-link :to="{path: '/smsmanage/updateSmsTemplate',
                                                query: {smsTemplateId: 10001}}">修改</router-link>
                                    <a @click="Del(item.smsTemplateId)">删除</a>
                                </td>
                            </tr>                                          
                        </tbody>
                    </table>
                    <div class="page">
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
import { Pagination, DatePicker, Button, Input} from "element-ui";
import axios from 'axios';

import data from "@/../mock/mock-smsTemplate.json";                         // mock json
import searchData from "@/../mock/mock-searchSmsTemplate.json";
/* eslint-disable */
export default {
    data() {
        return {
            value1:'',
            centerDialogVisible: false,
            currentPage: 1,
            pageSize: 10,
            input: '',
            cartList: [],
            delsmsTemplateId: ''
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        searchSmsTemplate() {
            let _this = this;
            let templateContent = this.input;
            if (templateContent == "") {
                alert("请输入内容");
                return;
            } 
            alert(this.input + "搜索成功");
           
            axios.post("/api/api/sms/searchSmsTemplate", {
                templateContent: "真是银行"
            }).then((response) => {
                let res = response.data;
                this.cartList = res.data.list;
            });
           
            this.cartList = searchData.data.list;
            console.log(this.cartList);
        },
        handleCurrentChange(val) {
            alert("当前页:"+`${val}`+", 当前页个数:"+this.pageSize )
            let currentPage = `${val}`;
            let pageSize = this.pageSize;
            this.init(currentPage, pageSize);           
        },
        init(currentPage, pageSize) {
            let _this = this;
            axios.get("/api/api/sms/smsTempList", {                                                     // 短信模板
                params: {
                    currentPage: currentPage == undefined ? 1 : currentPage,
                    pageSize: pageSize == undefined ? 10 : pageSize
                }
            }).then(function(response) {
                let res = response.data;
                if (res.status == 0) {
                    _this.cartList = res.data.list;    
                }
            }).catch(function(error) {
                alert(error);
            });
        },
        Del(templateId) {
            this.centerDialogVisible = true;
            this.delsmsTemplateId = templateId;
            console.log(this.delsmsTemplateId);
        },
        confirmDel() {
            this.centerDialogVisible = false;

            /* 
            axios.post("/api/home/delSmsTemplate", {
                smsTemplateId: this.delsmsTemplateId
            }).then((response) => {
                let res = response.data;
                console.log("删除成功!");
                this.$message.success("删除成功！");
            });
            */
           this.$message.error("删除失败，请重试!");
        }
    }
};
</script>

<style lang="scss" scoped>

</style>
