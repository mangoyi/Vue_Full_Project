<template>
    <div class="sidebar">
        <nav class="sidebar-nav">
            <ul class="nav">
                <li class="nav-item">
                    <router-link :to="'/dashboard'" class="nav-link">
                      <i class="fa fa-bar-chart fa-lg"></i> 首页 </router-link>
                </li>

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

                <!-- 系统管理 -->
                <router-link tag="li" class="nav-item nav-dropdown" :to="{ path: '/system'}" disabled v-if=" roleAdmin ">
                    <div class="nav-link nav-dropdown-toggle" @click="handleClick">
                        <i class="fa fa-cog fa-lg"></i>系统管理</div>
                    <ul class="nav-dropdown-items">
                        <li class="nav-item">
                            <router-link :to="'/system/User'" class="nav-padding nav-link" exact>
                              <i class="icon-star"></i>用户管理</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="'/system/LoginLog'" class="nav-padding nav-link" exact>
                              <i class="icon-star"></i>登录日志</router-link>
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
    data() {
        return {
            roleAdmin: false
        }
    },
    mounted() {
        this.initRole();
    },
    methods: {
        handleClick(e) {
            e.preventDefault();
            e.target.parentElement.classList.toggle('open');
        },
        initRole() {
            let roles = window.sessionStorage.getItem("roles");
            if (roles) {            // 存在这个用户角色
                roles.indexOf("admin") > -1 ? this.roleAdmin = true : this.roleAdmin = false;
            }
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
