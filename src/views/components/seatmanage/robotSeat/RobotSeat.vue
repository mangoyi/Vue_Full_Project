<template>
    <div class="animated fadeIn content_page">
        <div class="content-title">
            <div class="title">机器人坐席</div>
        </div>
        <div class="content-show">
            <div class="dierban">
                <el-card class="box-card" v-for="(item, index) in taskList" :key="index">
                    <div slot="header" class="clearfix">
                        <span v-if="item.item1">任务: {{item.item2}}</span>
                        <span v-if="item.item1">({{item.item1}})</span>
                        <span v-else>空闲机器人</span>
                        <span class="robot-count">机器人个数: {{item.item4}}</span>
                    </div>
                    <div class="robot-wrapper">
                        <div class="float-robot" v-for="subitem in item.item3" :key="subitem">
                            <span class="robot-item robot-item-line" v-if="subitem.onLineState == '在线'">
                                {{subitem.name}}<br />
                                ({{subitem.onLineState}})
                            </span>
                            <span class="robot-item robot-item-offline" v-else-if="subitem.onLineState == '离线'">
                                {{subitem.name}}<br />
                                ({{subitem.onLineState}})
                            </span>
                            <span class="robot-item robot-item-unknow" v-else-if="subitem.onLineState == '未知'">
                                {{subitem.name}}<br />
                                ({{subitem.onLineState}})
                            </span>
                        </div>                       
                    </div>
                </el-card>
            </div>

            
            <!-- <div class="row list-search">
                <div class="col-md-3 search-field">
                    <div class="label" style="left:0px;">机器人ID：</div>
                    <el-input v-model="keyWord" placeholder="请输入机器人ID"></el-input>
                </div>
                <div class="col-md-1 search-field search-field_controls">
                    <button class="btn btn-primary search-btn" v-on:click.stop="searchList(1)">搜索</button>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <table class="table table-bordered table-striped table-sm">
                        <thead>
                            <tr>
                                <th>序列</th>
                                <th>机器人名称</th>
                                <th>机器人ID</th>
                                <th>工作状态</th>
                                <th>任务名称(任务ID)</th>
                                <th>在线状态</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in robotList" :key="index">
                                <td>{{index+(currentPage - 1)*10}}</td>
                                <td>{{item.rname}}</td>
                                <td>{{item.raccount}}</td>
                                <td>
                                    {{item.robotState == 0 ? "空闲中":"工作中"}}
                                </td>
                                <td>
                                    {{item.taskId}}
                                </td>
                                <td>{{item.onLineState}}</td>
                            </tr>                                          
                        </tbody>
                    </table>
                    <div class="page" v-show="(robotList.length > 0 && totalRecords > 10)">
                        <el-pagination 
                            background 
                            @current-change="searchList"
                            :current-page.sync="currentPage"
                            :page-size="pageSize"
                            layout="total, prev, pager, next"
                            :total="totalRecords"
                        >
                        </el-pagination>
                    </div>
                    <div class="info" v-show="robotList.length == 0">
                        请根据条件搜索任务列表  
                    </div>
                </div>
            </div>
            -->
        </div>
    </div>
</template>

<script>
import { Pagination, Input} from "element-ui";
import seatSrv from "@/../src/views/services/seat.service.js";

/* eslint-disable */
export default {
    data() {
        return {
            currentPage: 1,
            pageSize: 10,
            keyWord: "",
            robotList: [],
            totalRecords: 1,
            sequence: 1,

            // 模拟
            taskId: "10230",
            taskList: []
        };
    },
    beforeRouteEnter: (to, from, next) => {
        next(vm => {
            // seatSrv.robotSeat(vm.keyWord, vm.currentPage, vm.pageSize).then(resp => {
            //     let robotData = resp.data.pageInfo;
            //     vm.robotList = robotData.list;
            //     vm.totalRecords = robotData.totalRecords;
            // }, err => { 
            //     vm.$message.error(err.msg);
            // });
            seatSrv.robotWorksSeat().then(resp => {
                vm.taskList = resp.data.list;
                console.log(vm.taskList);
            })

        });
    },
    methods: {
        searchList(currentPage = this.currentPage) {
            seatSrv.robotSeat(this.keyWord, currentPage, this.pageSize).then(resp => {
                let robotData = resp.data.pageInfo;
                this.robotList = robotData.list;
                this.totalRecords = robotData.totalRecords;
                this.currentPage = currentPage;
            }, err => {
                this.$message.error(err.msg);
            })

        }
    }
};
</script>

<style lang="scss" scoped>
.info {
    padding-top: 14px;
    text-align: center;
    color: #666;
}
.robot-item {
    display: inline-block;
    width: 90px;
    margin-right: 10px;
    margin-bottom: 10px;
    padding: 10px 0;
    text-align: center;
    color: #ffffff;
    border-radius: 10px;
}
.robot-item-line {
    background: #67C23A;
}
.robot-item-offline {
    background: #F56C6C;
}
.robot-count {
    float: right;
}
.el-card {
    margin-bottom: 20px;
}
.float-robot {
    float: left;
}
.robot-item-unknow {
    background: #909399;
}
</style>
