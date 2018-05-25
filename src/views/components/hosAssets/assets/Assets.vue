<template>
    <div class="p-insurance-list content_page">
        <div class="content-title">
            <div class="title">固定资产信息</div>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">资产大类：</div>
                    <el-select size="large" v-model="assetsCate" class="el-field-input" placeholder="请选择">
                        <el-option v-for="item in assetsCateOptions" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">资产分类：</div>
                    <el-select size="large" v-model="assetsClass" class="el-field-input" placeholder="请选择">
                        <el-option v-for="item in assetsClassOptions" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="col-md-1 search-field search-field_controls">
                    <button class="btn btn-primary search-btn">搜索</button>
                </div>
                <div class="col-md-1 search-field search-field_controls">
                    <router-link class="btn btn-success" :to="'/hosAssets/addAssets'">
                        新增
                    </router-link>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <table class="table table-bordered table-striped table-sm">
                        <thead>
                            <tr>
                                <th>资产大类</th>
                                <th>资产分类</th>
                                <th>资产编号</th>
                                <th>资产名称</th>
                                <th>数量</th>
                                <th>价值</th>
                                <th>面积</th>

                                <th>价值类型</th>
                                <th>取得方式</th>
                                <th>财务出账日期</th>
                                <th>制单日期</th>

                                <th>保修截止日期</th>
                                <th>管理部门</th>
                                <th>管理人</th>
                                <th>使用状态</th>

                                <th>备注</th>
                                <th>设计用途</th>
                                <th>规格型号</th>
                                <th>品牌</th>

                                <th>会记凭证号</th>
                                <th>采购组织形式</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>

                            <tr>
                                <td>上海市</td>
                                <td>一等奖</td>
                                <td>无</td>
                                <td>无</td>
                                <td>无</td>
                                <td>无</td>
                                <td>无</td>
                                <td>无</td>
                                <td>无</td>
                                <td>无</td>
                                <td>无</td>
                                <td>无</td>

                                <td>无</td>
                                <td>无</td>
                                <td>无</td>
                                <td>无</td>
                                <td>无</td>
                                <td>无</td>
                                <td>无</td>
                                <td>无</td>
                                <td>无</td>
                                <td>
                                    <router-link :to="{path: '/hosAssets/updateAssets',       
                                                         query: { disable: 1,}}"> 查看</router-link>
                                    <router-link :to="'/hosAssets/updateAssets'">
                                        修改
                                    </router-link>
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
            assetsCate: '',
            assetsClass: '',
            currentPage: 1,
            assetsCateOptions: [
                {
                    value: "1",
                    label: "资产1"
                },
                {
                    value: "2",
                    label: "资产2"
                }
            ],
            assetsClassOptions: [
                {
                    value: "1",
                    label: "资产分类1"
                },
                {
                    value: "2",
                    label: "资产分类2"
                }
            ],
        }
    },
    components: {
        'el-pagination': Pagination,
    }
}
</script>

<style lang="scss" scoped>

</style>
