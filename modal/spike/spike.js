const query = require("../db");


const addSpike = (sql,param)=>{
    return new Promise((resolve,reject)=>{
        query(sql,param).then(res=>{
            // console.log(res)
            if(res.affectedRows > 0){
                resolve({
                    code:200,
                    message:"添加秒杀活动成功",
                    res
                })
                return;
            }
            resolve({
                code:'402',
                message:"添加秒杀活动失败"
            })
        }).catch(err=>{
            reject(err)
        })
    })
};
const delSpike = (sql,param)=>{
    return new Promise((resolve,reject)=>{
        query(sql,param).then(res=>{
            // console.log(res)
            if(res.affectedRows > 0){
                resolve({
                    code:200,
                    message:"删除秒杀活动成功",
                    res
                })
                return;
            }
            resolve({
                code:'402',
                message:"删除秒杀活动失败"
            })
        }).catch(err=>{
            reject(err)
        })
    })
};

const getSpike = (sql,param)=>{
    return new Promise((resolve,reject)=>{
        query(sql,param).then((res)=>{
            if(res.length>0){
                for(var i = 0; i < res.length; i++){
                    function timestampToTime(timestamp) {
                        var  date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
                        var Y = date.getFullYear() + '-';
                        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
                        var D = date.getDate() + ' ';
                        var h = date.getHours() + ':';
                        var m = date.getMinutes() + ':';
                        var s = date.getSeconds();
                        return Y+M+D+h+m+s;
                    }  
                    res[i].star_time = timestampToTime(res[i].star_time)         
                    res[i].end_time = timestampToTime(res[i].end_time)         
                }
                // console.log(res)
                resolve({
                    code:200,
                    message:"查询活动列表成功",
                    res
                })
                return;
            }
            resolve({
                code:402,
                message:"查询活动列表失败"
            })
        }).catch(err=>{
            reject(err)
        })
    })
}

const slectSpike = (sql,param)=>{
    return new Promise((resolve,reject)=>{
        query(sql,param).then((res)=>{
            for(var i = 0; i < res.length; i++){
                function timestampToTime(timestamp) {
                    var  date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
                    var Y = date.getFullYear() + '-';
                    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
                    var D = date.getDate() + ' ';
                    var h = date.getHours() + ':';
                    var m = date.getMinutes() + ':';
                    var s = date.getSeconds();
                    return Y+M+D+h+m+s;
                }  
                res[i].star_time = timestampToTime(res[i].star_time)         
                res[i].end_time = timestampToTime(res[i].end_time)         
            }
            if(res.length>0){
                resolve({
                    code:200,
                    message:"获取活动列表成功",
                    res
                })
                return;
            }
            resolve({
                code:402,
                message:"获取活动列表失败"
            })
        }).catch(err=>{
            reject(err)
        })
    })
};

const updateSpike = (sql,param)=>{
    return new Promise((resolve,reject)=>{
        query(sql,param).then((res)=>{
            if(res.affectedRows>0){
                resolve({
                    code:200,
                    message:"更新活动列表成功",
                    res
                })
                return;
            }
            resolve({
                code:402,
                message:"更新活动列表失败"
            })
        }).catch(err=>{
            reject(err)
        })
    })
};


module.exports = {
    addSpike,
    delSpike,
    getSpike,
    slectSpike,
    updateSpike
}