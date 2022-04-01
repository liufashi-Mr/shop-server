const mysql=require('mysql');
const sqlInfo = require("../aliyunSql")
const pool=mysql.createPool({
    // host:"",
    // port:3306,
    // password:'',
    // database:'',
    // connectionLimit:10,
    // user:'root'
    ...sqlInfo
})

const query = (sql, param) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err);
                return;
            }
            connection.query(sql, param, (err, data) => {
                connection.release();
                if (err) {
                    reject(err);
                    return;
                }
                resolve(data);

            })
        })
    })
}

module.exports = query;