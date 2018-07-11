import axios from "axios";

export default {

    // 任务发布
    taskRelease(formData) {
        return axios({
            url: "/api/api/task/addNewTask",
            method: "post",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" }
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

    // 机器人:发布任务中所有空闲机器人
    getRobot() {
        return axios({
            url: "/api/api/account/getFreeRobotList",
            method: "post",
            data: {}
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

    // 机器人： 修改任务中包含当前任务和所有的空闲机器人
    getCurrentRobot(taskId) {
        return axios({
            url: "/api/api/account/getCurrentTaskRobots",
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

    // 员工
    getManual() {
        return axios({
            url: "/api/api/account/getFreeManualList",
            method: "post",
            data: {}
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

    // 任务信息
    getZip(taskId) {
        return axios({
            url: "/api/api/task/GetTask",
            method: "get",
            params: { taskId }
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

    // 修改任务
    updateTask(formData) {
        return axios({
            url: "/api/api/task/updateTask",
            method: "post",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" }
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

    // 下载文件
    downloadFile(taskId) {
        return axios({
            url: "/api/api/Task/DownloadFile",
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
        )
    }

};