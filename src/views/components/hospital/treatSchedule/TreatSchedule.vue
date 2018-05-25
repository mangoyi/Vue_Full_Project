<template>
    <div class="animated fadeIn content_page">
        <div class="content-title">
            <div class="title">门诊治疗管理</div>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">治疗名称：</div>
                    <input type="text" class="form-control input-field" placeholder="请输入治疗名称" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">马匹名称：</div>
                    <input type="text" class="form-control input-field" placeholder="请输入马匹名称" />
                </div>
                <div class="col-md-1 search-field search-field_controls">
                    <button class="btn btn-primary search-btn">搜索</button>
                </div>
                <div class="col-md-1 search-field search-field_controls">
                    <router-link class="btn btn-success" :to="'/hospital/addTreat'">
                        新增
                    </router-link>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <table class="table table-bordered table-striped table-sm">
                        <thead>
                            <tr>
                                <th>门诊方式</th>
                                <th>预约号</th>
                                <th>马匹类型</th>
                                <th>马匹名称</th>
                                <th>治疗时间</th>
                                <th>治疗名称</th>
                                <th>治疗概述</th>
                                <th>手术室使用</th>
                                <th>设备使用</th>
                                <th>消耗品使用</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>预约</td>
                                <td>123</td>
                                <td>中心</td>
                                <td>大马</td>

                                <td>2016-11-09 9:00</td>
                                <td>治疗马</td>
                                <td>胃疼</td>
                                <td>一号手术室</td>
                                <td>
                                    <a @click="assetsDialog=true">查看详情</a>
                                </td>
                                <td>
                                    <a @click="consumeDialog=true">查看详情</a>
                                </td>
                                <td>
                                    <a @click="uploadDialog=true">添加病历</a>
                                    <router-link :to="{path: '/hospital/updateTreat',       
                                                             query: { disable:1,}}"> 查看</router-link>
                                    <router-link :to="'/hospital/updateTreat'">
                                        修改
                                    </router-link>
                                </td>
                            </tr>
                            <tr>
                                <td>预约</td>
                                <td>123</td>

                                <td>中心</td>
                                <td>大马</td>
                                <td>2016-11-09 9:00</td>
                                <td>治疗马</td>
                                <td>胃疼</td>
                                <td>一号手术室</td>
                                <td>
                                    <a @click="assetsDialog=true">查看详情</a>
                                </td>
                                <td>
                                    <a @click="consumeDialog=true">查看详情</a>
                                </td>
                                <td>
                                    <a @click="uploadDialog=true">添加病历</a>
                                    <router-link :to="{path: '/hospital/updateTreat',       
                                                                 query: { disable: 1,}}"> 查看</router-link>
                                    <router-link :to="'/hospital/updateTreat'">
                                        修改
                                    </router-link>
                                </td>
                            </tr>
                            <tr>
                                <td>普通</td>
                                <td>无</td>
                                <td>中心</td>
                                <td>大马</td>
                                <td>2016-11-09 9:00</td>
                                <td>治疗马</td>
                                <td>胃疼</td>
                                <td>一号手术室</td>
                                <td>
                                    <a @click="assetsDialog=true">查看详情</a>
                                </td>
                                <td>
                                    <a @click="consumeDialog=true">查看详情</a>
                                </td>
                                <td>
                                    <a @click="uploadDialog=true">添加病历</a>
                                    <router-link :to="{path: '/hospital/updateTreat',       
                                                               query: { disable: 1,}}"> 查看</router-link>
                                    <router-link :to="'/hospital/updateTreat'">
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
                    <!-- 添加病历 -->
                    <el-dialog title="添加病历" :modal-append-to-body="false" :visible.sync="uploadDialog" width="50%" center>
                        <div class="content-show text-center">
                            <div class="row mb-1 list-search">
                                <div class="col-md-4 search-field">
                                    <div class="label">时间：</div>
                                    <el-date-picker size="large" v-model="value" type="datetime" placeholder="选择日期时间">
                                    </el-date-picker>
                                </div>
                                <div class="col-md-4 search-field">
                                    <div class="label">地点：</div>
                                    <input type="text" class="form-control input-field" placeholder="请输入地点" />
                                </div>
                                <div class="col-md-4 search-field">
                                    <div class="label">临诊：</div>
                                    <input type="text" class="form-control input-field" placeholder="请输入临诊" />
                                </div>
                            </div>
                            <div class="row mb-1 list-search">
                                <div class="col-md-4 search-field">
                                    <div class="label">初诊：</div>
                                    <input type="text" class="form-control input-field" placeholder="请输入初诊" />
                                </div>
                                <div class="col-md-4 search-field">
                                    <div class="label">处方用药：</div>
                                    <input type="text" class="form-control input-field" placeholder="请输入处方用药" />
                                </div>
                                <div class="col-md-4 search-field">
                                    <div class="label">医嘱：</div>
                                    <input type="text" class="form-control input-field" placeholder="请输入医嘱" />
                                </div>
                            </div>
                            <div class="row mb-1 list-search">
                                <div class="col-md-4 search-field">
                                    <div class="label">标题标签：</div>
                                    <input type="text" class="form-control input-field" placeholder="请输入标题标签" />
                                </div>
                                <div class="col-md-4 search-field">
                                    <div class="label">备注：</div>
                                    <input type="text" class="form-control input-field" placeholder="请输入备注" />
                                </div>
                            </div>
                            <div class="row mb-1 list-search">
                                <div class="col-md-4 search-field">
                                    <div class="label">x光照片：</div>
                                    <upload-img :imageUrl="xRayImg">
                                    </upload-img>
                                </div>
                                <div class="col-md-4 search-field">
                                    <div class="label">数据照片：</div>
                                    <upload-img :imageUrl="dataImg">
                                    </upload-img>
                                </div>

                            </div>
                        </div>
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="uploadDialog = false">取 消</el-button>
                            <el-button type="primary" @click="uploadDialog = false">确 定</el-button>
                        </span>
                    </el-dialog>
                </div>
            </div>
        </div>
        <!-- 固定资产  -->
        <el-dialog title="提示" :modal-append-to-body="false" :visible.sync="assetsDialog" width="22%" center>
            <div class="text-center">
                <div class="row">
                    <div class="col-md-7">名称：固定资产使用</div>
                    <div class="col-md-5">数量：10</div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="assetsDialog = false">取 消</el-button>
                <el-button type="primary" @click="assetsDialog = false">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 显示消耗品 -->
        <el-dialog title="提示" :modal-append-to-body="false" :visible.sync="consumeDialog" width="22%" center>
            <div class="text-center">
                <div class="row">
                    <div class="col-md-7">名称：消耗品使用</div>
                    <div class="col-md-5">数量：5</div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="consumeDialog = false">取 消</el-button>
                <el-button type="primary" @click="consumeDialog = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { Pagination, Upload, DatePicker } from 'element-ui'
import UploadImg from '../../../../components/uploadImg/UploadImg.vue'
/* eslint-disable */
export default {
    data() {
        return {
            xRayImg:'',
            dataImg:'',
            consumeDialog: false,
            assetsDialog: false,
            value: '',
            uploadDialog: false,
            currentPage: 1,
            imageUrl: '',
            // imageUrl1:''
        }
    },
    components: {
        'el-pagination': Pagination,
        'el-upload': Upload,
        'el-date-picker': DatePicker,
         'upload-img': UploadImg
    },
    methods: {
        open() {
            this.$message.success('修改成功')
        },
    }
}
</script>

<style lang="scss" scoped>
.fieldInput {
    width: 90%;
}
</style>
