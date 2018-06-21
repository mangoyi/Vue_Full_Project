/* eslint-disable */
import Vue from "vue";
import Router from "vue-router";

// Containers
import Full from "@/containers/Full";

// Views
import Dashboard from "@/views/Dashboard";

// Views - Components

// 通话记录
import CallRecords from "@/views/components/callrecords/callRecords/CallRecords";

// 任务管理
import TaskList from "@/views/components/taskmanage/taskList/TaskList";
import TaskRelease from "@/views/components/taskmanage/taskRelease/TaskRelease";
import TaskUpdate from "@/views/components/taskmanage/taskRelease/TaskUpdate";
import TaskDetails from "@/views/components/taskmanage/taskDetails/TaskDetails";

// 坐席管理
import LaborSeat from "@/views/components/seatmanage/laborSeat/LaborSeat";
import RobotSeat from "@/views/components/seatmanage/robotSeat/RobotSeat";

// 短信管理
import SmsTemplate from "@/views/components/smsmanage/smsTemplate/SmsTemplate";
import AddSmsTemplate from "@/views/components/smsmanage/smsTemplate/AddSmsTemplate";
import UpdateSmsTemplate from "@/views/components/smsmanage/smsTemplate/updateSmsTemplate";
import SmsRecord from "@/views/components/smsmanage/smsRecord/SmsRecord";

// Views - Pages
import Page404 from "@/views/components/pages/Page404";
import Page500 from "@/views/components/pages/Page500";
import Login from "@/views/components/pages/Login";
import Register from "@/views/components/pages/Register";

Vue.use(Router);

export default new Router({
    mode: "history", // Demo is living in GitHub.io, so required!
    linkActiveClass: "open active",
    scrollBehavior: () => ({ y: 0 }),
    routes: [{
            path: "/",
            redirect: "/pages/login",
            name: "主页",
            component: Full,
            children: [{
                    path: "dashboard",
                    name: "控制台",
                    component: Dashboard
                },

                // 通话记录
                {
                    path: "callrecords",
                    redirect: "/callrecords/callRecords",
                    name: "通话记录",
                    component: {
                        render(c) {
                            return c("router-view");
                        }
                    },
                    children: [{
                        path: "callRecords",
                        name: "通话记录",
                        component: CallRecords
                    }]
                },

                // 任务管理
                {
                    path: "taskmanage",
                    redirect: "/taskmanage/taskList",
                    name: "任务管理",
                    component: {
                        render(c) {
                            return c("router-view");
                        }
                    },
                    children: [{
                            path: "taskList",
                            name: "任务列表",
                            component: TaskList
                        },
                        {
                            path: "taskRelease",
                            name: "任务发布",
                            component: TaskRelease
                        },
                        {
                            path: "taskUpdate",
                            name: "任务修改",
                            component: TaskUpdate
                        },
                        {
                            path: "taskDetails",
                            name: "任务明细",
                            component: TaskDetails
                        }
                    ]
                },

                // 坐席管理
                {
                    path: "seatmanage",
                    redirect: "/seatmanage/laborSeat",
                    name: "坐席管理",
                    component: {
                        render(c) {
                            return c("router-view");
                        }
                    },
                    children: [{
                            path: "laborSeat",
                            name: "人工座席",
                            component: LaborSeat
                        },
                        {
                            path: "robotSeat",
                            name: "机器人坐席",
                            component: RobotSeat
                        }
                    ]
                },

                // 短信管理
                {
                    path: "smsmanage",
                    redirect: "/smsmanage/smsTemplate",
                    name: "短信管理",
                    component: {
                        render(c) {
                            return c("router-view");
                        }
                    },
                    children: [{
                            path: "smsTemplate",
                            name: "短信模板",
                            component: SmsTemplate
                        },
                        {
                            path: "smsRecord",
                            name: "短信记录",
                            component: SmsRecord
                        },
                        {
                            path: "addsmsTemplate",
                            name: "短信模板",
                            component: AddSmsTemplate
                        },
                        {
                            path: "updateSmsTemplate",
                            name: "短信模板",
                            component: UpdateSmsTemplate
                        }
                    ]
                }

            ]
        },
        {
            path: "/pages",
            name: "Pages",
            component: {
                render(c) {
                    return c("router-view");
                }
            },
            children: [{
                    path: "404",
                    name: "Page404",
                    component: Page404
                },
                {
                    path: "500",
                    name: "Page500",
                    component: Page500
                },
                {
                    path: "login",
                    name: "Login",
                    component: Login
                },
                {
                    path: "register",
                    name: "Register",
                    component: Register
                }
            ]
        }
    ]
})