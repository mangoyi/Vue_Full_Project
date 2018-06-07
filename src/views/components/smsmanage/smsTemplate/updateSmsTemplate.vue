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
          <input type="text" v-model.trim="smsTitle" class="form-control input-field" placeholder="请输入模板标题" />
        </div>
      </div>
      <div class="row list-search">
        <div class="col-md-12 search-field">
          <div class="label">模板内容：</div>
          <input type="text" v-model.trim="smsText" class="form-control input-field" placeholder="请输入短信内容" />
        </div>
      </div>
    </div>
    <div class="content-footer row">
      <el-button class="col-md-1 btn btn-primary makesure" :plain="true" @click="open">提交</el-button>
    </div>
  </div>
</template>
<script>
import {Button } from "element-ui";
import axios from 'axios';
/* eslint-disable */
export default {
  data() {
    return {
     smsTitle:'',
     smsText:'',
     queryId: ''
    };
  },
  components: {
    "el-button": Button
  },
  mounted() {
      this.init();
  },
  methods: {
    open() {
      alert(!this.smsTitle && !this.smsText);
      if(!this.smsTitle && !this.smsText) {
        this.$message.error("请填写所有的内容!");
      } else {
        this.$message.success("修改成功");
          /*
          axios.post("/api/api/sms/updateSmsTemplate", {
              "smsTemplateId": smsTempLateId
              "smsTitle": this.smsTitle,
              "smsText" : this.smsText
          }).then((response) => {
              let res = response.data;
              if (res.status == 0) {
                this.$message.success("修改成功");
              }
          });
          */  
      }
    },

    init() {
        let smsTempLateId = this.$route.query.smsTempLateId;
        let _this = this;
        /*
        axios.post("/api/api/sms/getSmsTemplate", {
            smsTemplateId: smsTempLateId
        }).then((response) => {
            let res = response.data;
            if (res.status == 0) {
              let data = res.data;
              _this.smsTitle == data.smsTemplateTitle;
              _this.smsText == data.smsTemplateText;
            }
        });
        */
    }

  }
};
</script>

<style lang="scss" scoped>

</style>
