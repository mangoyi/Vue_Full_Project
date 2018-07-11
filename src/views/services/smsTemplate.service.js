import axios from "axios";

export default {
    // 模板列表
    messageTemplateList(templateContent, currentPage, pageSize) {
        return axios({
            url: "/api/api/sms/smsTempList",
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
    // 新增模板检索模板ID是否存在
    checkTempId(smsTemplateId) {
        return axios({
            url: "/api/api/sms/checkSmsTemplateId",
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
    // 新增模板
    addTemplate(smsTemplateId, smsTemplateName, smsTemplateText) {
        return axios({
            url: "/api/api/sms/addSmsTemplate",
            method: "post",
            data: { smsTemplateId, smsTemplateName, smsTemplateText }
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
    delTemplate(Id) {
        return axios({
            url: "/api/api/sms/delSmsTemplate",
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
    // 获取模板
    getTemplate(Id) {
        return axios({
            url: "/api/api/sms/getSmsTemplate",
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
        );
    },
    // 更新模板
    updateTemplate(Id, smsTemplateId, smsTemplateName, smsTemplateText) {
        return axios({
            url: "/api/api/sms/updateSmsTemplate",
            method: "post",
            data: { Id, smsTemplateId, smsTemplateName, smsTemplateText }
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