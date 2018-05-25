<template>
    <div class="content_page animated fadeIn">
        <div class="content-title">
            <div class="title">字典管理</div>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">字典类型：</div>
                    <input type="text" class="form-control input-field" placeholder="请输入字典类型" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">类型代码：</div>
                    <input type="text" class="form-control input-field" placeholder="请输入类型代码" />

                </div>
                <div class="col-md-1 search-field search-field_controls">
                    <button class="btn btn-primary search-btn">搜索</button>
                </div>
                <div class="col-md-1 search-field search-field_controls">
                    <button type="reset" class="btn btn-default">重置</button>
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-1 search-field search-field_controls">
                    <button class="btn btn-success" @click="updateDialog=true">新增</button>
                </div>
            </div>
            <!-- <div class="wait-loading"><img src="/static/img/loading.gif"></div> -->
            <div class="row ">
                <div class="col-lg-12">
                    <table class="table table-bordered table-striped table-sm">
                        <thead>
                            <tr>
                                <th></th>
                                <th>字典类型</th>
                                <th>类型代码</th>
                                <th>备注</th>
                                <th>排序</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><input type="radio" class="input-pointer" name="select"></td>
                                <td>状态</td>
                                <td>Status</td>
                                <td>用户状态</td>
                                <td>12</td>
                                <td>
                                    <a @click="updateDialog = true">修改</a>
                                    <a @click="centerDialogVisible = true">删除</a>
                                </td>
                            </tr>
                            <tr>
                                <td><input type="radio" class="input-pointer" name="select"></td>
                                <td>状态</td>
                                <td>Status</td>
                                <td>用户状态</td>
                                <td>12</td>
                                <td>
                                    <a @click="updateDialog = true">修改</a>
                                    <a @click="centerDialogVisible = true">删除</a>
                                </td>
                            </tr>
                            <tr>
                                <td><input type="radio" class="input-pointer" name="select"></td>
                                <td>状态</td>
                                <td>Status</td>
                                <td>用户状态</td>
                                <td>12</td>
                                <td>
                                    <a @click="updateDialog = true">修改</a>
                                    <a @click="centerDialogVisible = true">删除</a>
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

            <div class="row list-search">
                <div class="col-md-1 search-field search-field_controls">
                    <button class="btn btn-success" @click="updateTextDialog=true">新增字项</button>
                </div>
            </div>
            <div class="row ">
                <div class="col-lg-12">
                    <table class="table table-bordered table-striped table-sm">
                        <thead>
                            <tr>
                                <th>父节点</th>
                                <th>名称</th>
                                <th>代码</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>29</td>
                                <td>待审核</td>
                                <td>40</td>
                                <td>
                                    <a @click="updateTextDialog = true">修改 </a>
                                    <a @click="centerDialogVisible = true">删除</a>
                                </td>
                            </tr>
                            <tr>
                                <td>29</td>
                                <td>待审核</td>
                                <td>40</td>
                                <td>
                                    <a @click="updateTextDialog = true">修改 </a>
                                    <a @click="centerDialogVisible = true">删除</a>
                                </td>
                            </tr>
                            <tr>
                                <td>29</td>
                                <td>待审核</td>
                                <td>40</td>
                                <td>
                                    <a @click="updateTextDialog = true">修改 </a>
                                    <a @click="centerDialogVisible = true">删除</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <el-dialog title="提示" :modal-append-to-body="false" :visible.sync="centerDialogVisible" width="20%" center>
            <div class="text-center">
                <span>确定要删除这项内容吗?</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 修改 -->
        <el-dialog title="修改" :modal-append-to-body="false" :visible.sync="updateDialog" width="50%" center>
            <div class="content-show text-center">
                <div class="row mb-1 list-search">
                    <div class="col-md-6 search-field">
                        <div class="label">字典类型：</div>
                        <input type="text" class="form-control input-field" placeholder="字典类型" />
                    </div>
                    <div class="col-md-6 search-field">
                        <div class="label">类型代码：</div>
                        <input type="text" class="form-control input-field" placeholder="类型代码" />
                    </div>
                </div>
                <div class="row mb-1 list-search">
                    <div class="col-md-6 search-field">
                        <div class="label">排序：</div>
                        <input type="text" class="form-control input-field" placeholder="排序" />
                    </div>
                    <div class="col-md-6 search-field">
                        <div class="label">备注：</div>
                        <input type="text" class="form-control input-field" placeholder="备注" />
                    </div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="updateDialog = false">取 消</el-button>
                <el-button type="primary" @click="updateDialog = false">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="修改" :modal-append-to-body="false" :visible.sync="updateTextDialog" width="50%" center>
            <div class="content-show text-center">
                <div class="row mb-1 list-search">
                    <div class="col-md-6 search-field">
                        <div class="label">父节点：</div>
                        <input type="text" class="form-control input-field" placeholder="父节点" />
                    </div>
                    <div class="col-md-6 search-field">
                        <div class="label">字典名称：</div>
                        <input type="text" class="form-control input-field" placeholder="字典名称" />
                    </div>
                </div>
                <div class="row mb-1 list-search">
                    <div class="col-md-6 search-field">
                        <div class="label">字典代码：</div>
                        <input type="text" class="form-control input-field" placeholder="字典代码" />
                    </div>
                    
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="updateTextDialog = false">取 消</el-button>
                <el-button type="primary" @click="updateTextDialog = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { Pagination, Dialog} from 'element-ui'
/* eslint-disable */
export default {
    data() {
        return {
            updateTextDialog:false,
            updateDialog: false,
            centerDialogVisible: false,
            currentPage: 1,
            options: [{
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
        'el-dialog': Dialog,
    }
}
</script>

<style lang="scss" scoped>
.input-pointer{
    cursor: pointer;
}
</style>
