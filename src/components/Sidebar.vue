<template>
  <div class="sidebar">
    <nav class="sidebar-nav">
      <ul class="nav">
        <li class="nav-item">
          <router-link :to="'/dashboard'" class="nav-link">
            <i class="fa fa-bar-chart fa-lg"></i> 首页 </router-link>
        </li>
      <!-- yichao  4.11 -->
        <router-link tag="li" class="nav-item nav-dropdown" :to="{ path: '/message'}" disabled>
          <div class="nav-link nav-dropdown-toggle" @click="handleClick">
            <i class="fa fa-jpy fa-lg"></i>短信系统</div>
          <ul class="nav-dropdown-items">
            <li class="nav-item">
              <router-link :to="'/message/messModal'" class="nav-padding nav-link" exact>
                <i class="icon-star"></i>短信模板</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="'/message/sendMess'" class="nav-padding nav-link" exact>
                <i class="icon-star"></i>短信发送</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="'/message/messTask'" class="nav-padding nav-link" exact>
                <i class="icon-star"></i>短信任务</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="'/message/rechargeRecord'" class="nav-padding nav-link" exact>
                <i class="icon-star"></i>充值记录</router-link>
            </li>
          </ul>
        </router-link>

        <!-- 任务管理 -->
        <router-link tag="li" class="nav-item nav-dropdown" :to="{ path: '/taskManage'}" disabled>
          <div class="nav-link nav-dropdown-toggle" @click="handleClick">
            <i class="fa fa-tasks fa-lg"></i>任务管理</div>
          <ul class="nav-dropdown-items">
            <li class="nav-item">
              <router-link :to="'/taskManage/TaskList'" class="nav-padding nav-link" exact>
                <i class="icon-star"></i>任务列表</router-link>
            </li>
            <li class="nav-item" style="display:none;">
              <router-link :to="'/taskDetail/TaskDetails'" class="nav-padding nav-link" exact>
                <i class="icon-star"></i>任务明细</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="'/taskManage/TaskRelease'" class="nav-padding nav-link" exact>
                <i class="icon-star"></i>任务发布</router-link>
            </li>
          </ul>
        </router-link>

        <!-- 通话记录 -->
        <router-link tag="li" class="nav-item nav-dropdown" :to="{ path: '/callrecords'}" disabled>
          <div class="nav-link nav-dropdown-toggle" @click="handleClick">
            <i class="fa fa-volume-control-phone fa-lg"></i>通话管理</div>
          <ul class="nav-dropdown-items">
            <li class="nav-item">
              <router-link :to="'/callRecords/CallRecords'" class="nav-padding nav-link" exact>
                <i class="icon-star"></i>通话记录</router-link>
            </li>
          </ul>
        </router-link>

        <!-- 坐席管理 -->
        <router-link tag="li" class="nav-item nav-dropdown" :to="{ path: '/seatmanage'}" disabled>
          <div class="nav-link nav-dropdown-toggle" @click="handleClick">
            <i class="fa fa-television fa-lg"></i>坐席管理</div>
          <ul class="nav-dropdown-items">
            <li class="nav-item">
              <router-link :to="'/seatmanage/LaborSeat'" class="nav-padding nav-link" exact>
                <i class="icon-star"></i>人工座席</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="'/seatmanage/RobotSeat'" class="nav-padding nav-link" exact>
                <i class="icon-star"></i>机器人坐席</router-link>
            </li>
          </ul>
        </router-link>

        <!-- 短信管理 -->
        <router-link tag="li" class="nav-item nav-dropdown" :to="{ path: '/smsmanage'}" disabled>
          <div class="nav-link nav-dropdown-toggle" @click="handleClick">
            <i class="fa fa-envelope fa-lg"></i>短信管理</div>
          <ul class="nav-dropdown-items">
            <li class="nav-item">
              <router-link :to="'/smsmanage/SmsTemplate'" class="nav-padding nav-link" exact>
                <i class="icon-star"></i>短信模板</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="'/smsmanage/SmsRecord'" class="nav-padding nav-link" exact>
                <i class="icon-star"></i>短信记录</router-link>
            </li>
          </ul>
        </router-link>

      </ul>
    </nav>
  </div>
</template>
<script>

export default {
  name: 'sidebar',
  methods: {
    handleClick(e) {
      e.preventDefault()
      e.target.parentElement.classList.toggle('open')
    }
  }
}
</script>

<style lang="css">
.nav-link {
  cursor: pointer;
}

.nav-padding {
  padding-left: 30px!important;
}
</style>
