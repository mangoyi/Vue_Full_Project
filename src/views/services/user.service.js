import axios from "axios";

export default {

    // 所有用户
    getAllUsers() {
        return axios({
            url: "/api/api/ManageUser/GetAllUsers",
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

    // 所有角色
    getAllRoles() {
        return axios({
            url: "/api/api/ManageUser/GetAllRoles",
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
    checkLoginName(loginName) {
        return axios({
            url: "/api/api/ManageUser/CheckUsername",
            method: "post",
            data: { loginName }
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
    addUser(accountUser, accountPwd, accountName, selectedRoles, errSum, accountType) {
        return axios({
            url: "/api/api/ManageUser/AddUser",
            method: "post",
            data: { accountUser, accountPwd, accountName, selectedRoles, errSum, accountType }
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
            url: "/api/api/ManageUser/DeleteUser",
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
    updateUser(accountUser, accountPwd, accountName, selectedRoles, errSum, accountType) {
        return axios({
            url: "/api/api/ManageUser/UpdateUser",
            method: "post",
            data: { accountUser, accountPwd, accountName, selectedRoles, errSum, accountType }
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
            url: "/api/api/ManageUser/GetUser",
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
            url: "/api/api/ManageUser/LockUser",
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
    }

}