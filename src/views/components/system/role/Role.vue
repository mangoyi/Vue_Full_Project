<template>
    <div class="content_page animated fadeIn">
        <div class="content-title">
            <div class="title">角色管理</div>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="col-md-1 search-field search-field_controls">
                    <router-link class="btn btn-success" :to="'/system/AddRole'">
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
                                <th>角色名称</th>
                                <th>角色唯一标示</th>
                                <th>备注</th>
                                <th>状态</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>产品部</td>
                                <td>CPB</td>
                                <td>正常发的</td>
                                <td>已关闭</td>
                                <td>
                                    <a @click="permissionDialog=true">分配权限</a>
                                    <router-link :to="'/system/updateRole'">
                                        修改
                                    </router-link>
                                    <router-link :to="{path: '/system/updateRole',  query: { disable: 1,}}"> 查看</router-link>

                                    <a>删除</a>
                                </td>
                            </tr>
                            <tr>
                                <td>产品部</td>
                                <td>CPB</td>
                                <td>正常发的</td>
                                <td>已关闭</td>
                                <td>
                                    <a @click="permissionDialog=true">分配权限</a>
                                    <router-link :to="'/system/updateRole'">
                                        修改
                                    </router-link>
                                    <router-link :to="{path: '/system/updateRole',  query: { disable: 1,}}"> 查看</router-link>

                                    <a>删除</a>
                                </td>
                            </tr>
                            <tr>
                                <td>产品部</td>
                                <td>CPB</td>
                                <td>正常发的</td>
                                <td>已关闭</td>
                                <td>
                                    <a @click="permissionDialog=true">分配权限</a>
                                    <router-link :to="'/system/updateRole'">
                                        修改
                                    </router-link>
                                    <router-link :to="{path: '/system/updateRole',  query: { disable: 1,}}"> 查看</router-link>

                                    <a>删除</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <!-- <div class="list-empty" ng-show="content.orderList.length===0">
                                         没有可以显示的订单  </div> -->
                    <div class="page">
                        <el-pagination background layout="prev, pager, next" :total="1000">
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog title="提示" :modal-append-to-body="false" :visible.sync="centerDialogVisible" width="25%" center>
            <div class="text-center">
                <span>确定要修改状态吗?</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
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
    </div>
</template>

<script>
import { Pagination, Dialog, Tree } from 'element-ui'
/* eslint-disable */
export default {
    data() {
        return {
            expandAll: false,
            permissionDialog: false,
            centerDialogVisible: false,
            currentPage: 1,
            options: [{
                value: '选项1',
                label: '假数据1'
            }, {
                value: '选项2',
                label: '假数据2'
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
            defaultProps: {
                children: 'children',
                label: 'label'
            }
        }

    },
    methods: {
        //全选
        selectChecked() {
                this.$refs.tree.setCheckedKeys([0,1,2,3,4,5]);        
        },
        //全不选
        resetChecked() {
            this.$refs.tree.setCheckedKeys([]);
        },
    },

    components: {
        'el-pagination': Pagination,
        // 'v-modal': modal,
        'el-dialog': Dialog,
        'el-tree': Tree
        // 'v-queue-anim': QueueAnim
    }
}
</script>

<style lang="scss" scoped>
.el-field-input {
    width: 100%;
}
</style>
