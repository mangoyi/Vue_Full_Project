<template>
    <div class="content_page animated fadeIn">
        <div class="content-title">
            <div class="title">饲养员信息</div>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">姓名：</div>
                    <input type="text" class="form-control input-field" placeholder="请输入姓名" />
                </div>
                <div class="col-md-1 search-field search-field_controls">
                    <button class="btn btn-primary search-btn">搜索</button>
                </div>
                <div class="col-md-1 search-field search-field_controls">
                    <router-link class="btn btn-success" :to="'/horse/addBreeder'">
                        新增
                    </router-link>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <table class="table table-bordered table-striped table-sm">
                        <thead>
                            <tr>
                                <th>姓名</th>
                                <th>性别</th>
                                <th>身份证照片</th>
                                <th>职能描述</th>
                                <th>匹配马匹</th>
                                <th>入职时间</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>小仙女</td>
                                <td>女</td>
                                <td>照片</td>
                                <td>编程</td>
                                <td>大马</td>
                                <td>2016.12</td>
                                <td>
                                    <router-link :to="{path: '/horse/updateBreeder',       
                                     query: { disable: 1,}}"> 查看</router-link>
                                    <router-link :to="'/horse/updateBreeder'">修改</router-link>
                                </td>
                            </tr>
                            <tr>
                                <td>小仙女</td>
                                <td>女</td>
                                <td>照片</td>
                                <td>编程</td>
                                <td>大马</td>
                                <td>2016.12</td>
                                 <td>
                                    <router-link :to="{path: '/horse/updateBreeder',       
                                     query: { disable: 1,}}"> 查看</router-link>
                                    <router-link :to="'/horse/updateBreeder'">修改</router-link>
                                </td>
                            </tr>
                            <tr>
                                <td>小仙女</td>
                                <td>女</td>
                                <td>照片</td>
                                <td>编程</td>
                                <td>大马</td>
                                <td>2016.12</td>
                                 <td>
                                    <router-link :to="{path: '/horse/updateBreeder',       
                                     query: { disable: 1,}}"> 查看</router-link>
                                    <router-link :to="'/horse/updateBreeder'">修改</router-link>
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
