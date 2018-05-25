<template>
  <div class="content_page animated zoomIn">
    <div class="content-title">
      <div class="title">新增短信模板</div>
      <router-link class="btn btn-info back" :to="'/message/messModal'">
        返回
      </router-link>
    </div>
    <div class="content-show">
      <div class="row list-search">
        <div class="col-md-4 search-field">
          <div class="label">模板标题：</div>
          <input type="text" v-model="appointTitle" class="form-control input-field" placeholder="请输入模板标题" />
        </div>
        <div class="col-md-4 search-field">
          <div class="label">模板签名：</div>
          <input type="text" v-model="appointDesc" class="form-control input-field" placeholder="请输入签名" />

        </div>
      </div>
      <div class="row list-search">
        <div class="col-md-12 search-field">
          <div class="label">短信内容：</div>
          <input type="text" v-model="note" class="form-control input-field" placeholder="请输入短信内容" />
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
     appointDesc:'',
     note:''
    };
  },
  components: {
    "el-date-picker": DatePicker,
    "el-button": Button,
  },
  methods: {
    open() {
      axios.post("/user/ModelAdd", {
        appointTitle: appointTitle,
        appointDesc: appointDesc,
        note: note
      }).then((response) => {
        let res = response.data;
        console.log(res);
      });
      this.$message.success("修改成功");
    },

  }
};
</script>

<style lang="scss" scoped>

</style>
