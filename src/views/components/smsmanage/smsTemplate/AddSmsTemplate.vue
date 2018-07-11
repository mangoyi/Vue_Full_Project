<template>
    <div class="content_page animated zoomIn yi_addUser">
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
                  <input type="text" v-model.trim="smsTemplateId" class="form-control input-field" placeholder="请输入模板ID" v-on:blur="checkTempId" />
              </div>
              <div class="col-md-4 search-field">
                  <div class="label">模板名称：</div>
                  <input type="text" v-model.trim="smsTemplateName" class="form-control input-field" placeholder="请输入模板标题" />
              </div>
          </div>
          <div class="row list-search">
              <div class="col-md-12 search-field">
                  <div class="label">模板内容：</div>
                  <input type="text" v-model.trim="smsTemplateText" class="form-control input-field" placeholder="请输入短信内容" />
              </div>
          </div>
        </div>
        <div class="content-footer row yi_footer">
            <span :class="{'temp-info-error animated shake':tempId_err}" v-show="tempId_err">登录名重复，请修改</span>
        </div>
        <div class="content-footer row">
            <el-button class="col-md-1 btn btn-primary makesure" :plain="true" @click="conTemplate" :disabled="tempId_err">提交</el-button>
        </div>
    </div>
</template>
<script>
import { Button } from "element-ui";
import smsTemplateSrv from "@/../src/views/services/smsTemplate.service.js";

/* eslint-disable */
export default {
    data() {
        return {
            smsTemplateId: '',
            smsTemplateName:'',
            smsTemplateText:'',
            tempId_err: false
        };
    },
    components: {
        "el-button": Button
    },
    methods: {
        conTemplate() {
            let smsTemplateId = this.smsTemplateId;
            let smsTemplateName = this.smsTemplateName;
            let smsTemplateText = this.smsTemplateText;
            if( !!smsTemplateId && !!smsTemplateName && !!smsTemplateText) {
              smsTemplateSrv.addTemplate( smsTemplateId , smsTemplateName, smsTemplateText).then(resp => {
                  this.$message.success("新增模板成功!");
                  this.$router.push("/smsmanage/SmsTemplate");
              }, err => {
                  this.$message.error(err.msg);
              });
            } else {
                this.$message.error("请填写所有的内容!");
            }
        },
        checkTempId() {
            smsTemplateSrv.checkTempId(this.smsTemplateId).then(resp => {
                this.tempId_err = true;
            }, err => {
                // 不存在
                this.tempId_err = false;
            })
        }
    }
};
</script>

<style>
    .temp-info-error {
        background: #F2DEDE;
        text-align: center;
        font-size: 14px;
        color: red;
        height: 30px;
        border-radius: 5px;
        line-height: 30px;
        padding: 0 10px;
    }
    .yi_addUser .content-footer {
        position: relative;
        left: 0;
        bottom: 10px;
        text-align: center;
        justify-content: center;
    }
    .yi_addUser .yi_footer {
        margin-bottom: 14px;
    }

</style>
