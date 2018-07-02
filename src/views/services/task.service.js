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

    // 机器人
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

    // zip文件
    getZip(taskId) {
        return axios({
            url: "/api/api/task/searchTask",
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
    }

};