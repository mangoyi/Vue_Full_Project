import axios from "axios";

export default {
    // 任务进度
    taskPercent() {
        return axios({
            url: "/api/api/task/taskPercent",
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
    // 任务折线图
    taskLine() {
        return axios({
            url: "/api/api/task/taskChart",
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
    }
};
