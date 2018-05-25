import axios from 'axios';
export default{
    get(){
        return new Promise((resolve,reject)=>{
            axios({
                url:'',
                method:'get',
                params:{
                }
            }).then(resp=>{
                if(resp.data.code ==10200){
                    resolve(resp.data)
                }else{
                    reject(resp.data)
                }
            },err=>{
                if(!err.note){
                    err.note='网络故障';
                }
                reject(err)
            })

        })
    },
    post(){
        return new Promise((resolve,reject)=>{
            axios({
                url:'',
                method:'post',
                 data:{
                 }
            }).then(resp=>{
                if(resp.data.code == 10200){
                    resolve(resp.data)
                }else{
                    reject(resp.data)
                }
            },err=>{
                if(!err.note){
                    err.note = '网络故障'
                }
                reject(err)
            })
        })
    }
}