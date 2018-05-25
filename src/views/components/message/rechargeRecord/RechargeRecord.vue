<template>
    <div class="animated fadeIn content_page">
        <div class="content-title">
            <div class="title">充值记录</div>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="col-md-3 search-field">
                    <div class="label" style="left:0px;">充值金额：</div>
                    <el-input v-model="input" placeholder="请输入内容"></el-input>
                </div>
                <div class="col-md-1 search-field search-field_controls">
                    <button class="btn btn-primary search-btn">搜索</button>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <table class="table table-bordered table-striped table-sm">
                        <thead>
                            <tr>
                                <th>充值金额</th>
                                <th>充值数量</th>
                                <th>充值方式</th>
                                <th>充值类型</th>
                                <th>充值时间</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>21</td>
                                <td>人事助手</td>
                                <td>签名</td>
                                <td>2018/2/1 9:13:50</td>
                                <td>admin进行审核</td>
                            </tr>
                            <tr>
                                <td>81</td>
                                <td>上海联通</td>
                                <td>2018/2/4 13:40:29</td>
                                <td>审核通过</td>
                                <td>admin进行审核</td>
                            </tr>
                            <tr>
                                <td>81</td>
                                <td>上海联通</td>
                                <td>2018/2/4 13:40:29</td>
                                <td>2018/2/1 9:13:50</td>
                                <td>admin进行审核</td>
                            </tr> 
                            <tr>
                                <td>81</td>
                                <td>上海联通</td>
                                <td>2018/2/4 13:40:29</td>
                                <td>审核通过</td>
                                <td>admin进行审核</td>
                            </tr> 
                            <tr>
                                <td>81</td>
                                <td>上海联通</td>
                                <td>上海联通</td>
                                <td>2018/2/1 9:13:50</td>
                                <td>审核通过</td>
                            </tr>  
                            <tr>
                                <td>81</td>
                                <td>上海联通</td>
                                <td>上海联通</td>
                                <td>2018/2/4 13:40:29</td>
                                <td>审核通过</td>
                            </tr>                                                
                        </tbody>
                    </table>
                    <div class="page">
                        <el-pagination background layout="prev, pager, next" :total="1000">
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog title="提示" :modal-append-to-body="false" :visible.sync="centerDialogVisible" width="20%" center>
            <div class="text-center">
                <span>确定要取消吗?</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { Pagination, DatePicker, Button, Input} from "element-ui";
/* eslint-disable */
export default {
    data() {
        return {
            value1:'',
            centerDialogVisible: false,
            currentPage: 1,
            input: ''
        };
    }
};
</script>

<style lang="scss" scoped>

</style>
