import axios from "axios";

export default {

    // 所有用户
    getAllUsers(userName, currentPage, pageSize) {
        return axios({
            url: "/api/ManageUser/GetAllUsers",
            method: "post",
            data: { userName, currentPage, pageSize }
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

    // 所有角色
    getAllRoles() {
        return axios({
            url: "/api/ManageUser/GetAllRoles",
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

    // 新增时检索用户登录名
    checkLoginName(userName) {
        return axios({
            url: "/api/ManageUser/CheckUsername",
            method: "post",
            data: { userName }
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

    // 增加用户
    addUser(accountUser, accountPwd, accountName, selectedRoles, accountState, accountType) {
        return axios({
            url: "/api/ManageUser/AddUser",
            method: "post",
            data: { accountUser, accountPwd, accountName, selectedRoles, accountState, accountType }
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

    // 删除用户
    deleteUser(Id) {
        return axios({
            url: "/api/ManageUser/DeleteUser",
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

    // 修改用户
    updateUser(Id, accountUser, accountPwd, accountName, selectedRoles, accountState, accountType) {
        return axios({
            url: "/api/ManageUser/UpdateUser",
            method: "post",
            data: { Id, accountUser, accountPwd, accountName, selectedRoles, accountState, accountType }
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

    // 查看用户
    getUser(Id) {
        return axios({
            url: "/api/ManageUser/GetUser",
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

    // 锁定用户
    lockUser(Id) {
        return axios({
            url: "/api/ManageUser/LockUser",
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

    // 解除锁定
    unLockUser(Id) {
        return axios({
            url: "/api/ManageUser/UnLockUser",
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

    // 登陆记录
    loginLog(ip, mac, userName, startTime, endTime, currentPage, pageSize) {
        return axios({
            url: "/api/account/getLoginInfos",
            method: "post",
            data: { ip, mac, userName, startTime, endTime, currentPage, pageSize }
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