import axios from "axios";

export default {
    // 模板列表
    messageTemplateList(templateContent, currentPage, pageSize) {
        return axios({
            url: "/api/sms/searchSmsTemplate",
            method: "post",
            data: { templateContent, currentPage, pageSize }
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
    // 新增模板
    addTemplate(smsTemplateId, smsTemplateName, smsTemplateContent) {
        return axios({
            url: "/api/sms/addSmsTemplate",
            method: "post",
            data: { smsTemplateId, smsTemplateName, smsTemplateContent }
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
    // 删除模板
    delTemplate(smsTemplateId) {
        return axios({
            url: "/api/sms/delSmsTemplate",
            method: "post",
            data: { smsTemplateId }
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
    // 获取模板
    getTemplate(smsTemplateId) {
        return axios({
            url: "/api/sms/getSmsTemplate",
            method: "post",
            data: { smsTemplateId }
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
    // 更新模板
    updateTemplate(smsTemplateId, smsTitle, smsContent) {
        return axios({
            url: "/api/sms/updateSmsTemplate",
            method: "post",
            data: { smsTemplateId, smsTitle, smsContent }
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
};