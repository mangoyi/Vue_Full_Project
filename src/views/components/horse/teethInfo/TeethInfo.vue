<template>
    <div class="animated fadeIn content_page">
        <div class="content-title">
            <div class="title">挫牙管理</div>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="col-md-3 search-field">
                    <div class="label">马匹：</div>
                    <el-select size="large" v-model="horse" class="el-field-input" placeholder="请选择">
                        <el-option v-for="item in horseOptions" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="col-md-1 search-field search-field_controls">
                    <button class="btn btn-primary search-btn">搜索</button>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <table class="table table-bordered table-striped table-sm">
                        <thead>
                            <tr>
                                <th>时间</th>
                                <th>马匹</th>
                                <th>操作人</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>2017.12</td>
                                <td>大马</td>
                                <td>小仙女</td>
                                <td>
                                    <router-link :to="{path: '/hospital/updateNail',       
                                             query: { disable: 1,}}"> 查看</router-link>
                                </td>
                            </tr>
                            <tr>
                                <td>2017.12</td>
                                <td>大马</td>
                                <td>小仙女</td>
                                <td>
                                    <router-link :to="{path: '/hospital/updateNail',       
                                             query: { disable: 1,}}"> 查看</router-link>
                                </td>
                            </tr>
                            <tr>
                                <td>2017.12</td>
                                <td>大马</td>
                                <td>小仙女</td>
                                <td>
                                    <router-link :to="{path: '/hospital/updateNail',       
                                             query: { disable: 1,}}"> 查看</router-link>
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
            currentPage: 1,
            horse: '',
            horseOptions: [{
                value: '1',
                label: '马匹1'
            }, {
                value: '2',
                label: '马匹2'
            }],
        }
    },
    components: {
        'el-pagination': Pagination,
    }
}
</script>

<style lang="scss" scoped>

</style>
