<template>
  <div class="content_page animated zoomIn">
    <div class="content-title">
      <div class="title">新增模板</div>
      <router-link class="btn btn-info back" :to="'/smsmanage/SmsTemplate'">
        返回
      </router-link>
    </div>
    <div class="content-show">
      <div class="row list-search">
        <div class="col-md-4 search-field">
          <div class="label">模板名称：</div>
          <input type="text" v-model="smsTemplateTitle" class="form-control input-field" placeholder="请输入模板标题" />
        </div>
        <!-- <div class="col-md-4 search-field">
          <div class="label">模板签名：</div>
          <input type="text" v-model="smsTemplateDesc" class="form-control input-field" placeholder="请输入签名" />
        </div> -->
      </div>
      <div class="row list-search">
        <div class="col-md-12 search-field">
          <div class="label">模板内容：</div>
          <input type="text" v-model="smsTemplateText" class="form-control input-field" placeholder="请输入短信内容" />
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
     smsTemplateTitle:'',
     smsTemplateText:''
    };
  },
  components: {
    "el-date-picker": DatePicker,
    "el-button": Button,
  },
  methods: {
    open() {
      if(this.smsTemplateTitle != "" && this.smsTemplateText != "") {
        axios.post("/api/api/sms/addSmsTemplate", {
            "smsTemplateTitle": this.smsTemplateTitle,
            "smsTemplateText": this.smsTemplateText
        }).then((response) => {
            let res = response.data;
            if (res.status == 0) {
              this.$message.success("新增模板成功");
            }
        });
      } else {
          this.$message.error("请填写所有的内容!");
      }
    },

  }
};
</script>

<style lang="scss" scoped>

</style>
