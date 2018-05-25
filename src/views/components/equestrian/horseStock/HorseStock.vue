<template>
    <div class="p-insurance-list content_page">
        <div class="content-title">
            <div class="title">固定资产库存信息</div>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="col-md-2 search-field">
                    <div class="label">资产大类：</div>
                    <el-select size="large" v-model="assetsCate" class="el-field-input" placeholder="请选择">
                        <el-option v-for="item in assetsCateOptions" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="col-md-2 search-field">
                    <div class="label">资产分类：</div>
                    <el-select size="large" v-model="assetsClass" class="el-field-input" placeholder="请选择">
                        <el-option v-for="item in assetsClassOptions" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="col-md-3 search-field">
                    <div class="label">资产名称：</div>
                    <input type="text" class="form-control input-field" placeholder="请输入资产名称" />
                </div>
                <div class="col-md-3 search-field">
                    <div class="label">会记凭证号：</div>
                    <input type="text" class="form-control input-field" placeholder="请输入会记凭证号" />
                </div>
                <div class="col-md-1 search-field search-field_controls">
                    <button class="btn btn-primary search-btn">搜索</button>
                </div>
                <div class="col-md-1 search-field search-field_controls">
                    <button class="btn btn-success" @click="centerDialogVisible = true">
                        增加库存
                    </button>
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
                                <!-- <th>操作</th> -->
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
                                <!-- <td>
                                                    <router-link :to="{path: '/hospital/updateAssets',       
                                                             query: { disable: 'true',}}"> 查看</router-link>
                                                    <router-link :to="'/hospital/updateAssets'">
                                                        更新
                                                    </router-link>
                                                </td> -->

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
                    <el-dialog title="增加库存" :modal-append-to-body="false" :visible.sync="centerDialogVisible" width="52%" center>
                        <div class="row mb-3" v-for="(item,index) in assets" :key="item">
                            <div class="col-md-4 search-field">
                                <input type="text" v-model="item.id" class="form-control input-field" placeholder="编号" />
                            </div>
                            <div class="col-md-4 search-field">
                                <input type="text" disabled v-model="item.name" class="form-control input-field" placeholder="名称" />
                            </div>
                            <div class="col-md-3 search-field">
                                <div class="Spinner">
                                    <a class="Decrease" @click="decrease(index,item.value)">
                                        <i class="fa fa-sort-desc"></i>
                                    </a>
                                    <input class="Amount" v-model="item.value" autocomplete="off">
                                    <a class="Increase" @click="increase(index,item.value)">
                                        <i class="fa fa-sort-asc"></i>
                                    </a>
                                </div>
                            </div>
                            <div class="col-md-1 search-field">
                                <div class="add-delete">
                                    <a @click="addData">
                                        <i class="fa fa-plus-circle"></i>
                                    </a>
                                    <a @click="confirmDialog=true">
                                        <i class="fa fa-minus-circle"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="centerDialogVisible = false">取 消</el-button>
                            <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
                        </span>
                    </el-dialog>
                    <el-dialog title="提示" :modal-append-to-body="false" :visible.sync="confirmDialog" width="25%" center>
                        <div class="text-center">
                            <span>确定要删除这一条数据吗？</span>
                        </div>
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="confirmDialog = false">取 消</el-button>
                            <el-button type="primary" @click="deleteData(index)">确 定</el-button>
                        </span>
                    </el-dialog>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { Pagination, Dialog } from "element-ui";
/* eslint-disable */
export default {
    data() {
        return {
            assetsCate:'',
            assetsClass:'',
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
            currentPage: 1,
            centerDialogVisible: false,
            confirmDialog: false,
            index: 0,
            assets: [
                { id: "1", name: "123", value: "123" },
                { id: "2", name: "123", value: "123" },
                { id: "3", name: "123", value: "123" }
            ]
        };
    },
    components: {
        "el-pagination": Pagination,
        "el-dialog": Dialog
    },
    methods: {
        deleteData(index) {
            this.assets.splice(index, 1)
            this.confirmDialog = false
        },
        addData() {
            this.assets.push({
                id: "",
                name: "",
                value: 0
            });
        },
        //增加
        increase(index, value) {
            return this.assets[index].value++;
        },
        //减少
        decrease(index, value) {
            this.index = index
            if (value <= 0) {
                return 0;
            } else {
                return this.assets[index].value--;
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.add-delete a {
    margin-left: 5px;
    cursor: pointer;
}

.add-delete {
    color: #409eff;
    margin-left: -40px;
    float: left;
    font-size: 40px;
    display: inline-flex;
}

.input-field {
    border-radius: 5px;
    height: 40px;
}

.Spinner {
    display: block;
    overflow: hidden;
    width: 160px;
    margin-top: 3px;
}

.Spinner a {
    display: inline-block;
    width: 35px;
    height: 35px;
    border: 1px solid #d9d9d9;
    background-color: #f7f7f7;
    float: left;
    cursor: pointer;
    outline: 0;
}

.Spinner .Amount {
    width: 50px;
    height: 35px;
    border-width: 1px 0;
    border-style: solid;
    border-color: #d9d9d9;
    float: left;
    text-align: center;
    color: #565656;
    outline: 0;
}

.Decrease i {
    padding-left: 10px;
    font-size: 20px;
    color: #409eff;
}

.Increase i {
    padding-left: 10px;
    position: relative;
    top: 8px;
    font-size: 22px;
    color: #409eff;
}
</style>
