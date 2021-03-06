import axios from "axios";

export default {
    // 员工坐席
    laborSeat(keyword, currentPage, pageSize) {
        return axios({
            url: "/api/account/searchManualSeat",
            method: "post",
            data: { keyword, currentPage, pageSize }
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
    // 机器人坐席
    robotSeat(keyword, currentPage, pageSize) {
        return axios({
            url: "/api/account/searchRobotSeat",
            method: "post",
            data: { keyword, currentPage, pageSize }
        }).then(
            resp => {
                if (resp.data.status == 0) {
                    return Promise.resolve(resp.data);
                } else {
                    return Promise.reject(resp.data)
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

    // 机器人坐席第二个版本
    robotWorksSeat() {
        return axios({
            url: "/api/task/getRobotsWorkStatus",
            method: "post",
            data: {}
        }).then(
            resp => {
                if (resp.data.status == 0) {
                    return Promise.resolve(resp.data);
                } else {
                    return Promise.reject(resp.data)
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