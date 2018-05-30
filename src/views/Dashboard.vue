<template>
  <div class="animated fadeIn content_page fluid">
    <p class="title">任务进度</p>
    <div class="content-show" style="padding-left: 0px;">
      <div class="row list-search">
        <div class="col-md-4 search-field">
            <div style="left:0px;top:-2px" class="label">上海移动：</div>
            <el-progress :percentage="80" :color="acd" :stroke-width="14"></el-progress>
        </div>
        <div class="col-md-4 search-field">
            <div style="left:0px;top:-2px" class="label">北京联通：</div>
            <el-progress :percentage="40" color="#2f4554" :stroke-width="14"></el-progress>
        </div>
        <div class="col-md-4 search-field">
            <div style="left:0px;top:-2px" class="label">合肥银行：</div>
            <el-progress :percentage="90" color="#61a0a8" :stroke-width="14"></el-progress>
        </div>
        <div class="col-md-4 search-field">
            <div style="left:0px;top:-2px" class="label">南京银行：</div>
            <el-progress :percentage="10" color="#d48265" :stroke-width="14"></el-progress>
        </div>
        <div class="col-md-4 search-field">
            <div style="left:0px;top:-2px" class="label">中兴银行：</div>
            <el-progress :percentage="20" color="#91c7ae" :stroke-width="14"></el-progress>
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

  export default {
    name: 'hello',
    data() {
      return {
        msg: "Welcom to Your Vue.js App",

        // canvasdata
        taskArr: ['上海移动','北京联通','合肥银行','南京银行','中兴银行'],
        acd: "#c23531",
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
        
        /*
        axios.post("/api/api/console/lineChart", {
        }).then((response) => {
          let res = response.data;
          console.log(请求成功);
        })
        */
        this.drawTaskLine();
        
      },
      drawTaskLine() {
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
              data: this.taskArr
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
              data: ['周一','周二','周三','周四','周五','周六','周日']
          },
          yAxis: {
              type: 'value'
          },
          series: this.seriesArr 
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
</style>
