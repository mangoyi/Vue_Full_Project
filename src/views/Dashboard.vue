<template>
  <div class="animated fadeIn content_page fluid">
    <p class="title">任务进度</p>
    <div class="content-show" style="padding-left: 0px;">
      <div class="row list-search">
        <div class="col-md-4 search-field well" v-for="item in percentlist" :key="item.id">
            <p class="taskName">{{item.taskName}}</p>
            <p class="taskAmount">{{item.complete}}/{{item.total}}</p>
            <div>
              <el-progress :percentage="Number(item.taskPercent)" :color="item.color" :stroke-width="14"></el-progress>
            </div>
        </div>
      </div>
    </div>
    <hr />
    <div id="taskChart" ref="chart">
    </div>
  </div>
</template>

<script>
  import {Progress } from "element-ui";
  import axios from "axios";
  import dashBoardSrv from "@/../src/views/services/dashBoard.service.js";

  export default {
    name: 'hello',
    data() {
      return {
        // percentlist
        percentlist: [],

        // canvasdata
        taskArr: [],
        taskRecent:[],
        seriesArr: []
      }
    },
    beforeRouteEnter (to, from, next) {
      next( vm => {
        dashBoardSrv.taskPercent().then(resp => {
          vm.percentlist = resp.data.list;
        }, err => {
          vm.$message.error(err.msg);
        });

        dashBoardSrv.taskLine().then(resp => {
          let data = resp.data.list[0];
          vm.taskArr = data.taskName;
          vm.taskRecent = data.taskRecent;
          vm.taskSeries = data.taskSeries;
          vm.drawCanvas(vm.taskArr, vm.taskRecent, vm.taskSeries);
        })
      });
    },
    methods: {
      drawCanvas(taskArr, taskRecent, seriesArr) {
        // 基于DOM，初始化echarts实例
        let dom = this.$refs["chart"];
        let myChart = this.$echarts.init(dom);
        let app = {};
        let option = null;
        option = {
          title: {
              text: '任务工作量'
          },
          tooltip: {
              trigger: 'axis'
          },
          legend: {
              data: taskArr                                        // 任务名
          },
          grid: {
              left: '3%',
              right: '4%',  
              bottom: '3%',
              containLabel: true
          },
          toolbox: {
              feature: {
                  saveAsImage: {}
              }
          },
          xAxis: {
              type: 'category',
              boundaryGap: false,
              data: taskRecent                                         // 日期
          },
          yAxis: {
              type: 'value'
          },
          series: seriesArr                                        // 详细信息
          };
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
    padding: 19px;
    margin-bottom: 20px;
    background-color: #f5f5f5;
    border: 1px solid #e3e3e3;
    border-radius: 4px;
    -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.05);
    box-shadow: inset 0 1px 1px rgba(0,0,0,.05);
  }
</style>
