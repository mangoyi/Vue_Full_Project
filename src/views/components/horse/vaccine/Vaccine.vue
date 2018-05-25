<template>
    <div class=" animated fadeIn content_page">
        <div class="content-title">
            <div class="title">接种疫苗信息</div>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="col-md-3 search-field">
                    <div class="label">时间：</div>
                    <input type="text" class="form-control input-field" placeholder="请输入时间" />
                </div>
                <div class="col-md-3 search-field">
                    <div class="label">地点：</div>
                    <input type="text" class="form-control input-field" placeholder="请输入地址" />
                </div>
                  <div class="col-md-3 search-field">
                    <div class="label">马匹名称：</div>
                    <input type="text" class="form-control input-field" placeholder="请输入马匹名称" />
                </div>

                <div class="col-md-1 search-field search-field_controls">
                    <button class="btn btn-primary search-btn">搜索</button>
                </div>
                <!-- <div class="col-md-1 search-field search-field_controls">
                    <router-link class="btn btn-success" :to="'/horse/addVaccine'">
                        新增
                    </router-link>
                </div> -->
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <table class="table table-bordered table-striped table-sm">
                        <thead>
                            <tr>
                                <th>马匹</th>
                                <th>时间</th>
                                <th>地点</th>
                                <th>名称</th>
                                <th>预防疾病</th>
                                <th>医生</th>
                                <th>疫苗编号</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>大马</td>
                                <td>2016.11</td>
                                <td>上海市</td>
                                <td>赛马比赛</td>
                                <td>狂犬病</td>
                                <td>吕医生</td>
                                <td>12345678</td>
                                <td>
                                    <router-link :to="{path: '/horse/updateVaccine',       
                                             query: { disable: 1,}}"> 查看</router-link>
                                    <!-- <router-link :to="'/horse/updateVaccine'">修改</router-link> -->
                                </td>
                            </tr>
                            <tr>
                                <td>大马</td>
                                <td>2016.11</td>
                                <td>上海市</td>
                                <td>赛马比赛</td>
                                <td>狂犬病</td>
                                <td>吕医生</td>
                                <td>12345678</td>
                                <td>
                                    <router-link :to="{path: '/horse/updateVaccine',       
                                             query: { disable: 1,}}"> 查看</router-link>
                                    <!-- <router-link :to="'/horse/updateVaccine'">修改</router-link> -->
                                </td>
                            </tr>
                            <tr>
                                <td>大马</td>
                                <td>2016.11</td>
                                <td>上海市</td>
                                <td>赛马比赛</td>
                                <td>狂犬病</td>
                                <td>吕医生</td>
                                <td>12345678</td>
                                <td>
                                    <router-link :to="{path: '/horse/updateVaccine',       
                                             query: { disable: 1,}}"> 查看</router-link>
                                    <!-- <router-link :to="'/horse/updateVaccine'">修改</router-link> -->
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
import { Pagination,Select } from 'element-ui'
/* eslint-disable */
export default {
    data() {
        return {
            currentPage: 1
        }
    },
    components: {
        'el-pagination': Pagination,
        "el-select":Select
    }
}
</script>

<style lang="scss" scoped>

</style>
