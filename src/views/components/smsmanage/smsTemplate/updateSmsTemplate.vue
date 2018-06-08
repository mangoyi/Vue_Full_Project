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
          <div class="label">模板ID：</div>
          <input type="text" v-model.trim="smsId" class="form-control input-field" placeholder="请输入模板ID" disabled />
        </div>
        <div class="col-md-4 search-field">
          <div class="label">模板名称：</div>
          <input type="text" v-model.trim="smsName" class="form-control input-field" placeholder="请输入模板标题" />
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
      <el-button class="col-md-1 btn btn-primary makesure" :plain="true" @click="update">提交</el-button>
    </div>
  </div>
</template>
<script>
import {Button } from "element-ui";
import axios from 'axios';
import smsTemplateSrv from "@/../src/views/services/smsTemplate.service.js";

/* eslint-disable */
export default {
  data() {
    return {
     smsId: '',
     smsName:'',
     smsText:''
    };
  },
  components: {
    "el-button": Button
  },
  beforeRouteEnter:(to, from, next) => {
      next(vm => {
        smsTemplateSrv.getTemplate(vm.$route.query.smsTempLateId).then(resp => {
          let data = resp.data.list[0];
          vm.smsId = data.smsTempLateId;
          vm.smsName = data.smsTempLateName;
          vm.smsText = data.smsTemplateText;
        }, error => {
          vm.$message.error(err.msg);
        })
      });
  },
  methods: {
    update() {
      let smsName = this.smsName; 
      let smsText = this.smsText;
      let smsId = this.smsId;
      if (smsName && smsText) {
        smsTemplateSrv.updateTemplate(smsId, smsName, smsText).then(resp => {
          console.log(resp);
          this.$message.success("更新成功");
        }, err => {
          this.$message.error(err.msg);
        })
      } else {
          this.$message.error("请填写所有的内容!");
      }

    }

  }
};
</script>

<style lang="scss" scoped>

</style>
