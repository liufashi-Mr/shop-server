const query = require('../db')

const getId = (sql,param)=>{
    return new Promise((resolve,reject)=>{
        query(sql,param).then(res=>{
            if(res.length>0){
                resolve({
                    code:200,
                    message:'获取成功',
                    data:res
                })
                return
            }
            resolve({
                code:402,
                message:'获取失败'
            })
        }).catch(err=>{
            reject(err)
        })
    })
}

module.exports = {
    getId
}