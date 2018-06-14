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
                            <tr v-for="(item, index) in tempList" :key="index">
                                <td>{{index + (currentPage - 1)*10}}</td>
                                <td>{{item.smsTempLateId}}</td>
                                <td>{{item.smsTempLateName}}</td>
                                <td>{{item.smsTemplateText}}</td>
                                <td>
                                    <router-link :to="{path: '/smsmanage/updateSmsTemplate',
                                                        query: {
                                                            smsTempLateId: item.smsTempLateId,
                                                            currentPage: currentPage
                                                            }
                                                        }">修改</router-link>
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
import smsTemplateSrv from "@/../src/views/services/smsTemplate.service.js";

/* eslint-disable */
export default {
    data() {
        return {
            centerDialogVisible: false,
            currentPage: 1,
            pageSize: 10,
            totalPageNum: 1,
            templateContent: '',
            tempList: [],
            delsmsTemplateId: ''
        };
    },
    beforeRouteEnter: (to, from, next) => {
        next(vm => {
            let temCurrentPage = 1;

            if (vm.$route.query.currentPage) {
                // 说明是从修改模板路由过来的
                temCurrentPage = vm.$route.query.currentPage;
            }

            smsTemplateSrv.messageTemplateList(vm.templateContent, temCurrentPage, vm.pageSize).then(resp => {
                vm.tempList = resp.data.list;
                vm.totalPageNum = resp.data.totalPageNum;
                vm.currentPage = temCurrentPage;
            }, err => {
                vm.$message.error(err.msg); 
            })
        })
    },
    methods: {
        searchSmsTemplate(currentPage = this.currentPage) {
             smsTemplateSrv.messageTemplateList(this.templateContent, currentPage, this.pageSize).then(resp => {
                this.tempList = resp.data.list
                this.currentPage = currentPage                                                      //这里注意一下，需要把当前点击的页数再告诉分页插件让他去显示数据
                this.totalPageNum = resp.data.totalPageNum
            }, err => {
                this.$message.error(err.msg)
            })
        },
        Del(templateId) {
            this.centerDialogVisible = true;
            this.delsmsTemplateId = templateId;
        },
        confirmDel() {
            this.centerDialogVisible = false;
            smsTemplateSrv.delTemplate(this.delsmsTemplateId).then(resp => {
                this.$message.success("模板删除成功！");
                location.reload();
            }, err => {
                this.$message.error("删除失败，请重试！");
            });
        }
    }
};
</script>

<style lang="scss" scoped>

</style>
