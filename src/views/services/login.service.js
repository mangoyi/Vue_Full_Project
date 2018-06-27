import axios from 'axios';
export default {
    // 登陆
    login(username, password) {
        return axios({
            url: "/api/api/home/loginUser",
            method: "post",
            data: { username, password }
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

    // 修改密码
    updatePassword(username, password) {
        return axios({
            url: "/api/api/home/updatePwd",
            method: "post",
            data: { username, password }
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
}
