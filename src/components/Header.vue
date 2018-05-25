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
        <a @click="loginOut" class="nav-link pr-3">注销</a>
      </li>
    </ul>
  </navbar>
</template>
<script>
import navbar from './Navbar'
import { dropdown } from 'vue-strap'
/* eslint-disable */
export default {
  name: 'header',
  components: {
    navbar,
    dropdown
  },
  methods: {
    loginOut(){
      this.$router.push('/pages/login')
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
