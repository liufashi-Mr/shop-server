const { param } = require("../../controller/order");
const query = require("../db");

const getVoucher = (sql, param) => {
  return new Promise((resolve, reject) => {
    query(sql, param).then((res) => {
      if (res.length > 0) {
        for (var i = 0; i < res.length; i++) {
          function timestampToTime(timestamp) {
            var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var Y = date.getFullYear() + "-";
            var M =
              (date.getMonth() + 1 < 10
                ? "0" + (date.getMonth() + 1)
                : date.getMonth() + 1) + "-";
            var D = date.getDate() + " ";
            var h = date.getHours() + ":";
            var m = date.getMinutes() + ":";
            var s = date.getSeconds();
            return Y + M + D + h + m + s;
          }
          res[i].start_time = timestampToTime(res[i].start_time);
          res[i].end_time = timestampToTime(res[i].end_time);
        }
        resolve({
          code: 200,
          message: "获取优惠券成功",
          data: res,
        });
        return;
      }
      resolve({
        code: 402,
        message: "获取优惠券失败",
      });
    });
  }).catch((err) => {
    reject(err);
  });
};

const addVoucher = (sql, param) => {
  return new Promise((resolve, reject) => {
    query(sql, param)
      .then((res) => {
        if (res.affectedRows > 0) {
          resolve({
            code: 200,
            message: "添加优惠成功",
          });
          return;
        }
        resolve({
          code: 402,
          message: "添加优惠券失败",
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
};
const deleteVoucher = (sql, param) => {
  return new Promise((resolve, reject) => {
    query(sql, param)
      .then((res) => {
        if (res.affectedRows > 0) {
          resolve({
            code: 200,
            message: "删除优惠券成功",
          });
          return;
        }
        resolve({
          code: 402,
          message: "删除优惠券失败",
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
};
// 搜索
const selectVoucher = (sql, param) => {
  return new Promise((resolve, reject) => {
    query(sql, param)
      .then((res) => {
        if (res.length > 0) {
          for (var i = 0; i < res.length; i++) {
            function timestampToTime(timestamp) {
              var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
              var Y = date.getFullYear() + "-";
              var M =
                (date.getMonth() + 1 < 10
                  ? "0" + (date.getMonth() + 1)
                  : date.getMonth() + 1) + "-";
              var D = date.getDate() + " ";
              var h = date.getHours() + ":";
              var m = date.getMinutes() + ":";
              var s = date.getSeconds();
              return Y + M + D + h + m + s;
            }
            res[i].start_time = timestampToTime(res[i].start_time);
            res[i].end_time = timestampToTime(res[i].end_time);
          }
          resolve({
            code: 200,
            message: "查询优惠券列表成功",
            res,
          });
          return;
        }
        resolve({
          code: 402,
          message: "查询优惠券列表失败",
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
};
// 编辑
const editVoucheer = (sql, param) => {
  return new Promise((resolve, reject) => {
    query(sql, param)
      .then((res) => {
        if (res.affectedRows > 0) {
          resolve({
            code: 200,
            message: "修改优惠券信息成功",
            res,
          });
          return;
        }
        resolve({
          code: 402,
          message: "修改优惠券列表失败",
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// 查看
const seeVoucher = (sql, param) => {
  return new Promise((resolve, reject) => {
    query(sql, param)
      .then((res) => {
        if (res.length > 0) {
          for (var i = 0; i < res.length; i++) {
            function timestampToTime(timestamp) {
              var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
              var Y = date.getFullYear() + "-";
              var M =
                (date.getMonth() + 1 < 10
                  ? "0" + (date.getMonth() + 1)
                  : date.getMonth() + 1) + "-";
              var D = date.getDate() + " ";
              var h = date.getHours() + ":";
              var m = date.getMinutes() + ":";
              var s = date.getSeconds();
              return Y + M + D + h + m + s;
            }
            res[i].start_time = timestampToTime(res[i].start_time);
            res[i].end_time = timestampToTime(res[i].end_time);
          }
          resolve({
            code: 200,
            message: "查询优惠券列表成功",
            res,
          });
          return;
        }
        resolve({
          code: 402,
          message: "获取优惠券信息失败",
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
};
module.exports = {
  getVoucher,
  addVoucher,
  deleteVoucher,
  selectVoucher,
  editVoucheer,
  seeVoucher,
};
