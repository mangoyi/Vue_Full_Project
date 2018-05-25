<template>
    <div class="animated fadeIn content_page">
        <div class="content-title">
            <div class="title">短信模板</div>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="col-md-3 search-field">
                    <div class="label" style="left:0px;">关键字：</div>
                    <el-input v-model="input" placeholder="请输入内容"></el-input>
                </div>
                <div class="col-md-1 search-field search-field_controls">
                    <button class="btn btn-primary search-btn">搜索</button>
                </div>
                <div class="col-md-1 search-field search-field_controls">
                    <button class="btn btn-primary search-btn">下载明细</button>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <table class="table table-bordered table-striped table-sm">
                        <thead>
                            <tr>
                                <th>任务ID</th>
                                <th>发送数量</th>
                                <th>任务内容</th>
                                <th>提交时间</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>21</td>
                                <td>人事助手</td>
                                <td>2018年年会节目征集已经开始啦，参与活动有机会获得神秘大奖，有意向的同事可前往人事处报名参与。期待您的到来~</td>
                                <td>2018/2/1 9:13:06</td>
                                <td>
                                    <router-link :to="{path: '/message/QueryTask',       
                                                 query: { disable: 1,}}"> 查看</router-link>
                                </td>
                            </tr>
                            <tr>
                                <td>81</td>
                                <td>上海联通</td>
                                <td>上海联通祝您新年快乐，万事如意，万事大吉，身体健康，狗年快乐，年年有余，岁岁平安，合家幸福，六六大顺，笑口常开，事事顺心，恭喜发财。</td>
                                <td>2018/2/4 13:40:29</td>
                                <td>
                                    <router-link :to="{path: '/message/QueryTask',       
                                                 query: { disable: 1,}}"> 查看</router-link>
                                </td>
                            </tr>
                            <tr>
                                <td>81</td>
                                <td>上海联通</td>
                                <td>上海联通祝您新年快乐，万事如意，万事大吉，身体健康，狗年快乐，年年有余，岁岁平安，合家幸福，六六大顺，笑口常开，事事顺心，恭喜发财。</td>
                                <td>2018/2/1 9:13:50</td>
                                <td>
                                    <router-link :to="{path: '/message/QueryTask',       
                                                 query: { disable: 1,}}"> 查看</router-link>
                                </td>
                            </tr> 
                            <tr>
                                <td>81</td>
                                <td>上海联通</td>
                                <td>上海联通祝您新年快乐，万事如意，万事大吉，身体健康，狗年快乐，年年有余，岁岁平安，合家幸福，六六大顺，笑口常开，事事顺心，恭喜发财。</td>
                                <td>2018/2/4 13:40:29</td>
                                <td>
                                    <router-link :to="{path: '/message/QueryTask',       
                                                 query: { disable: 1,}}"> 查看</router-link>
                                </td>
                            </tr> 
                            <tr>
                                <td>81</td>
                                <td>上海联通</td>
                                <td>上海联通祝您新年快乐，万事如意，万事大吉，身体健康，狗年快乐，年年有余，岁岁平安，合家幸福，六六大顺，笑口常开，事事顺心，恭喜发财。</td>
                                <td>2018/2/4 13:40:29</td>
                                <td>
                                    <router-link :to="{path: '/message/QueryTask',       
                                                 query: { disable: 1,}}"> 查看</router-link>
                                </td>
                            </tr>  
                            <tr>
                                <td>81</td>
                                <td>上海联通</td>
                                <td>上海联通祝您新年快乐，万事如意，万事大吉，身体健康，狗年快乐，年年有余，岁岁平安，合家幸福，六六大顺，笑口常开，事事顺心，恭喜发财。</td>
                                <td>2018/2/4 13:40:29</td>
                                <td>
                                    <router-link :to="{path: '/message/QueryTask',       
                                                 query: { disable: 1,}}">查看</router-link>
                                </td>
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
