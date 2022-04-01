const query = require('../db');
const { getToken } = require('../../utils/token')


const msgSend = (sql, param) => {
    let username = param[0];
    let tel = param[0];
    let create_time = new Date().getTime();
    let nickname = 'beisiYx_' + param;
    let password = param

    return new Promise((resolve, reject) => {
        query(sql, param).then(res => {
            if (res[0]) {
                res = Object.assign({}, res[0])
                resolve({
                    code: 200,
                    message: "手机号登陆成功",
                    data: { userInfo: res, token: getToken(res) }
                })
                return;
            } else {
                let addSql = "insert into t_customer (username,tel,create_time,nickname,password) values (?,?,?,?,?)";
                query(addSql, [username, tel, create_time, nickname, password]).then(res1 => {
                    let id = res1.insertId;
                    let selectSql = 'select * from t_customer where id=?'
                    query(selectSql, [id]).then(res2 => {
                        console.log(res2, 'res2');
                        if (res2.length > 0) {
                            console.log(222, res2[0]);
                            resolve({
                                code: 200,
                                message: "新用户登录成功",
                                data: { userInfo: res2[0], token: getToken(Object.assign({}, res2[0])) }
                            })
                            return
                        }
                    })
                    // resolve({
                    //     code: 402,
                    //     message: '新用户登录失败'
                    // })
                })
                return
            }
            resolve({
                code: 402,
                message: '手机号登录失败'
            })
        }).catch(err => {
            reject(err);
        })
    })
}
module.exports = {
    msgSend
}