const query = require("../db");

const addRating = (sql, param) => {
    return new Promise((resolve, reject) => {
        query(sql, param).then(res => {
            if (res.affectedRows > 0) {
                resolve({
                    code: 200,
                    message: '添加评论成功',
                    res
                })
                return;
            }
            resolve({
                code: 402,
                meassage: '评论添加失败'
            })
        }).catch(err => {
            reject(err)
        })
    })
};


const delRating = (sql, param) => {
    return new Promise((resolve, reject) => {
        query(sql, param).then(res => {
            if (res.affectedRows > 0) {
                console.log(res.affectedRows)
                resolve({
                    code: 200,
                    message: "删除评论成功"
                })
                return;
            }
            resolve({
                code: 402,
                message: "删除评论失败"
            })
        }).catch(err => {
            reject(err)
        })
    })
};

const getRating = (sql,param)=>{
    return new Promise((resolve,reject)=>{
        query(sql,param).then((res)=>{
            console.log(res)
            if(res.length>0){
                resolve({
                    code:200,
                    message:"获取评论列表成功",
                    res
                })
                return 
            }
            resolve({
                code:'402',
                message:"获取评论列表失败"
            })
        }).catch(err=>{
            reject(err)
        })
    })
}
module.exports = {
    addRating,
    delRating,
    getRating
}