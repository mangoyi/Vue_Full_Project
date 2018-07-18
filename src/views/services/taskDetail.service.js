import axios from "axios";

export default {
    // 任务明细
    taskDetail(taskId, startDate, endDate, number, currentPage, pageSize, tab) {
        return axios({
            url: "/api/api/task/taskDetail",
            method: "post",
            data: { taskId, startDate, endDate, number, currentPage, pageSize, tab }
        }).then(
            resp => {
                if (resp.data.status == 0) {
                    return Promise.resolve(resp.data);
                } else {
                    return Promise.reject(resp.data);
                }
            },
            err => {
                if (!err.msg) {
                    err.msg = "网络故障";
                }
                return Promise.reject(err);
            }
        );
    },

    // 聊天对话
    dialog(Id) {
        return axios({
            url: "/api/api/task/searchDialog",
            method: "post",
            data: { Id }
        }).then(
            resp => {
                if (resp.data.status == 0) {
                    return Promise.resolve(resp.data);
                } else {
                    return Promise.reject(resp.data);
                }
            },
            err => {
                if (!err.msg) {
                    err.msg = "网络故障";
                }
                return Promise.reject(err);
            }
        )
    },

    // 获取当前列表中类型所占百分比
    getTaskTypes(taskId) {
        return axios({
            url: "/api/api/task/GetTaskTypes",
            method: "post",
            data: { taskId }
        }).then(
            resp => {
                if (resp.data.status == 0) {
                    return Promise.resolve(resp.data);
                } else {
                    return Promise.reject(resp.data);
                }
            },
            err => {
                if (!err.msg) {
                    err.msg = "网络故障";
                }
                return Promise.reject(err);
            }
        )
    }

};