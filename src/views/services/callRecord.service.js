import axios from "axios";

export default {
    // 通话记录
    callRecord(startDate, endDate, phone, currentPage, pageSize) {
        return axios({
            url: "/api/api/callLog/searchCallRecord",
            method: "post",
            data: { startDate, endDate, phone, currentPage, pageSize }
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
