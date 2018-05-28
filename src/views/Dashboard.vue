<template>
  <div class="fluid">
    <div class="taskrate">
      <div class="col-md-3">
      </div>
    </div>
    <div id="taskChart">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'hello',
    data() {
      return {
        msg: "Welcom to Your Vue.js App"
      }
    },
    mounted() {
      this.drawTaskLine();
    }, 
    methods: {
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
              data:['上海移动','北京联通','合肥银行','南京银行','中兴银行']
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
          series: [
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
          ]};
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
  #taskChart {
    margin-top: 30px;
    width: 100%;
    height: 300px;
    text-align: center;
  }  
</style>
