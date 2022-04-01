const query = require("../db");

const addShopCar = (sql, param) => {
    return new Promise((resolve, reject) => {
        query(sql, param).then(res => {
            if (res.affectedRows > 0) {
                console.log(res);
                resolve({
                    code: 200,
                    message: "添加购物车成功",
                    data:{
                        insertId:res.insertId
                    }
                })
                return;
            }
            resolve({
                code: 402,
                message: "添加购物车失败"
            })
        }).catch(err => {
            reject(err)
        })
    })
}
const deleteShopCar = (sql, param) => {
    return new Promise((resolve, reject) => {
        query(sql, param).then(res => {
            if (res.affectedRows > 0) {
                resolve({
                    code: 200,
                    message: "删除购物车成功"
                })
                return
            }
            resolve({
                code: 402,
                message: '删除购物车失败'
            })
        }).catch(err => {
            reject(err)
        })
    })
}

const getStore = (res) => {
    return new Promise((resolve, reject) => {
        let sql = "select t.id as store_id,t.`name`,d.img,d.title,d.price from t_spu d join t_store t on d.store_id=t.id where d.id=?"
        let arr = [];
        for (let item of res) {
            arr.push(query(sql, [item["spu_id"]]))
        }
        Promise.all(arr).then(result => {
            // console.log(result[0],res)
            let list = res.map((item,index) => {
                return Object.assign(item,result[index][0])
            })
            // console.log(list);
            resolve(list);
        }).catch(err => {
            reject(err);
        })
    })
}
const getShopCar = (sql, param) => {
    return new Promise((resolve, reject) => {
        query(sql, param).then(res => {
            if (res.length > 0) {
                getStore(res).then(result => {
                    resolve({
                        code: 200,
                        data: result
                    })
                }).catch(err => {
                    reject(err);
                })
                return;
            }
            resolve({
                code: 402,
                message: "购物车为空"
            })
        }).catch(err => {
            reject(err)
        })
    })
}
module.exports = {
    addShopCar,
    deleteShopCar,
    getShopCar
}