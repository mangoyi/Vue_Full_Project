<template>
  <div class="content_page animated zoomIn">
    <div class="content-title">
      <div class="title">修改模板</div>
      <router-link class="btn btn-info back" :to="'/smsmanage/SmsTemplate'">
        返回
      </router-link>
    </div>
    <div class="content-show">
      <div class="row list-search">
        <div class="col-md-4 search-field">
          <div class="label">模板名称：</div>
          <input type="text" v-model.trim="appointTitle" class="form-control input-field" placeholder="请输入模板标题" />
        </div>
      </div>
      <div class="row list-search">
        <div class="col-md-12 search-field">
          <div class="label">模板内容：</div>
          <input type="text" v-model.trim="appointText" class="form-control input-field" placeholder="请输入短信内容" />
        </div>
      </div>
    </div>
    <div class="content-footer row">
      <el-button class="col-md-1 btn btn-primary makesure" :plain="true" @click="open">提交</el-button>
    </div>
  </div>
</template>
<script>
import { DatePicker, Button } from "element-ui";
import axios from 'axios';
/* eslint-disable */
export default {
  data() {
    return {
     appointTitle:'',
     appointText:'',
     url: ''
    };
  },
  components: {
    "el-date-picker": DatePicker,
    "el-button": Button,
  },
  mounted() {
      this.init();
  },
  methods: {
    open() {
      if(this.appointTitle != "" && this.appointText != "") {
        
        /*
        axios.post("/api/home/addSmsTemplate", {
            "appointTitle": this.appointTitle,
            "appointText": this.appointText
        }).then((response) => {
            let res = response.data;
            console.log(res);
        });
        */  
        this.$message.success("修改成功");
      } else {
          this.$message.error("请填写所有的内容!");
      }
    },

    init() {
        let smsTempLateId = this.$route.query.smsTempLateId;
        
        /* 
        axios.post("/api/home/updateSmsTemplate", {
            smsTemplateId: smsTemplateId
        }).then((response) => {
            let res = response.data;
            console.log("获取数据成功！");
        });
        */
    }

  }
};
</script>

<style lang="scss" scoped>

</style>
