<template>
    <div class="content_page animated fadeIn">
        <div class="content-title">
            <div class="title">马匹基本信息</div>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">护照号码：</div>
                    <input type="text" class="form-control input-field" placeholder="请输入护照号码" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">马匹名称：</div>
                    <input type="text" class="form-control input-field" placeholder="请输入马匹名称" />
                </div>

                <div class="col-md-1 search-field search-field_controls">
                    <button class="btn btn-primary search-btn">搜索</button>
                </div>
                <div class="col-md-1 search-field search-field_controls">
                    <router-link class="btn btn-success" :to="'/horse/addBaseInfo'">
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
                                <th>护照号码</th>
                                <th>马名</th>
                                <th>性别</th>
                                <th>变更马名</th>
                                <th>变更日期</th>
                                <th>出生年</th>
                                <th>出生国家</th>
                                <th>身高(公分)</th>
                                <th>毛色</th>
                                <th>皮下微型条码</th>
                                <th>状态</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>12345678</td>
                                <td>马大姐</td>
                                <td>女</td>
                                <td>马二姐</td>
                                <td>1995年11月</td>
                                <td>1995</td>
                                <td>俄罗斯</td>
                                <td>100</td>
                                <td>白色</td>
                                <td>234567</td>
                                <td>有效</td>
                                    <td>
                                        <router-link :to="{path: '/horse/updateBaseInfo',       
                                                 query: { disable: 1,}}"> 查看</router-link>
                                        <router-link :to="'/horse/updateBaseInfo'">
                                            修改
                                        </router-link>
                                        <a @click="centerDialogVisible = true">删除</a>
                                    </td>
                            </tr>
                            <tr>
                                <td>12345678</td>
                                <td>马大姐</td>
                                <td>女</td>
                                <td>马二姐</td>
                                <td>1995年11月</td>
                                <td>1995</td>
                                <td>俄罗斯</td>
                                <td>100</td>
                                <td>白色</td>
                                <td>234567</td>
                                <td>有效 <td>
                                        <router-link :to="{path: '/horse/updateBaseInfo',       
                                                 query: { disable: 1,}}"> 查看</router-link>
                                        <router-link :to="'/horse/updateBaseInfo'">
                                            修改
                                        </router-link>
                                          <a @click="centerDialogVisible = true">删除</a>
                                    </td>
                            </tr>
                            <tr>
                                <td>12345678</td>
                                <td>马大姐</td>
                                <td>女</td>
                                <td>马二姐</td>
                                <td>1995年11月</td>
                                <td>1995</td>
                                <td>俄罗斯</td>
                                <td>100</td>
                                <td>白色</td>
                                <td>234567</td>
                                <td>有效 <td>
                                        <router-link :to="{path: '/horse/updateBaseInfo',       
                                                 query: { disable: 1,}}"> 查看</router-link>
                                        <router-link :to="'/horse/updateBaseInfo'">
                                            修改
                                        </router-link>
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
        </div>
        <el-dialog title="提示" :modal-append-to-body="false" :visible.sync="centerDialogVisible" width="20%" center>
           <div class="text-center"><span>确定要删除吗?</span></div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { Pagination, Dialog } from "element-ui";
/* eslint-disable */
export default {
  data() {
    return {
      centerDialogVisible: false,
      currentPage: 1
    };
  },
  components: {
    "el-pagination": Pagination,
    "el-dialog": Dialog
  }
};
</script>

<style lang="scss" scoped>

</style>
