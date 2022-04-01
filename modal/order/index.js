const router = require('../../controller/order');
const query = require('../db');

// 插入订单表后在操作订单详情表
const addOrderDetail = (insertDetail, skus, id) => {
    return new Promise((resolve, reject) => {
        let arr = [];
        for (let sku of skus) {
            let values = []
            values = Object.values(sku)
            values.unshift(id)
            arr.push(query(insertDetail, values))
        }
        Promise.all(arr).then(res => {
            if (res.length > 0) {
                resolve({
                    code: 200,
                    message: "添加订单成功"
                })
                return;
            }
            resolve({
                code: 402,
                message: '添加订单失败'
            })
        }).catch(err => {
            reject(err);
        })
    })
}

const addOrder = (sql, param, insertDetail, skus) => {
    return new Promise((resolve, reject) => {
        query(sql, param).then(res => {
            if (res.affectedRows > 0) {
                let orderId=res.insertId
                addOrderDetail(insertDetail, skus, res.insertId).then(res => {
                    resolve(Object.assign(res,{orderId}));
                }).catch(err => {
                    reject(err);
                })
                return;
            }
            resolve({
                code: 402,
                message: '添加订单失败'
            })
        }).catch(err => {
            reject(err);
        })
    })
}
const getOrder = (sql, param) => {
    return new Promise((resolve, reject) => {

        let arr = [];
        for (let key in sql) {
            arr.push(query(sql[key], param[key]))
        }
        Promise.all(arr).then(res => {
            for (let key in res[0]) {
                res[0][key].create_time = parseInt(res[0][key].create_time)
            }
            res[1] = res[1][0]['count(id)']
            resolve({
                code: 200,
                data: res
            })
        }).catch(err => {
            reject(err)
        })
    })
}

const getOrderDetail = (sqls, param) => {
    return new Promise((resolve, reject) => {
        let arr = [];
        // if(Array.isArray(sqls)){
        for (let sql of sqls) {
            arr.push(query(sql, param));
        }
        // }else{
        //     arr.push(query(sqls,param))
        // }
        Promise.all(arr).then(res => {
            let result = {};
            // if (res.length > 1) {
            // result={};
            result.skus = res.shift();
            for (let item of res) {
                result = Object.assign(result, item[0])
            }
            // }else{
            //     result=res[0]
            // }
            console.log(result);
            resolve({
                code: 200,
                data: result
            })
        }).catch(err => {
            reject(err);
        })
    })
}
const deleteOrder = (sql, param) => {
    return new Promise((resolve, reject) => {
        query(sql, param).then(res => {
            if (res.affectedRows > 0) {
                resolve({
                    code: 200,
                    message: "删除订单成功"
                })
                return;
            }
            resolve({
                code: 402,
                message: "删除订单失败"
            })
        }).catch(err => {
            reject(err)
        })
    })
}


const updateOrder = (sqls, params) => {
    return new Promise((resolve, reject) => {
        let arr = [];
        for (let key in sqls) {
            console.log(key)
            arr.push(query(sqls[key], params[key]))
            console.log(sqls[key], params[key])
        }
        Promise.all(arr).then(res => {
            for (let result of res) {
                if (result.affectedRows == 0) {
                    resolve({
                        code: 402,
                        message: "修改订单失败"
                    })
                    return;
                }
            }
            resolve({
                code: 200,
                data: res
            })
        }).catch(err => {
            reject(err)
        })
    })
}

const getBackStock = (sql, param) => {
    return new Promise((resolve, reject) => {
        query(sql, param).then(res => {
            if (res.length > 0) {
                resolve({
                    code: 200,
                    data: res
                })
                return;
            }
            resolve({
                code: 402,
                message: "查询退款列表失败"
            })
        }).catch(err => {
            reject(err)
        })
    })
}

const getBackStockDetail = (sqls, param) => {
    return new Promise((resolve, reject) => {
        let arr = [];
        for (let sql of sqls) {
            arr.push(query(sql, param))
        }
        Promise.all(arr).then(res => {
            for (let result of res) {
                if (result.affectedRows == 0) {

                    resolve({
                        code: 402,
                        message: "获取退款订单失败"
                    })
                    return;
                }
            }
            let detail = {};
            let skus = res.pop();
            res.forEach(item => {
                detail = Object.assign(detail, item[0])
            })
            detail.skus = skus;
            resolve({
                code: 200,
                data: detail
            })
        }).catch(err => {
            reject(err)
        })
    })
}

const updateBackStock = (sql, param) => {
    return new Promise((resolve, reject) => {
        query(sql, param).then(res => {
            if (res.affectedRows > 0) {
                resolve({
                    code: 200,
                    message: "处理退货成功"
                })
                return;
            }
            resolve({
                code: 402,
                message: '处理退货失败'
            })
        }).catch(err => {
            reject(err)
        })
    })
}

const addBackStock = (sql, param) => {
    return new Promise((resolve, reject) => {
        query(sql, param).then(res => {
            if (res.affectedRows > 0) {
                resolve({
                    code: 200,
                    message: "添加退货处理成功"
                })
                return;
            }
            resolve({
                code: 402,
                message: '添加退货处理失败'
            })
        }).catch(err => {
            reject(err)
        })
    })
}

const getUserOrder = (sqls, param) => {
    return new Promise((resolve, reject) => {
        query(sqls[0], param).then(res => {
            let data = [];
            let arr = [];
            console.log(res)
            for (let key in res) {
                arr.push(query(sqls[1], res[key].id))
                data.push(res[key])
            }
            Promise.all(arr).then(result => {
                for (let key in result) {
                    data[key]["skus"] = result[key]
                }
                resolve({
                    code: 200,
                    data,
                })
            })
        }).catch(err => {
            reject(err)
        })
    })
}
// resovle({
//     ShipperCode:res[0].ecp,
//     LogisticCode:res[0].postid,
//     OrderCode:''
// })
const getDeliveryInfo = (sql, param) => {
    return new Promise((resolve, reject) => {
        query(sql, param).then(res => {
            resolve({
                no: res[0].postid,
            })
        })
    })
}
const deleteOrderDetail = (sql, param) => {
    return new Promise((resolve, reject) => {
        query(sql, param).then(res => {
            if (res.affectedRows > 0) {
                resolve({
                    code: 200,
                    message: '删除成功'
                })
                return
            }
            resolve({
                code: 402,
                message: '删除失败'
            })
        }).catch(err => {
            reject(err)
        })
    })
}

module.exports = {
    addOrder,
    getOrder,
    getOrderDetail,
    deleteOrder,
    updateOrder,
    getBackStock,
    getBackStockDetail,
    updateBackStock,
    addBackStock,
    getUserOrder,
    getDeliveryInfo,
    deleteOrderDetail
}