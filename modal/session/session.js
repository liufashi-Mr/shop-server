const query = require("../db");

const setStoreSession = (sql, param) => {
  return new Promise((resolve, reject) => {
    query(sql, param)
      .then((res) => {
        if (res.affectedRows > 0) {
          resolve({
            code: 200,
            message: "插入成功"
          });
          return;
        }
        reject({
          code: 402,
          message: "插入失败",
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
};
const getSessionMessage = (sql, param) => {
  return new Promise((resolve, reject) => {
    query(sql, param)
      .then((res) => {
        if (res.length>0) {
          resolve({
            code: 200,
            data:res
          });
          return;
        }
        reject({
          code: 402,
          message: "获取消息列表失败aaaaaa",
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
};
module.exports = {
  setStoreSession,
  getSessionMessage,
};
