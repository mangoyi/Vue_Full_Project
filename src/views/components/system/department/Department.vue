<template>
    <div class="content_page animated fadeIn">
        <div class="content-title">
            <div class="title">部门管理</div>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">部门名称：</div>
                    <input type="text" class="form-control input-field" placeholder="请输入部门名称" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">状态：</div>
                    <el-select size="large" v-model="status" class="el-field-input" placeholder="请选择">
                        <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="col-md-1 search-field search-field_controls">
                    <button class="btn btn-primary search-btn">搜索</button>
                </div>
                <div class="col-md-1 search-field search-field_controls">
                    <router-link class="btn btn-success" :to="'/system/AddDepart'">
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
                                <th>部门名称</th>
                                <th>部门简称</th>
                                <th>状态</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>产品部</td>
                                <td>CPB</td>
                                <td>正常</td>
                                <td>
                                    <a @click="stuffDialog=true">成员管理</a>
                                    <a @click="permissionDialog=true">分配权限</a>
                                    <router-link :to="'/system/updateDepart'">
                                        修改
                                    </router-link>
                                    <router-link :to="{path: '/system/updateDepart',  query: { disable: 1,}}"> 查看</router-link>
                                    <a @click="centerDialogVisible=true">删除</a>
                                </td>
                            </tr>
                            <tr>
                                <td>产品部</td>
                                <td>CPB</td>
                                <td>正常</td>
                                <td>
                                    <a @click="stuffDialog=true">成员管理</a>
                                    <a @click="permissionDialog=true">分配权限</a>
                                    <router-link :to="'/system/updateDepart'">
                                        修改
                                    </router-link>
                                    <router-link :to="{path: '/system/updateDepart',  query: { disable: 1,}}"> 查看</router-link>
                                    <a @click="centerDialogVisible=true">删除</a>
                                </td>
                            </tr>
                            <tr>
                                <td>产品部</td>
                                <td>CPB</td>
                                <td>正常</td>
                                <td>
                                    <a @click="stuffDialog=true">成员管理</a>
                                    <a @click="permissionDialog=true">分配权限</a>
                                    <router-link :to="'/system/updateDepart'">
                                        修改
                                    </router-link>
                                    <router-link :to="{path: '/system/updateDepart',  query: { disable: 1,}}"> 查看</router-link>

                                    <a @click="centerDialogVisible=true">删除</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <!-- <div class="list-empty" ng-show="content.orderList.length===0">
                                                           没有可以显示的订单 </div> -->
                    <div class="page">
                        <el-pagination background layout="prev, pager, next" :total="1000">
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>
        <!-- 分配权限 -->
        <el-dialog title="分配权限" :modal-append-to-body="false" :visible.sync="permissionDialog" width="30%" center>
            <div class="row mb-3">
                <div class="col-md-3">
                    <button class="btn btn-info" @click="selectChecked">全选</button>
                </div>
                <div class="col-md-3">
                    <button class="btn btn-info" @click="resetChecked">全不选</button>
                </div>
            </div>
            <el-tree :data="data2" show-checkbox default-expand-all node-key="id" ref="tree" highlight-current :props="defaultProps">
            </el-tree>
            <span slot="footer" class="dialog-footer">
                <el-button @click="permissionDialog = false">取 消</el-button>
                <el-button type="primary" @click="permissionDialog = false">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 成员管理 -->
        <el-dialog title="成员管理" :modal-append-to-body="false" :visible.sync="stuffDialog" width="30%" center>

            <el-tree :data="data3" show-checkbox default-expand-all node-key="id" ref="tree" highlight-current :props="defaultProps">
            </el-tree>
            <span slot="footer" class="dialog-footer">
                <el-button @click="stuffDialog = false">取 消</el-button>
                <el-button type="primary" @click="stuffDialog = false">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="提示" :modal-append-to-body="false" :visible.sync="centerDialogVisible" width="25%" center>
            <div class="text-center">
                <span>确定要删除这条信息吗?</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
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
            status:'',
            stuffDialog: false,
            permissionDialog: false,
            centerDialogVisible: false,
            currentPage: 1,
            statusOptions: [{
                value: '选项1',
                label: '使用中'
            }, {
                value: '选项2',
                label: '使用结束'
            }],
            data2: [{
                id: 0,
                label: '控制台',
            }, {
                id: 1,
                label: '马匹信息管理',
                children: [{
                    id: 5,
                    label: '基本信息',
                }, {
                    id: 6,
                    label: '获奖信息',
                }]
            }, {
                id: 2,
                label: '马医院信息管理',
                children: [{
                    id: 7,
                    label: '固定资产管理'
                }, {
                    id: 8,
                    label: '消耗品管理'
                }]
            }, {
                id: 3,
                label: '马术中心资产管理',
                children: [{
                    id: 9,
                    label: '固定资产管理'
                }, {
                    id: 10,
                    label: '固定资产库存管理'
                },]
            }, {
                id: 4,
                label: '系统管理',
                children: [{
                    id: 11,
                    label: '用户管理'
                }, {
                    id: 12,
                    label: '部门管理'
                }]
            }],
            data3: [{
                id: 1,
                label: '产品部',
                children: [{
                    id: 5,
                    label: '前端',
                }, {
                    id: 6,
                    label: '后台',
                }]
            }],
            defaultProps: {
                children: 'children',
                label: 'label'
            }
        }
    },
    components: {
        'el-pagination': Pagination,
        // 'v-modal': modal,
        'el-dialog': Dialog
        // 'v-queue-anim': QueueAnim
    },
    methods: {
        selectChecked() {
            this.$refs.tree.setCheckedKeys([0, 1, 2, 3,4]);
        },
        resetChecked() {
            this.$refs.tree.setCheckedKeys([]);

        }
    }
}
</script>

<style lang="scss" scoped>
.el-field-input {
    width: 100%;
}
</style>
