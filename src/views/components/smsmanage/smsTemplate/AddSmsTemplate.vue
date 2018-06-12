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
          <div class="label">模板ID：</div>
          <input type="text" v-model.trim="smsTemplateId" class="form-control input-field" placeholder="请输入模板ID" />
        </div>
        <div class="col-md-4 search-field">
          <div class="label">模板名称：</div>
          <input type="text" v-model.trim="smsTemplateName" class="form-control input-field" placeholder="请输入模板标题" />
        </div>
      </div>
      <div class="row list-search">
        <div class="col-md-12 search-field">
          <div class="label">模板内容：</div>
          <input type="text" v-model.trim="smsTemplateContent" class="form-control input-field" placeholder="请输入短信内容" />
        </div>
      </div>
    </div>
    <div class="content-footer row">
      <el-button class="col-md-1 btn btn-primary makesure" :plain="true" @click="conTemplate">提交</el-button>
    </div>
  </div>
</template>
<script>
import { Button } from "element-ui";
import axios from 'axios';
import smsTemplateSrv from "@/../src/views/services/smsTemplate.service.js";

/* eslint-disable */
export default {
  data() {
    return {
     smsTemplateId: '',
     smsTemplateName:'',
     smsTemplateContent:''
    };
  },
  components: {
    "el-button": Button
  },
  methods: {
    conTemplate() {
      let smsTemplateId = this.smsTemplateId;
      let smsTemplateName = this.smsTemplateName;
      let smsTemplateContent = this.smsTemplateContent;
      if( !!smsTemplateId && !!smsTemplateName && !!smsTemplateContent) {
        smsTemplateSrv.addTemplate( smsTemplateId , smsTemplateName, smsTemplateContent).then(resp => {
            this.$message.success("新增模板成功!");
            this.$router.push("/smsmanage/SmsTemplate");
        }, err => {
            this.$message.error(err.msg);
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
