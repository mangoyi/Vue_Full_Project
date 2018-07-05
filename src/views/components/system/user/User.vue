<template>
    <div class="content_page animated fadeIn">
        <div class="content-title" key="0">
            <div class="title">用户管理</div>
        </div>
        <div class="content-show" key="1">
            <div class="row list-search">
                <div class="col-md-2 search-field">
                    <div class="label">工号：</div>
                    <input type="text" class="form-control input-field" placeholder="请输入工号" />
                </div>
                <div class="col-md-2 search-field">
                    <div class="label">姓名：</div>
                    <input type="text" class="form-control input-field" placeholder="请输入姓名" />
                </div>
                <div class="col-md-2 search-field">
                    <div class="label">状态：</div>
                    <el-select size="large" v-model="value" class="el-field-input" placeholder="请选择">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="col-md-2 search-field">
                    <div class="label">部门：</div>
                    <el-select size="large" v-model="value" class="el-field-input" placeholder="请选择">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="col-md-2 search-field">
                    <div class="label">角色：</div>
                    <el-select size="large" v-model="value1" class="el-field-input" placeholder="请选择">
                        <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>

                <div class="col-md-1 search-field search-field_controls">
                    <button class="btn btn-primary search-btn">搜索</button>
                </div>
                <div class="col-md-1 search-field search-field_controls">
                    <router-link class="btn btn-success" :to="'/system/AddUser'">
                        新增
                    </router-link>
                </div>
            </div>
            <!-- <div class="wait-loading"><img src="/static/img/loading.gif"></div> -->
            <div class="row ">
                <div class="col-lg-12">
                    <table class="table table-bordered table-striped table-sm">
                        <thead>
                            <tr>
                                <th>工号</th>
                                <th>姓名</th>
                                <th>用户登录名</th>
                                <th>部门</th>
                                <th>角色</th>
                                <th>联系方式</th>
                                <th>邮箱</th>
                                <th>状态</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>123</td>
                                <td>哈哈</td>
                                <td>ALHH</td>
                                <td>产品部</td>
                                <td>普通用户</td>
                                <td>18912345678</td>
                                <td>123456@qq.com</td>
                                <td>正常</td>
                                <td>
                                    <router-link :to="'/system/updateUser'">
                                        修改
                                    </router-link>
                                    <router-link :to="{path: '/system/updateUser',  query: { disable: 1,}}"> 查看</router-link>

                                    <a @click="centerDialogVisible=true">锁定</a>
                                    <a @click="passwordDialog=true">重置密码</a>
                                </td>
                            </tr>
                            <tr>
                                <td>123</td>
                                <td>哈哈</td>
                                <td>ALHH</td>
                                <td>产品部</td>
                                <td>普通用户</td>
                                <td>18912345678</td>
                                <td>123456@qq.com</td>
                                <td>正常</td>
                                <td>
                                    <router-link :to="'/system/updateUser'">
                                        修改
                                    </router-link>
                                    <router-link :to="{path: '/system/updateUser',  query: { disable: 1,}}"> 查看</router-link>
                                    <a @click="centerDialogVisible=true">锁定</a>
                                    <a @click="passwordDialog=true">重置密码</a>
                                </td>
                            </tr>
                            <tr>
                                <td>123</td>
                                <td>哈哈</td>
                                <td>ALHH</td>
                                <td>产品部</td>
                                <td>普通用户</td>
                                <td>18912345678</td>
                                <td>123456@qq.com</td>
                                <td>正常</td>
                                <td>
                                    <router-link :to="'/system/updateUser'">
                                        修改
                                    </router-link>
                                    <router-link :to="{path: '/system/updateUser',  query: { disable: 1,}}"> 查看</router-link>
                                    <a @click="centerDialogVisible=true">锁定</a>
                                    <a @click="passwordDialog=true">重置密码</a>
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
        <el-dialog title="锁定" :modal-append-to-body="false" :visible.sync="centerDialogVisible" width="20%" center>
            <div class="text-center">
                <span>确定要锁定此状态吗?</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 重置密码 -->
        <el-dialog title="重置密码" :modal-append-to-body="false" :visible.sync="passwordDialog" width="25%" center>

            <div class="content-show text-center">
                <div class="row mb-1 list-search">
                    <div class="col-md-12 search-field">
                        <div class="label">原密码：</div>
                        <input type="password" class="form-control input-field" placeholder="原密码" />
                    </div>
                </div>
                <div class="row mb-1 list-search">
                    <div class="col-md-12 search-field">
                        <div class="label">新密码：</div>
                        <input type="password" class="form-control input-field" placeholder="新密码" />
                    </div>
                </div>
            </div>

            <span slot="footer" class="dialog-footer">
                <el-button @click="passwordDialog = false">取 消</el-button>
                <el-button type="primary" @click="passwordDialog = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { Pagination, Dialog } from 'element-ui'
/* eslint-disable */
export default {
    data() {
        return {
            passwordDialog: false,
            centerDialogVisible: false,
            currentPage: 1,
            value:'',
            value1:'',
            options: [{
                value: '选项1',
                label: '假数据1'
            }, {
                value: '选项2',
                label: '假数据2'
            }],
               options1: [{
                value: '选项1',
                label: '假数据1'
            }, {
                value: '选项2',
                label: '假数据2'
            }],
        }
    },
    components: {
        'el-pagination': Pagination,
        'el-dialog': Dialog
    }
}
</script>

<style lang="scss" scoped>
.content_page {
    .content-show {
        .list-search {
            .search-field {
                .label {
                    position: absolute;
                    left: 20px;
                    top: 8px;
                    text-align: right;
                }
            }
        }
    }
}
</style>
