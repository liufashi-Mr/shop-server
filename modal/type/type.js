const { param } = require('../../controller/type/type');
const query=require('../db');
// 轮播图
const getSwiper= (sql)=>{
    return new Promise((resolve,reject) =>{
        query(sql).then((res)=>{
            console.log(res);
            if(res){
                resolve({
                    code:200,
                    message:'获取轮播成功',
                    res
                })
                return
            }
            resolve({
                code:402,
                message:'获取轮播失败'
            })
        }).catch(err=>{
            reject(err)
        })
    })
}
const playImg = (sql,param) => {
    return new Promise((resolve,reject) => {
        query(sql,param).then(res=>{
            if(res.length > 0){
                resolve({
                    code:200,
                    message:'获取产品图片',
                    data:res
                })
                return 
            }
            resolve({
                code:402,
                message:'获取图片失败'
            })
        }).catch(err=>{
            reject(err)
        })
    })
}

// pc端 获取一级分类
const getParentName = (sql)=>{
    return new Promise((resolve,reject) =>{
        query(sql).then((res)=>{
            console.log(res);
            if(res){
                resolve({
                    code:200,
                    message:'获取一级分类成功',
                    res
                })
                return
            }
            resolve({
                code:402,
                message:'获取一级分类失败'
            })
        }).catch(err=>{
            reject(err)
        })
    })
}

// pc根据一级分类获取产品接口
const getproduct = (sql,param)=>{
    return new Promise((resolve,reject)=>{
        query(sql,param).then(res=>{
            if(res){
                resolve({
                    code:200,
                    message:'根据一级分类获取产品成功',
                    res
                })
                return
            }
            resolve({
                code:402,
                message:'根据一级分类获取产品失败'
            })
        }).catch(err=>{
            reject(err)
        })
    })
}

// pc 搜索产品---模糊查询
const selectProduct = (sql,param) =>{
    return new Promise((resolve,reject)=>{
        query(sql,param).then(res=>{
            if(res){
                resolve({
                    code:200,
                    message:'查询成功',
                    res
                })
                return
            }
            resolve({
                code:402,
                message:'查询失败'
            })
        }).catch(err=>{
            reject(err)
        })
    })
}

// 
const priceArea = (sql,param)=>{
    return new Promise((resolve,reject)=>{
        query(sql,param).then(res=>{
            if(res){
                resolve({
                    code:200,
                    message:'查询成功',
                    res
                })
                return
            }
            resolve({
                code:402,
                message:'查询失败'
            })
        }).catch(err=>{
            reject(err)
        })
    })
}

// 
const similarProduct = (sql)=>{
    return new Promise((resolve,reject)=>{
        query(sql).then(res=>{
            if(res){
                resolve({
                    code:200,
                    message:'查询成功',
                    res
                })
                return
            }
            resolve({
                code:502,
                message:'查询失败'
            })
        }).catch(err=>{
            reject(err)
        })
    })
}

const addParent = (sql,param)=>{
    return new Promise((resolve,reject)=>{
        query(sql,param).then(res=>{
            if(res){
                resolve({
                    code:200,
                    message:'添加成功',
                    res
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
module.exports = {
    getSwiper,
    playImg,
    getParentName,
    getproduct,
    selectProduct,
    priceArea,
    similarProduct,
    addParent
}