<template>
    <div class="animated fadeIn content_page">
        <div class="content-title">
            <div class="title">预约日常管理</div>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="col-md-3 search-field">
                    <div style="left:-14px" class="label">预约开始日期：</div>
                    <el-date-picker size="large" v-model="value1" type="date" placeholder="选择日期时间">
                    </el-date-picker>
                </div>
                <div class="col-md-3 search-field">
                    <div class="label">预约医生：</div>
                    <input type="text" class="form-control input-field" placeholder="请输入预约医生" />
                </div>
                <div class="col-md-3 search-field">
                    <div class="label">预约号：</div>
                    <input type="text" class="form-control input-field" placeholder="请输入预约号" />
                </div>

                <div class="col-md-1 search-field search-field_controls">
                    <button class="btn btn-primary search-btn">搜索</button>
                </div>
                <div class="col-md-1 search-field search-field_controls">
                    <router-link class="btn btn-success" :to="'/hospital/addAppoint'">
                        新增
                    </router-link>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <table class="table table-bordered table-striped table-sm">
                        <thead>
                            <tr>
                                <th>预约时间</th>
                                <th>预约描述</th>
                                <th>预约医生</th>
                                <th>预约号</th>
                                <th>备注</th>
                                <th>联系人</th>
                                <th>联系方式</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>2016.11.12</td>
                                <td>可以</td>
                                <td>陈医生</td>
                                <td>123</td>
                                <td>紧急</td>
                                <td>陈子卿</td>
                                <td>120</td>
                                <td>

                                    <router-link :to="{path: '/horse/updateTreatment',       
                                                 query: { disable: 1,}}"> 查看治疗</router-link>
                                    <router-link :to="'/horse/AddTreatment'">
                                        添加治疗
                                    </router-link>
                                    <router-link :to="'/hospital/updateAppoint'">
                                        修改
                                    </router-link>
                                    <a @click="centerDialogVisible=true">取消</a>
                                </td>
                            </tr>
                            <tr>
                                <td>2016.11.12</td>
                                <td>可以</td>
                                <td>陈医生</td>
                                <td>123</td>
                                <td>紧急</td>
                                <td>陈子卿</td>
                                <td>120</td>
                                <td>
                                    <router-link :to="{path: '/horse/updateTreatment',       
                                                 query: { disable: 1,}}"> 查看治疗</router-link>
                                    <router-link :to="'/horse/AddTreatment'">
                                        添加治疗
                                    </router-link>
                                    <router-link :to="'/hospital/updateAppoint'">
                                        修改
                                    </router-link>
                                    <a @click="centerDialogVisible=true">取消</a>
                                </td>
                            </tr>
                            <tr>
                                <td>2016.11.12</td>
                                <td>可以</td>
                                <td>陈医生</td>
                                <td>123</td>
                                <td>紧急</td>
                                <td>陈子卿</td>
                                <td>120</td>
                                <td>

                                    <router-link :to="{path: '/horse/updateTreatment',       
                                                 query: { disable: 1,}}"> 查看治疗</router-link>
                                    <router-link :to="'/horse/AddTreatment'">
                                        添加治疗
                                    </router-link>
                                    <router-link :to="'/hospital/updateAppoint'">
                                        修改
                                    </router-link>
                                    <a @click="centerDialogVisible=true">取消</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <!-- <div class="list-empty" ng-show="content.orderList.length===0">
                                                没有可以显示的订单
                                            </div> -->
                    <div class="page">

                        <el-pagination background layout="prev, pager, next" :total="1000">
                        </el-pagination>
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
import { Pagination, DatePicker } from "element-ui";
/* eslint-disable */
export default {
    data() {
        return {
            value1:'',
            centerDialogVisible: false,
            currentPage: 1
            
        };
    },
    components: {
        "el-pagination": Pagination,
        "el-date-picker": DatePicker
    }
};
</script>

<style lang="scss" scoped>

</style>
