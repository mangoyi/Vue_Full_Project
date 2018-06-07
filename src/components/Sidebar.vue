<template>
  <div class="sidebar">
    <nav class="sidebar-nav">
      <ul class="nav">
        <li class="nav-item">
          <router-link :to="'/dashboard'" class="nav-link">
            <i class="fa fa-bar-chart fa-lg"></i> 首页 </router-link>
        </li>
        <router-link tag="li" class="nav-item nav-dropdown" :to="{ path: '/horse'}" disabled>
          <div class="nav-link nav-dropdown-toggle" @click="handleClick">
            <i class="fa fa-hand-lizard-o fa-lg"></i> 马匹信息管理</div>
          <ul class="nav-dropdown-items">
            <li class="nav-item">
              <router-link :to="'/horse/baseInfo'" class="nav-padding nav-link" exact>
                <i class="icon-star"></i> 马匹基本信息</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="'/horse/master'" class="nav-padding nav-link" exact>
                <i class="icon-star"></i> 马主信息</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="'/horse/breeder'" class="nav-padding nav-link" exact>
                <i class="icon-star"></i> 饲养员信息</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="'/horse/awards'" class="nav-padding nav-link" exact>
                <i class="icon-star"></i> 获奖信息</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="'/horse/disease'" class="nav-padding nav-link" exact>
                <i class="icon-star"></i> 病历信息</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="'/horse/treatment'" class="nav-padding nav-link" exact>
                <i class="icon-star"></i> 治疗信息</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="'/horse/vaccine'" class="nav-padding nav-link" exact>
                <i class="icon-star"></i> 接种疫苗信息</router-link>
            </li>
              <li class="nav-item">
              <router-link :to="'/horse/nailInfo'" class="nav-padding nav-link" exact>
                <i class="icon-star"></i> 钉甲信息</router-link>
            </li>
              <li class="nav-item">
              <router-link :to="'/horse/teethInfo'" class="nav-padding nav-link" exact>
                <i class="icon-star"></i> 挫牙信息</router-link>
            </li>

          </ul>
        </router-link>
        <router-link tag="li" class="nav-item nav-dropdown" :to="{ path: '/resume'}" disabled>
          <div class="nav-link nav-dropdown-toggle" @click="handleClick">
            <i class="fa fa-folder-open-o fa-lg"></i> 马匹简历</div>
          <ul class="nav-dropdown-items">
            <li class="nav-item">
              <router-link :to="'/resume/horseResume'" class="nav-padding nav-link" exact>
                <i class="icon-star"></i> 简历查看</router-link>
            </li>

          </ul>
        </router-link>
        <router-link tag="li" class="nav-item nav-dropdown" :to="{ path: '/hospital'}" disabled>
          <div class="nav-link nav-dropdown-toggle" @click="handleClick">
            <i class="fa fa-ambulance fa-lg"></i> 马医院信息管理</div>
          <ul class="nav-dropdown-items">
            <li class="nav-item">
              <router-link :to="'/hospital/appointment'" class="nav-padding nav-link" exact>
                <i class="icon-star"></i> 预约日程管理</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="'/hospital/vaccination'" class="nav-padding nav-link" exact>
                <i class="icon-star"></i> 接种疫苗管理</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="'/hospital/treatSchedule'" class="nav-padding nav-link" exact>
                <i class="icon-star"></i> 门诊治疗管理</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="'/hospital/operateRoom'" class="nav-padding nav-link" exact>
                <i class="icon-star"></i> 诊疗室管理</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="'/hospital/nail'" class="nav-padding nav-link" exact>
                <i class="icon-star"></i> 钉甲管理</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="'/hospital/teeth'" class="nav-padding nav-link" exact>
                <i class="icon-star"></i> 挫牙管理</router-link>
            </li>
          </ul>
        </router-link>

        <router-link tag="li" class="nav-item nav-dropdown" :to="{ path: '/hosAssets'}" disabled>
          <div class="nav-link nav-dropdown-toggle" @click="handleClick">
            <i class="fa fa-money fa-lg"></i> 马医院固定资产管理</div>
          <ul class="nav-dropdown-items">
            <li class="nav-item">
              <router-link :to="'/hosAssets/assets'" class="nav-padding nav-link" exact>
                <i class="icon-star"></i> 固定资产类品管理</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="'/hosAssets/assetsStock'" class="nav-padding nav-link" exact>
                <i class="icon-star"></i> 固定资产库存管理</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="'/hosAssets/consume'" class="nav-padding nav-link" exact>
                <i class="icon-star"></i> 消耗品类品管理</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="'/hosAssets/consumeStock'" class="nav-padding nav-link" exact>
                <i class="icon-star"></i> 消耗品库存管理</router-link>
            </li>

          </ul>
        </router-link>

        <router-link tag="li" class="nav-item nav-dropdown" :to="{ path: '/equestrian'}" disabled>
          <div class="nav-link nav-dropdown-toggle" @click="handleClick">
            <i class="fa fa-jpy fa-lg"></i> 马术中心资产管理</div>
          <ul class="nav-dropdown-items">
            <li class="nav-item">
              <router-link :to="'/equestrian/horseAssets'" class="nav-padding nav-link" exact>
                <i class="icon-star"></i> 固定资产类品管理</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="'/equestrian/horseStock'" class="nav-padding nav-link" exact>
                <i class="icon-star"></i> 固定资产库存管理</router-link>
            </li>
          </ul>
        </router-link>
        <router-link tag="li" class="nav-item nav-dropdown" :to="{ path: '/system'}" disabled>
          <div class="nav-link nav-dropdown-toggle" @click="handleClick">
            <i class="fa fa-cog fa-lg"></i> 系统管理</div>
          <ul class="nav-dropdown-items">
            <li class="nav-item">
              <router-link :to="'/system/user'" class="nav-padding nav-link" exact>
                <i class="icon-star"></i> 用户管理</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="'/system/department'" class="nav-padding nav-link" exact>
                <i class="icon-star"></i> 部门管理</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="'/system/role'" class="nav-padding nav-link" exact>
                <i class="icon-star"></i> 角色管理</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="'/system/dictionary'" class="nav-padding nav-link" exact>
                <i class="icon-star"></i> 字典管理</router-link>
            </li> 

          </ul>
        </router-link>

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
