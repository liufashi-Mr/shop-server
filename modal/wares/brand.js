const query = require('../db');

const getBrand = (sql, param) => {
    return new Promise((resolve, reject) => {
        query(sql, param).then((res) => {
            console.log(res);
            if (res) {
                resolve({
                    code: 200,
                    message: "获取成功",
                    data: res
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

const getStorBrands = (sql,param)=>{
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

const getBrands = (sql, param) => {
    return new Promise((resolve, reject) => {
        query(sql, param).then((res) => {
            console.log(res);
            if (res.length>0) {
                resolve({
                    code: 200,
                    message: "获取成功",
                    data: res
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

const deleteBrand = (sql, param) => {
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
const updataBrand = (sql, param) => {
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

// 获取品牌id
const getBrandId=(sql,param)=>{
    return new Promise((resolve,reject)=>{
        query(sql,param).then((data)=>{
            if(data.length>0){
                resolve({
                    code:200,
                    message:'获取成功',
                    data:data
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
const searchBrand = (sql, param) => {
    return new Promise((resolve, reject) => {
        query(sql, param).then((res) => {
            console.log(res);
            if (res.length>0) {
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
const addBrand = (sql, param) => {
    return new Promise((resolve, reject) => {
        query(sql, param).then(res => {
            console.log(res);
            if (res) {
                resolve({
                    code: 200,
                    message: "插入成功",  
                    data:res          
                })
                return;
            }
            resolve({
                code: 402,
                message: "失败"
            })
        }).catch(err => {
            reject(err)
        })
    })
};
const addStoreBrand = (sql, param) => {
    return new Promise((resolve, reject) => {
        query(sql, param).then(res => {
            console.log(res);
            if (res) {
                resolve({
                    code: 200,
                    message: "插入成功"
                })
                return;
            }
            resolve({
                code: 402,
                message: "失败"
            })
        }).catch(err => {
            reject(err)
        })
    })
};

const searchId = (sql, param) => {
    return new Promise((resolve, reject) => {
        query(sql, param).then((res) => {
            console.log(res);
            if (res) {
                resolve({
                    code: 200,
                    message: "获取成功",
                    data: res
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
const addCategoryBrand = (sql,param)=>{
    return new Promise((resolve,reject)=>{
        query(sql,param).then(res=>{
            if(res.affectedRows>0){
                resolve({
                    code:200,
                    message:'插入成功'
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
    getBrand,
    getBrands,
    deleteBrand,
    updataBrand,
    getBrandId,
    searchBrand,
    addBrand,
    addStoreBrand,
    searchId,
    getStorBrands,
    addCategoryBrand
}