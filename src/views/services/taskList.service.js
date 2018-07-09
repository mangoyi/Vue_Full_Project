import axios from "axios";

export default {
    // 任务列表
    taskList(startTime, endTime, currentPage, pageSize) {
        return axios({
            url: "/api/api/task/searchTaskList",
            method: "post",
            data: { startTime, endTime, currentPage, pageSize }
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
    // 暂停任务
    pauseTask(taskId) {
        return axios({
            url: "/api/api/task/pauseTask",
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
        );
    },
    // 开启任务
    openTask(taskId) {
        return axios({
            url: "/api/api/task/goOnTask",
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
    },
    // 结束任务
    overTask(taskId) {
        return axios({
            url: "/api/api/task/overTask",
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
    },
    // 导出明细
    exportDetail(taskId) {
        return axios({
            url: "/api/api/task/exportTaskDetail",
            method: "get",
            params: { taskId },
            responseType: 'blob'
        }).then(
            resp => {
                if (resp.data) {
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
    }
};