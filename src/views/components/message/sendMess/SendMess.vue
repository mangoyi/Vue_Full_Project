<template>
  <div class="content_page animated zoomIn">
    <div class="content-title">
      <div class="title">短信发送</div>
      <router-link class="btn btn-info back" :to="'/message/messModal'">
        返回
      </router-link>
    </div>
    
    <div class="content-show">
      <div class="row list-search">
        <div class="col-md-2">
            <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                multiple
                :limit="1"
                :on-exceed="handleExceed"
                >
                <el-button size="small" type="primary">导入号码</el-button>
                <div slot="tip" class="el-upload__tip">只能上传txt/xls/xlsx文件，且不超过500kb</div>
            </el-upload>
        </div>
        <div class="col-md-4">
            <a style="margin-left: 10px; color: rgb(0,192,239)" href="filetmp/tel.xls">点击下载xls模板>>></a>
            <a style="margin-left: 10px; color: rgb(0,192,239)" href="filetmp/tel.txt" download="tel.txt">点击下载txt模板>>></a>
        </div>
      </div>
      <div class="row list-search">
        <div class="col-md-12 search-field">
            <div class="label">发送号码：</div>
            <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
                v-model="number">
            </el-input>
        </div>
      </div>
      <div class="row list-search">
      
        <div class="col-md-4 search-field">
          <div class="label">模板ID：</div>
          <input type="text" v-model="contactPer" class="form-control input-field" placeholder="请点击右侧选择模板" />
          <span class="cright" style="display:inline-block; float:right;">点击选择模板ID</span>
        </div>
      </div>
      
      <div class="row list-search">
        <div class="col-md-12 search-field">
          <div class="label">模板内容：</div>
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="textarea">
          </el-input>
        </div>
      </div>
      
      <div class="row list-search">
        <div class="col-md-3 search-field">
          <div class="label">号码数量：</div>
          <input type="text" v-model="contactWay" class="form-control input-field" />
        </div>
        <div class="col-md-3 search-field">
          <div class="label">计费数量：</div>
          <input type="text" v-model="contactWay" class="form-control input-field" />
        </div>
        <div class="col-md-3 search-field">
          <div class="label">可用短信：</div>
          <input type="text" v-model="contactWay" class="form-control input-field" />
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
/* eslint-disable */
export default {
  data() {
    return {
     appointTime:'',
     appointDesc:'',
     appointNum:'',
     note:'',
     contactPer:'',
     contactWay:'',
     textarea: '',
     number: ''
    };
  },
  components: {
    "el-date-picker": DatePicker,
    "el-button": Button,
  },
  methods: {
    open() {
      this.$message.success("修改成功");
    },
    handleRemove(file, fileList) {
        console.log(file, fileList);
    },
    handlePreview(file) {
        console.log(file);
    },
    handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
    }

  }
};
</script>

<style lang="scss" scoped>

</style>
