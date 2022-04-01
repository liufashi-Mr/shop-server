const express = require("express");
const router = express.Router();
const {
  setStoreSession,
  getSessionMessage,
} = require("../../modal/session/session");

// 用户、商店发送消息
router.post("/session", (req, res) => {
  let { message, customer_id, store_id, client } = req.body;
  if (!(message && customer_id && store_id && client)) {
    res.json({
      code: 401,
      message: "入参不符",
    });
    return;
  }
  console.log(req.body);
    let sql =
      "insert into t_session (customer_id,store_id,message,client) values (?,?,?,?)";
    let param = [customer_id, store_id, message, client];
    setStoreSession(sql, param)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        console.log(err);
        res.json({
          code: 501,
          message: "服务端错误",
        });
      });
});

// 聊天记录展示
router.post("/sessionMessage", (req, res) => {
  let { customer_id, store_id } = req.body;
  if(!(customer_id&&store_id)){
    res.json({
      code:401,
      message:'入参错误'
    })
    return
  }
  let sql = ` SELECT e.message,e.client,s.logo,s.name,c.username
  FROM t_session e,t_customer c,t_store s
  WHERE e.customer_id = ?
  AND e.store_id = ? `;
  let param = [customer_id,store_id]
  getSessionMessage(sql,param).then(result =>{
      res.json(result)
  }).catch(err =>{
      console.log(err,'cuow');
      res.json({
          code:501,
          message:'服务端错误'
      })
  });
});

module.exports = router;
