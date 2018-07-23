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
                            <el-popover trigger="hover" placement="right" >
                                <span class="robot-item robot-item-line" v-if="subitem.onLineState == '在线'" slot="reference">
                                    {{subitem.name}}<br />
                                    <img src="http://47.96.0.103:5000/APi/image/getimage?fileName=online.png" alt="error" width="17" height="24"><br />
                                    ({{subitem.onLineState}})
                                </span>
                                <span class="robot-item robot-item-offline" v-else-if="subitem.onLineState == '离线'" slot="reference">
                                    {{subitem.name}}<br />
                                    <img src="http://47.96.0.103:5000/APi/image/getimage?fileName=offline.png" alt="error" width="17" height="24" ><br />
                                    ({{subitem.onLineState}})
                                </span>
                                <span class="robot-item robot-item-unknow" v-else-if="subitem.onLineState == '未知'" slot="reference">
                                    {{subitem.name}}<br /> 
                                    <img src="http://47.96.0.103:5000/APi/image/getimage?fileName=unknow.png" alt="error" width="17" height="24"><br />
                                    ({{subitem.onLineState}})
                                </span>
                                <span>IP: {{subitem.ip}}</span>
                            </el-popover>
                        </div>      
                    </div>
                </el-card>
            </div>
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
    cursor: pointer;
}
.float-robot:hover {
    opacity: 0.7;
}
.robot-item-unknow {
    background: #909399;
}
</style>
