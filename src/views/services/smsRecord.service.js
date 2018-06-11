import axios from "axios";

export default {
    // 短信记录
    smsRecord(startDate, endDate, number, currentPage, pageSize) {
        return axios({
            url: "/api/api/sms/searchSmsRecord",
            method: "post",
            data: { startDate, endDate, number, currentPage, pageSize }
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
    }

};