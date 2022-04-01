const { reject } = require('underscore');
const query=require('../db');

// 新增收货地址
const addAddress=(sql,param)=>{
    return new Promise((resolve,reject)=>{
        query(sql,param).then((res)=>{
            console.log(res);
            if(res.affectedRows>0){
                resolve({
                    code:200,
                    message:'新增地址成功'
                })
                return
            }
            resolve({
                code:402,
                message:'新增地址失败'
            })
        }).catch(err=>{
            reject(err)
        })
    })
}

// 修改收货地址
const updateAddress=(sql,param)=>{
    return new Promise((resolve,reject)=>{
        query(sql,param).then((res)=>{
            if(res.affectedRows>0){
                resolve({
                    code:200,
                    message:'修改收货地址成功'
                })
                return
            }
            resolve({
                code:402,
                message:'修改地址失败'
            })
        }).catch(err=>{
            reject(err)
        })
    })
}

// 设置默认地址
const defaultAddress=(sql,param)=>{
    return new Promise((resolve,reject)=>{
        console.log(param)
        query(sql,param).then(res=>{
            console.log(res)
            if(res.affectedRows>0){
                resolve({
                    code:200,
                    message:'设置成功'
                })
                return
            }
            resolve({
                code:402,
                message:'设置失败'
            })
        }).catch(err=>{
            reject(err)
        })
    })
}

// 删除地址
const deleteAddress=(sql,param)=>{
    return new Promise((resolve,reject)=>{
        query(sql,param).then(res=>{
            if(res.affectedRows>0){
                resolve({
                    code:200,
                    message:'删除成功'
                })
                return
            }
            resolve({
                code:402,
                message:'删除失败'
            })
        }).catch(err=>{
            reject(err)
        })
    })
}
// 获取地址
const getAddress=(sql,param)=>{
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

const clearDefaultAddress = (sql,param)=>{
    return new Promise((resolve,reject)=>{
        query(sql,param).then(res=>{
            resolve({
                code:200
            })
        })
    })
}

module.exports = {
    addAddress,
    updateAddress,
    defaultAddress,
    deleteAddress,
    getAddress,
    clearDefaultAddress
}