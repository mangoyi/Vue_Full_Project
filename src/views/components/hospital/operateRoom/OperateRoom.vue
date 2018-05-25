<template>
    <div class=" animated fadeIn content_page">
        <div class="content-title">
            <div class="title">诊疗室管理</div>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">诊疗室名称：</div>
                    <input type="text" class="form-control input-field" placeholder="请输入手术室名称" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">诊疗室简称：</div>
                    <input type="text" class="form-control input-field" placeholder="请输入手术室简称" />
                </div>

                <div class="col-md-1 search-field search-field_controls">
                    <button class="btn btn-primary search-btn">搜索</button>
                </div>
                <div class="col-md-1 search-field search-field_controls">
                    <router-link class="btn btn-success" :to="'/hospital/addOperateR'">
                        新增
                    </router-link>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <table class="table table-bordered table-striped table-sm">
                        <thead>
                            <tr>
                                <th>诊疗室名称</th>
                                <th>诊疗室简称</th>
                                <th>状态</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1号诊疗室</td>
                                <td>First</td>
                                <td>使用中</td>
                                <td>
                                    <router-link :to="{path: '/hospital/updateOperateR',       
                                             query: { disable: 1,}}"> 查看</router-link>
                                    <router-link :to="'/hospital/updateOperateR'">修改</router-link>
                                </td>
                            </tr>
                             <tr>
                                <td>1号诊疗室</td>
                                <td>First</td>
                                <td>使用中</td>
                                <td>
                                    <router-link :to="{path: '/hospital/updateOperateR',       
                                             query: { disable: 1,}}"> 查看</router-link>
                                    <router-link :to="'/hospital/updateOperateR'">修改</router-link>
                                </td>
                            </tr>
                            <tr>
                                <td>1号诊疗室</td>
                                <td>First</td>
                                <td>使用中</td>
                                <td>
                                    <router-link :to="{path: '/hospital/updateOperateR',       
                                             query: { disable: 1,}}"> 查看</router-link>
                                    <router-link :to="'/hospital/updateOperateR'">修改</router-link>
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
    </div>
</template>

<script>
import { Pagination } from 'element-ui'
/* eslint-disable */
export default {
    data() {
        return {
            currentPage: 1
        }
    },
    components: {
        'el-pagination': Pagination,
    }
}
</script>

<style lang="scss" scoped>

</style>
