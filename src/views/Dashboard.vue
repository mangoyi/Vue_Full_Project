<template>
    <div class="animated fadeIn content_page fluid">
        <p class="title">任务进度</p>
        <div class="content-show" style="padding-left: 0px;">
            <div class="row list-search">
                <div class="col-md-3 well" v-for="item in percentlist" :key="item.id">
                    <p class="taskName">{{item.TaskName}}</p>
                    <div class="yi-taskPercent_wrap">
                        <div class="yi-taskPercent">
                            <el-progress :percentage="Number(item.Percent)" :color="item.Color" :stroke-width="18"
                                         :text-inside="true"></el-progress>
                        </div>
                        <div class="yi-taskComplete">
                            ({{item.Complete}}/{{item.Total}})
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <hr/>
        <div id="taskChart" ref="chart">
        </div>
    </div>
</template>

<script>
import {Progress, Loading} from "element-ui";
import dashBoardSrv from "@/../src/views/services/dashBoard.service.js";

export default {
    name: 'hello',
    data() {
        return {
            percentlist: [],
            taskArr: [],
            date: [],
            seriesArr: []
        }
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            // 加载动画 fl----6.27
            let loading = {};
            loading = vm.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.5)'
            });
            dashBoardSrv.taskPercent().then(resp => {
                vm.percentlist = resp.data.list;
                loading.close();
            }, err => {
                vm.$message.error(err.msg);
            });

            dashBoardSrv.taskLine().then(resp => {
                let data = resp.data.taskChart;
                vm.date = data.date;
                let tempSeries = data.series;
                tempSeries.map((item, index) => {
                    if (index === 2) {
                        item["yAxisIndex"] = 1;
                    }
                    return item;
                });
                vm.drawCanvas(vm.date, tempSeries);
            });
        });
    },
    methods: {
        drawCanvas(date, series) {
            // 基于DOM，初始化echarts实例
            let dom = this.$refs["chart"];
            let myChart = this.$echarts.init(dom);
            let app = {};
            let option = null;
            option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            color: '#999'
                        }
                    },
                    formatter: function(params, ticket, callback) {     // 修改echart提示框浮层数据样式
                        let showContent = '';
                        params.map((item, index) => {
                            let showName = item['seriesName'];
                            let showValue = '';
                            index === 2 ? showValue = item['value'] + "%" : showValue = item['value'];
                            showContent += item.marker + showName + ":" + showValue + "<br />";
                        });
                        return showContent;
                    }
                },
                toolbox: {
                    feature: {
                        saveAsImage: {show: true}
                    }
                },
                legend: {
                    data:['接通量','外呼量','接通率']
                },
                xAxis: [
                    {
                        type: 'category',
                        data: date,
                        axisPointer: {
                            type: 'shadow'
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: '呼叫量',
                        min: 0,
                        interval: 2000,
                        axisLabel: {
                            formatter: '{value}'
                        }
                    },
                    {
                        type: 'value',
                        name: '接通率',
                        min: 0,
                        max: 100,
                        interval: 20,
                        axisLabel: {
                            formatter: '{value} %'
                        }
                    }
                ],
                series: series
            }
            if (option && typeof option === "object") {
                myChart.setOption(option, true);
            }
            window.addEventListener("resize", function () {
                myChart.resize();
            });
        }
    }
}
</script>
<style scoped>
    .fluid {
        width: 100%;
        padding: 0 2% 100px 2%;
        background: #ffffff;
    }
    .title {
        padding-top: 16px;
        font-size: 17px;
        font-weight: 600;
        margin-left: 0px;
    }
    #taskChart {
        margin-top: 30px;
        width: 100%;
        height: 400px;
        text-align: center;
    }
    .well {
        min-height: 20px;
        padding: 10px;
        margin-bottom: 15px;
        margin-right: 10px;
        background-color: #f9f9f9;
        border: 1px solid #e3e3e3;
        border-radius: 2px;
        -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .05);
        box-shadow: inset 0 1px 1px rgba(0, 0, 0, .05);
    }
    .yi-taskPercent_wrap {
        display: flex;
    }
    .yi-taskPercent {
        width: 82%;
    }
    .yi-taskComplete {
        width: 18%;
        line-height: 18px;
    }
</style>
