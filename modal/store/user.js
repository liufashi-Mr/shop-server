const query = require('../db');
const { getToken } = require('../../utils/token')
// 用于检测用户注册时用户名是否已经存在
const checkRegister = (param) => {
    let sql = "select id from t_store where name=?"
    return new Promise((resolve, reject) => {
        query(sql, param).then(res => {
            if (res.length > 0) {
                resolve(true);
                return;
            }
            resolve(false);
        }).catch(err => {
            reject(err)
        })
    })
}

const register = (sql, param) => {
    return new Promise((resolve, reject) => {
        checkRegister([param[0]]).then(result => {
            if (result) {
                resolve({
                    code: 402,
                    message: "用户名已存在"
                })
                return;
            }
            query(sql, param).then(res => {
                if (res.affectedRows > 0) {
                    resolve({
                        code: 200,
                        message: "注册添加成功"
                    });
                    return;
                }
                resolve({
                    code: 402,
                    message: '注册失败'
                });
            }).catch(err => {
                reject(err);
            })
        }).catch(err => {
            reject(err);
        })
    })
}
const login = (sql, param) => {
    return new Promise((resolve, reject) => {
        query(sql, param).then(res => {
            if (res.length > 0) {
                res = Object.assign({}, res[0])
                resolve({
                    code: 200,
                    data: { storeInfo: res, token: getToken(res) }
                })
                return;
            }
            resolve({
                code: 402,
                message: "登录失败"

            })
        }).catch(err => {
            reject(err)
        })
    })
}
const addInfoModify = (sql, param) => {
    return new Promise((resolve, reject) => {
        query(sql, param).then(res => {
            console.log(res);
            if (res.affectedRows > 0) {
                resolve({
                    code: 200,
                    message: "修改成功",
                })
                return;
            }
            resolve({
                code: 402,
                message: "修改失败"
            })
        }).catch(err => {
            reject(err)
        })
    })
};
const getInfo = (sql, param) => {
    return new Promise((resolve, reject) => {
        query(sql, param).then(res => {
            console.log(res);
            if (res.length > 0) {
                resolve({
                    code: 200,
                    message: "获取成功",
                    data: res
                })
                return;
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

// 获取店铺品牌信息
const getstoreBrand = (sql, param) => {
    return new Promise((resolve, reject) => {
        query(sql, param).then(res => {
            var arr = [];
            for (let i = 0; i < res.length; i++) {
                arr.push(res[i].name)
            }
            res = arr;
            if (res.length > 0) {
                resolve({
                    code: 200,
                    message: '获取店铺下品牌信息成功',
                    res,
                })
                return
            }
            resolve({
                code: 402,
                message: "获取店铺下品牌信息成功"
            })
        })
    })
}

// 根据店铺id 获取店铺下的产品信息 以及brand 表中信息
const getStoreSpu = (sql, param) => {
    return new Promise((resolve, reject) => {
        query(sql, param).then(res => {
            if (res.length > 0) {
                resolve({
                    code: 200,
                    message: '获取店铺下的产品列表成功',
                    res
                })
                return
            }
            resolve({
                code: 402,
                message: '获取店铺下的产品列表失败'
            })
        })
    })
}

// 获取产品下的商品

const getstoreSku = (sql, param) => {
    return new Promise((resolve, reject) => {
        query(sql, param).then(res => {
            if (res.length > 0) {
                resolve({
                    code: 200,
                    message: '获取产品下商品列表成功',
                    res
                })
                return
            }
            resolve({
                code: 402,
                message: '获取产品下商品列表失败'
            })
        })
    })
}

const getStoreAll = (sql, param) => {
    return new Promise((resolve, reject) => {
        query(sql, param).then(res => {
            if (res.length > 0) {
                resolve({
                    code: 200,
                    message: '获取店铺列表信息成功',
                    res
                })
                return
            }
            resolve({
                code: 402,
                message: "获取店铺列表失败",
                err
            })
        })
    })
}
module.exports = {
    register,
    login,
    addInfoModify,
    getInfo,
    getstoreBrand,
    getStoreSpu,
    getstoreSku,
    getStoreAll
}