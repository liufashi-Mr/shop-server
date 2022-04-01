const { reject } = require('underscore');
const { param } = require('../../controller/order');
const query = require('../db');

const getMenu = (sql, param) => {
    return new Promise((resolve, reject) => {
        query(sql, param).then((res) => {
            console.log(res);
            if (res) {
                resolve({
                    code: 200,
                    message: "获取成功",
                    data:res
                })
                return
            }
            resolve({
                code: 402,
                message: "获取失败"
            })
        }).catch(err => {
            reject(err)
        })
    })
};
const addMenu = (sql, param) => {
    return new Promise((resolve, reject) => {
        query(sql, param).then((res) => {
            console.log(res);
            if (res) {
                resolve({
                    code: 200,
                    message: "添加成功",
                    data:res
                })
                return
            }
            resolve({
                code: 402,
                message: "添加失败"
            })
        }).catch(err => {
            reject(err)
        })
    })
};

// 获取二级分类集合
const getSecond = (sql,param)=>{
    return new Promise((resolve,reject)=>{
        query(sql,param).then((res)=>{
            var arr = [];
            for(let i = 0; i < res.length; i++){
               arr.push(res[i].name)
            }
            res = arr
            if(res.length>0){
                resolve({
                    code:200,
                    message:'获取成功',
                    data:res
                })
                return;
            }
        resolve({
            code:402,
            message:'获取失败'
        })
        })
    })
}

const updataMenu = (sql, param) => {
    return new Promise((resolve, reject) => {
        query(sql, param).then(res => {
            console.log(res,'000000000');
            if (res.affectedRows > 0) {
                resolve({
                    code: 200,
                    message: "更新成功",
                    data:res
                })
                return;
            }
            resolve({
                code: 402,
                message: "更新失败"
            })
        }).catch(err => {
            reject(err)
        })
    })
};
const deleteMenu = (sql, param) => {
    return new Promise((resolve, reject) => {
        query(sql, param).then(res => {
            if (res.affectedRows > 0) {
                resolve({
                    code: 200,
                    message: "删除成功",
                    res
                })
                return;
            }
            resolve({
                code: 402,
                message: "删除失败"
            })
        }).catch(err => {
            reject(err)
        })
    })
};

//二级菜单删、改、查
const deleteSubmenu = (sql, param) => {
    return new Promise((resolve, reject) => {
        query(sql, param).then(res => {
            if (res.affectedRows > 0) {
                resolve({
                    code: 200,
                    message: "删除成功"
                })
                return;
            }
            resolve({
                code: 402,
                message: "删除失败"
            })
        }).catch(err => {
            reject(err)
        })
    })
};
const updataSubmenu = (sql, param) => {
    return new Promise((resolve, reject) => {
        query(sql, param).then(res => {
            console.log(res);
            if (res.affectedRows > 0) {
                resolve({
                    code: 200,
                    message: "更新成功"
                })
                return;
            }
            resolve({
                code: 402,
                message: "更新失败"
            })
        }).catch(err => {
            reject(err)
        })
    })
};
const getSubmenu = (sql, param) => {
    return new Promise((resolve, reject) => {
        query(sql, param).then((res) => {
            console.log(res);
            if (res) {
                resolve({
                    code: 200,
                    message: "获取成功",
                    data:res
                })
                return
            }
            resolve({
                code: 402,
                message: "获取失败"
            })
        }).catch(err => {
            reject(err)
        })
    })
};

// 库存
const getStock = (sql,param) =>{
    return new Promise((resolve,reject)=>{
        query(sql,param).then((res)=>{
            console.log(res);
            if(res){
                resolve({
                    code:200,
                    message:'获取库存成功',
                    data:res
                })
                return
            }
            resolve({
                code:402,
                message:'获取库存失败',
            })
        }).catch(err=>{
            reject(err)
        })
    })
}
const getName = (sql,param) =>{
    return new Promise((resolve,reject)=>{
        query(sql,param).then((res)=>{
            console.log(res);
            if(res){
                resolve({
                    code:200,
                    message:'获取品类成功',
                    data:res
                })
                return
            }
            resolve({
                code:402,
                message:'获取失败',
            })
        }).catch(err=>{
            reject(err)
        })
    })
}
const getSpu = (sql,param) =>{
    return new Promise((resolve,reject)=>{
        query(sql,param).then((res)=>{
            console.log(res);
            if(res){
                resolve({
                    code:200,
                    message:'获取产品成功',
                    data:res
                })
                return
            }
            resolve({
                code:402,
                message:'获取失败',
            })
        }).catch(err=>{
            reject(err)
        })
    })
}
const getNameSpu = (sql,param) =>{
    return new Promise((resolve,reject)=>{
        query(sql,param).then((res)=>{
            console.log(res);
            if(res){
                resolve({
                    code:200,
                    message:'获取产品成功',
                    data:res
                })
                return
            }
            resolve({
                code:402,
                message:'获取失败',
            })
        }).catch(err=>{
            reject(err)
        })
    })
}
const getSecondList = (sql,param)=>{
    return new Promise((resolve,reject)=>{
        query(sql,param).then(res=>{
            if(res){
                resolve({
                    code:200,
                    message:'获取二级分类成功',
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
const selectParentNameNUll = (sql,param)=>{
    return new Promise((resolve,reject)=>{
        query(sql,param).then(res=>{
            if(res){
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

const selectParentNotNull = (sql,param) =>{
    return new Promise((resolve,reject)=>{
        query(sql,param).then(res=>{
            if(res){
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
    getMenu,
    addMenu,
    updataMenu,
    deleteMenu,
    deleteSubmenu,
    updataSubmenu,
    getSubmenu,
    getStock,
    getSecond,
    getName,
    getSpu,
    getSecondList,
    selectParentNameNUll,
    selectParentNotNull,
    getNameSpu
}