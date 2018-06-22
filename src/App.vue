<template>
  <router-view>
  </router-view>
</template>

<script>
/* eslint-disable */
export default {
  name: 'app'
}
</script>

<style lang="scss">
// .fc-day-grid-container{
//   height: 610px!important;
//   overflow: hidden!important;
// }
// .fc-week{
//   height: 100px!important;
// }

// .el-select-dropdown__item{
//   height: 60px;
// }

.fc-title{
  color:#fff;
}
.fc-day-header{
    height: 30px;
    line-height: 30px;
    font-size: 18px;

}
.fc-state-disabled {
    opacity: .45;
}
.fc-button {
  background: #20A8D8;
  color: #fff;
  width:50px;
}
.el-dialog{
  border-radius:5px;
}
// .el-select-dropdown{
//   min-width: 453px!important;
// }

.comp-full-calendar {
  box-sizing: content-box;
  max-width: 100%;
  background: #E5ECDA
}

// //重写日历样式
// .full-calendar-header .header-center {
//   font-size: 16px
// }

// .full-calendar-body .dates .dates-events .events-week .events-day .event-box .more-link {
//   color: red
// }


// .full-calendar-body .weeks {
//   height: 40px;
//   border-radius: 5px 5px 0 0;
//   line-height: 40px;
//   background: #ECF0CB
// }

// .full-calendar-body .dates .more-events {
//   width: 230px;
//   border: none;
//   box-shadow: none;
// }

// .full-calendar-body .dates .dates-events .events-week .events-day .event-box .event-item {
//   background: #3794E6;
//   color: #ddd;
// }

.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}

.el-field-input {
  width: 100%;
}

.input-field {
  border-radius: 5px;
  height: 40px;
}

.align-items-center {
  // background-image: url(/static/img/admin-bg2.png);
  background-image: url(/static/img/admin_bg.jpg);
  background-size: 100% 100%;
  // filter:blur(5px);
}

.el-button.is-plain:hover,
.el-button.is-plain:focus {
  background: #20a8d8;
  color: #fff;
}

.content-footer {
  position: relative;
  left: 50%;
  bottom: 10px;
  text-align: center;
  .makesure {
    background: #20a8d8;
    color: #fff;
    font-size: 16px;
  }
}

.el-textarea.is-disabled .el-textarea__inner,.el-input.is-disabled .el-input__inner {
  background-color: #cfd8dc
}

.back {
  float: right;
  margin-top: -4px;
}

.wait-loading {
  text-align: center;
  margin-top: 20px;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  // border: 1px solid #ddd;
  font-size: 28px;
  color: #8c939d; // width: 441px;
  // height: 200px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 441px;
  height: 180px;
  display: block;
}

.astyle {
  width: 30px;
  height: 30px;
  padding: 15px;
  color: #fff;
  text-decoration: none;
  &:hover {
    color: #fff;
    text-decoration: none;
  }
}

input:focus {
  border-color: #409EFF
}

.modal-content {
  border-radius: 10px;
  .modal-body {
    font-size: 16px;
    text-align: center;
  }
}

.btn {
  border-radius: 5px;
  cursor: pointer;
}

.content_page {
  background-color: #fff;
  min-height: 100%;
  border: 1px solid #cfd8dc;
  .table {
    line-height: 2rem;
    font-size: 14px;
    tr {
      th {
        text-align: center
      }
      td {
        text-align: center;
        a {
          cursor: pointer;
          color: #20a8d8;
          &:hover {
            color: #1985ac;
          }
        }
      }
    }
  }
  .content-title {
    border-radius: 5px;
    padding-left: 20px;
    padding-right: 20px;
    padding: 0.65rem 1.25rem;
    margin-bottom: 12px;
    background-color: #DCEDF5;
    border-bottom: 1px solid #cfd8dc;
    .title {
      font-size: 16px;
      font-weight: bold;
      display: inline-block;
      &-sub {
        font-size: 14px;
        font-weight: normal;
        margin-left: 30px;
        display: inline-block;
      }
    }

    .controls {
      float: right;
      margin-top: -5px;
      .btn-info {
        background: #337ab7;
        border-color: #337ab7;
      }
    }
  }
  .content-show {
    padding: 20px;
    .list-search {
      padding: 0 15px;
      .search-field {
        position: relative;
        padding-left: 75px;
        margin-bottom: 1em;
        &_controls {
          padding-left: 0;
        }
        .label {
          // width: 78px;
          position: absolute;
          left: -6px;
          top: 8px;
          text-align: right;
        }
        .search-btn {
          cursor: pointer;
          margin-left: 15px; // width: 100%;
        }
      }
    }
    .list-empty {
      width: 100%;
      text-align: center;
      border: 1px solid #cfd8dc;
      border-top: none;
      line-height: 30px;
      background: #eceff1;
    }
    .table {
      margin-bottom: 0;
    }
    .page {
      float: right;
      margin-top: 20px;
      .itemCount {
        position: absolute;
        right: 0;
        line-height: 35px;
      }
    }
    .detail-table {
      border: 1px solid #ddd;
      border-bottom: none;
      line-height: 35px;
      .item {
        border-bottom: 1px solid #DDD;
        position: relative;
        padding-left: 0;
        .key {
          display: block;
          width: 75px;
          text-align: center;
          background-color: #e4e4e4;
          position: absolute;
        }
        .value {
          width: 100%;
          text-align: center;
          display: block;
          padding-left: 75px;
        }
      }
    }
  }
}

// 增加聊天记录width
.el-notification {
  width: 470px;
}
.el-notification__content {
  max-height: 600px;
  overflow: auto;
}

// 重写进度条样式
// .content-show .el-progress-bar__inner:nth-child(1){
//   background: red;
// }
.el-progress__text {
  margin-left: 8px;
}

// 重写穿梭框样式
.el-transfer {
  height: 360px;
}
.el-transfer-panel ,.el-transfer-panel__body, .el-checkbox-group{
  height: inherit !important;
}

// 重写input输入框样式
.el-date-editor.el-input, .el-date-editor.el-input__inner {
  width: 100% !important;
}

// 任务列表按钮disabled
.btn-primary.disabled, .btn-primary:disabled,
.btn-warning.disabled, .btn-warning:disabled,
.btn-danger.disabled, .btn-danger:disabled{
  background-color: #cccccc;
  border-color: #cccccc;
}

// 表格中字体
.content_page .table {
  font-size: 12px;
}

// taskDetail
.yi-tDetailOption .el-input--medium .el-input__inner{
    height: 40px;
    line-height: 40px;
}
</style>

