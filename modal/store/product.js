const { param } = require('../../controller/wares/menu');
const query = require('../../db');


// 在插入产品表之前先查询
const assist = (arr) => {
    return new Promise((resolve, reject) => {
        let result = [];
        for (let item of arr) {
            result.push(query(item.sql, item.param))
        }
        Promise.all(result).then((res) => {
            resolve(res);
        }).catch(err => {
            reject(err);
        })
    })
}
const addSpu=(sqls,params,queryId)=>{
    return new Promise((resolve,reject)=>{
        assist(queryId).then(res=>{
            res=res.map(item=>{
                console.log(item[0]);
                return item[0].id
            })
            params[0]=res.concat(params[0])
            res.pop();
            params[1]=res.concat(res);
           let arr=[];
           for(let key in sqls){
               arr.push(query(sqls[key],params[key]))
           }
           Promise.all(arr).then(result=>{
               console.log(result,'1111')
            resolve({
                code:200,
                message:"插入产品成功",
            })
           }).catch(err=>{
               reject(err)
           })
        }).catch(err=>{
            reject(err)
        })
    })
}

// const addSpu = (sql, param, check, queryId) => {
//     return new Promise((resolve, reject) => {
//         assist(check).then(() => {
//             assist(queryId).then(res => {
//                 let arr = res.map(item => {
//                     if (item[0]) {
//                         return item[0].id
//                     }
//                     return
//                 })
//                 param = arr.concat(param[0]);
//                 query(sql, param).then(result => {
//                     if (result.affectedRows > 0) {
//                         resolve({
//                             code: 200,
//                             message: '添加产品成功'
//                         })
//                         return;
//                     }
//                     resovle({
//                         code: 402,
//                         message: '添加商品失败'
//                     })
//                 }).catch(err => {
//                     reject(err)
//                 })

//             }).catch(err => {
//                 reject(err);
//             })
//         }).catch(err => {
//             reject(err)
//         })
//     })
// }

const getSku = (sql, param) => {
    return new Promise((resolve, reject) => {
        query(sql, param).then(res => {
            if (res.length > 0) {
                resolve({
                    code: 200,
                    message: "获取商品成功",
                    data:res
                })
                return;
            }
            resolve({
                code: 402,
                message: "获取商品失败"
            })
        }).catch(err => {
            reject(err);
        })
    })
};
const addSku = (sql,param)=>{
    return new Promise((resolve, reject) => {
        query(sql, param).then(res => {
            if (res.affectedRows > 0) {
                resolve({
                    code: 200,
                    message: "添加商品成功"
                })
                return;
            }
            resolve({
                code: 402,
                message: "添加商品失败"
            })
        }).catch(err => {
            reject(err);
        })
    })
}

const checkDelete = (sql, param) => {
    return new Promise((resolve, reject) => {
        query(sql, param).then(res => {
            console.log(res);
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
const checkDeleteShop = (sql, param) => {
    return new Promise((resolve, reject) => {
        query(sql, param).then(res => {
            console.log(res);
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
const updataShop = (sql, param) => {
    return new Promise((resolve, reject) => {
        query(sql, param).then(res => {
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
const updateQuick=(sql,param)=>{
    return new Promise((resolve, reject) => {
        query(sql, param).then(res => {
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
}
const getShop = (sql, param) => {
    return new Promise((resolve, reject) => {
        query(sql, param).then(res => {
            console.log(res);
            if (!res.RowDataPacket) {
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
}

const getSpu = (sql, param) => {
    return new Promise((resolve, reject) => {
        query(sql, param).then(res => {
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
            reject(err);
        })
    })
};
const getShopList = (sql, param) => {
    return new Promise((resolve, reject) => {
        query(sql, param).then(res => {
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
            reject(err);
        })
    })
};
const updataSpu = (sql, param) => {
    return new Promise((resolve, reject) => {
        // console.log(param)
        query(sql, param).then(res => {
            // console.log(res);
            console.log(res.affectedRows);
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
            console.log(err)
        })
    })
};
const deleteSpu = (sql, param) => {
    return new Promise((resolve, reject) => {
        query(sql, param).then(res => {
            console.log(res);
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
}
// 获取品类参数
const getSpecParam = (sql, param) => {
    return new Promise((resolve, reject) => {
        query(sql, param).then(res => {
            if (res.length > 0) {
                resolve({
                    code: 200,
                    message: '获取成功',
                    data: res
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
// yao 增加了第二个添加sku的接口
const addMoreSku = (sql,param)=>{
    return new Promise((resolve,reject)=>{
        query(sql,param).then(res=>{
            if(res.affectedRows > 0){
                resolve({
                    code:200,
                    message:'添加成功'
                })
                return
            }
            resolve({
                code: 402,
                message: '获取失败'
            })
        }).catch(err => {
            reject(err)
        })
    })
};
const getSearch = (sql, param) => {
    return new Promise((resolve, reject) => {
        console.log(param)
        query(sql, param).then(res => {
            if (res.length > 0) {
                resolve({
                    code: 200,
                    message: '获取成功',
                    data: res
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
};
const getCatName = (sql,param)=>{
    return new Promise((resolve,reject)=>{
        query(sql,param).then(res=>{
            if(res.length > 0){
                resolve({
                    code:200,
                    message:'获取成功',
                    data:res
                })
                return
            }
            resolve({
                code:402,
                message:'添加失败'
            })
        }).catch(err=>{
            reject(err)
        })
    })
}
const getBrandName = (sql,param)=>{
    return new Promise((resolve,reject)=>{
        query(sql,param).then(res=>{
            if(res.length > 0){
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

const getRandomSpu = (sql,param)=>{
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

const getRandSpu = (sql,param)=>{
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

const getCategorySpu = (sql,param)=>{
    return new Promise((resolve,reject)=>{
        query(sql,param).then(res=>{
            if(res.length > 0){
                resolve({
                    code:200,
                    message:'获取成功',
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

const getspecialSpu = (sql,param)=>{
    return new Promise((resolve,reject)=>{
        query(sql,param).then(res=>{
            if(res.length > 0){
                resolve({
                    code:200,
                    message:"获取成功",
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
    addSpu,
    getSku,
    checkDelete,
    updataShop,
    getShop,
    getSpu,
    getShopList,
    updataSpu,
    deleteSpu,
    getSpecParam,
    addMoreSku,
    getSearch,
    addSku,
    getCatName,
    getBrandName,
    getRandomSpu,
    getRandSpu,
    getCategorySpu,
    getspecialSpu,
    updateQuick,
}
