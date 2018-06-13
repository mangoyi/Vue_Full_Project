<template>
  <navbar>
    <button class="navbar-toggler mobile-sidebar-toggler d-lg-none" type="button" @click="mobileSidebarToggle">&#9776;</button>
    <a class="navbar-brand"></a>
    <ul class="nav navbar-nav d-md-down-none">
      <li class="nav-item">
        <a class="nav-link navbar-toggler sidebar-toggler" @click="sidebarMinimize">&#9776;</a>
      </li>
    </ul>
    <ul class="nav navbar-nav ml-auto d-md-down-none">
      <li class="nav-item">
        <!-- <a @click="loginOut" class="nav-link pr-3">{{username}}</a> -->
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link nav-lick pr-3 yi-username">
            {{username}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a">修改密码</el-dropdown-item>
            <el-dropdown-item command="b">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </li>
    </ul>
    <el-dialog title="重置密码" :modal-append-to-body="false" :visible.sync="passwordDialog" width="25%" center>
        <div class="content-show text-center">
            <div class="row mb-1 list-search">
                <div class="col-md-12 search-field">
                    <div class="label">新密码：</div>
                    <input type="password" class="form-control input-field" placeholder="输入新密码" v-model="oldPwd" />
                </div>
            </div>
            <div class="row mb-1 list-search">
                <div class="col-md-12 search-field">
                    <div class="label yi-confirm">确认密码：</div>
                    <input type="password" class="form-control input-field" placeholder="请再次输入新密码" v-model="newPwd" />
                </div>
            </div>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="confirmUpdate">确 定</el-button>
        </span>
    </el-dialog>
  </navbar>
</template>
<script>
import { Dialog } from 'element-ui'
import navbar from './Navbar'
import { dropdown } from 'vue-strap'
import loginSrv from "@/../src/views/services/login.service.js";

/* eslint-disable */
export default {
  name: 'header',
  data() {
    return {
      username: "",
      passwordDialog: false,
      oldPwd: "",
      newPwd: ""
    }
  },
  components: {
    navbar,
    dropdown,
    'el-dialog': Dialog
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.username = window.sessionStorage.getItem('username');
    },
    loginOut(){
      this.$router.push('/pages/login');
    },
    handleCommand(command) {
      if (command == "a") {     // 修改密码
        this.passwordDialog = true;
      } else if(command == "b") {   // 退出登录
        this.$router.push("/pages/login");
      }
    },
    confirmUpdate() {
        if (this.oldPwd == this.newPwd && this.oldPwd) {
          loginSrv.updatePassword(this.username, this.newPwd).then(resp => {
            this.$message.success("密码修改成功!");
            this.passwordDialog = false;
          }, err => {
            this.$message.error(err.msg);
          });
        } else {
          this.$message.error("请确认密码一致!");
        }


    },
    sidebarToggle(e) {
      e.preventDefault()
      document.body.classList.toggle('sidebar-hidden')
    },
    sidebarMinimize(e) {
      e.preventDefault()
      document.body.classList.toggle('sidebar-minimized')
    },
    mobileSidebarToggle(e) {
      e.preventDefault()
      document.body.classList.toggle('sidebar-mobile-show')
    },
    asideToggle(e) {
      e.preventDefault()
      document.body.classList.toggle('aside-menu-hidden')
    }
  }
}
</script>

<style lang="scss">

.yi-username{
  margin-right: 20px;
}
.content-show {
    .list-search {
        .search-field {
            position: relative;
            padding-left: 75px;
            margin-bottom: 1em;
            .label {
                position: absolute;
                left: 20px;
                top: 8px;
                text-align: right;
            }
            .yi-confirm {
              left: 6px;
            }
        }
    }
}


</style>

