const query=require('../db');

// 添加快递
const addDelivery=(sql,param)=>{
    return new Promise((resolve,reject)=>{
        query(sql,param).then(res=>{
            if(res.affectedRows>0){
                resolve({
                    code:200,
                    message:"添加快递成功"
                })
                return;
            }
            resolve({
                code:402,
                message:'添加快递失败'
            })
        }).catch(err=>{
            reject(err);
        })
    })
}

const updateDelivery=(sql,param)=>{
    return new Promise((resolve,reject)=>{
        query(sql,param).then(res=>{
            if(res.affectedRows>0){
                resolve({
                    code:200,
                    message:"已结束该单快递"
                })
                return;
            }
            resolve({
                code:402,
                message:'结束该快递失败'
            })
        }).catch(err=>{
            reject(err);
        })
    })
}

const getDelivery=(sql,param)=>{
    return new Promise((resolve,reject)=>{
        query(sql,param).then(res=>{
            if(res.length>0){
                resolve({
                    code:200,
                    data:res
                })
                return;
            }
            resolve({
                code:402,
                message:'获取快递信息失败'
            })
        }).catch(err=>{
            reject(err);
        })
    })
}
module.exports={
    addDelivery,
    updateDelivery,
    getDelivery
}