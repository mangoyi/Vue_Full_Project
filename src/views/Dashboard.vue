<template>
  <div class="animated fadeIn content_page fluid">
    <p class="title">任务进度</p>
    <div class="content-show" style="padding-left: 0px;">
      <div class="row list-search">
        <div class="col-md-4 search-field well" v-for="item in percentlist" :key="item.id">
            <!-- <div style="left:0px;top:-2px" class="label">{{item.taskName}}</div> -->
            <p class="taskName">{{item.taskName}}</p>
            <p class="taskAmount">{{item.complete}}/{{item.total}}</p>
            <div>
              <el-progress :percentage="item.taskPercent" :color="item.color" :stroke-width="14"></el-progress>
            </div>
        </div>
      </div>
    </div>
    <hr />
    <div id="taskChart">
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  import data1 from "@/../mock/mock-dashTaskpercent.json";

  export default {
    name: 'hello',
    data() {
      return {
        msg: "Welcom to Your Vue.js App",

        // percentlist
        percentlist: [],

        // canvasdata
        taskArr: ['上海移动','北京联通','合肥银行','南京银行','中兴银行'],
        recent:  ['周一','周二','周三','周四','周五','周六','周日'],
        seriesArr: [
              {
                  name:'上海移动',
                  type:'line',
                  stack: '总量',
                  data:[120, 132, 101, 134, 90, 230, 210]
              },
              {
                  name:'北京联通',
                  type:'line',
                  stack: '总量',
                  data:[220, 182, 191, 234, 290, 330, 310]
              },
              {
                  name:'合肥银行',
                  type:'line',
                  stack: '总量',
                  data:[150, 232, 201, 154, 190, 330, 410]
              },
              {
                  name:'南京银行',
                  type:'line',
                  stack: '总量',
                  data:[320, 332, 301, 334, 390, 330, 320]
              },
              {
                  name:'中兴银行',
                  type:'line',
                  stack: '总量',
                  data:[820, 932, 901, 934, 1290, 1330, 1320]
              }
          ]
      }
    },
    mounted() {
      this.initdata();    
    }, 
    methods: {
      initdata() {
        this.percentlist = data1.data.list;
        this.drawTaksPercent();
        this.drawTaskLine();
      },
      drawTaksPercent() {
        /* 
          let _this = this;
          axios.post("/api/api/task/taskPercent", {
          }).then((response) => {
            let res = response.data;
            if (res.status == 0) {
              _this.percentlist = res.data.list;
            }
          });
        */
      },
      drawTaskLine() {
        // axios.post("/api/api/task/taskChart", {
        // }).then((response) => {
        //   let res = response.data;
        //   if (res.status == 0) {
        //     let data = res.data;
        //   }
        // })
        
        
        // 基于DOM，初始化echarts实例
        let taskChart = this.$echarts.init(document.getElementById('taskChart'));

        let dom = document.getElementById("taskChart");
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
              data: this.taskArr                                        // 任务名
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
              data: this.recent                                         // 日期
          },
          yAxis: {
              type: 'value'
          },
          series: this.seriesArr                                        // 详细信息
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
    height: 300px;
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
