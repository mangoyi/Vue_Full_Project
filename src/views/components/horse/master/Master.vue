<template>
    <div class="animated fadeIn content_page">
        <div class="content-title">
            <div class="title">马主信息</div>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="col-md-3 search-field">
                    <div class="label">姓名：</div>
                    <input type="text" class="form-control input-field" placeholder="请输入姓名" />
                </div>
                <div class="col-md-3 search-field">
                    <div class="label">联系方式：</div>
                    <input type="text" class="form-control input-field" placeholder="请输入联系方式" />
                </div>
                 <div class="col-md-3 search-field">
                    <div class="label">马匹名称：</div>
                    <input type="text" class="form-control input-field" placeholder="请输入马匹名称" />
                </div>

                <div class="col-md-1 search-field search-field_controls">
                    <button class="btn btn-primary search-btn">搜索</button>
                </div>
                <div class="col-md-1 search-field search-field_controls">
                    <router-link class="btn btn-success" :to="'/horse/addMaster'">
                        新增
                    </router-link>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <table class="table table-bordered table-striped table-sm">
                        <thead>
                            <tr>
                                <th>马匹</th>
                                <th>姓名</th>
                                <th>性别</th>
                                <th>职业</th>
                                <th>联系方式</th>
                                <th>住址</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>大马</td>
                                <td>小仙女</td>
                                <td>女</td>
                                <td>前端工程师</td>
                                <td>13212345678</td>
                                <td>浦东新区</td>
                                <td>
                                    <router-link :to="{path: '/horse/updateMaster',       
                                         query: { disable: 1,}}"> 查看</router-link>
                                    <router-link :to="'/horse/updateMaster'">修改</router-link>
                                </td>
                            </tr>
                            <tr>
                                <td>大马</td>
                                <td>小仙女</td>
                                <td>女</td>
                                <td>前端工程师</td>
                                <td>13212345678</td>
                                <td>浦东新区</td>
                                <td>
                                    <router-link :to="{path: '/horse/updateMaster',       
                                         query: { disable: 1,}}"> 查看</router-link>
                                    <router-link :to="'/horse/updateMaster'">修改</router-link>
                                </td>
                            </tr>
                            <tr>
                                <td>大马</td>
                                <td>小仙女</td>
                                <td>女</td>
                                <td>前端工程师</td>
                                <td>13212345678</td>
                                <td>浦东新区</td>
                                <td>
                                    <router-link :to="{path: '/horse/updateMaster',       
                                         query: { disable: 1,}}"> 查看</router-link>
                                    <router-link :to="'/horse/updateMaster'">修改</router-link>
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
