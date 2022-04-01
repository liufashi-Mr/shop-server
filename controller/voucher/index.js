const express = require("express");
const router = express.Router();

const {
  getVoucher,
  addVoucher,
  deleteVoucher,
  selectVoucher,
  editVoucheer,
  seeVoucher
} = require("../../modal/voucher");
router.post("/getVoucher", (req, res) => {
  let { store_id } = req.body;
  if (!store_id) {
    res.json({
      code: 401,
      message: "入参不符",
    });
    return;
  }
  let sql =
    "select id,name,deno,`condition`,start_time,end_time from t_voucher where store_id=?";
  getVoucher(sql, [store_id])
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

router.post("/addVoucher", (req, res) => {
  let { store_id, spu_id, start_time, end_time, deno, condition,name } = req.body;
  if (!(store_id && spu_id && start_time && end_time && deno && condition && name)) {
    res.json({
      code: 401,
      message: "入参不符",
    });
    return;
  }
  let sql =
    "insert into t_voucher (store_id,spu_id,start_time,end_time,deno,`condition`,name) values (?,?,?,?,?,?,?)";
  let param = [store_id, spu_id, start_time, end_time, deno, condition,name];
  addVoucher(sql, param)
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

router.post("/deleteVoucher", (req, res) => {
  let { id } = req.body;
  if (!id) {
    res.json({
      code: 401,
      message: "入参不符",
    });
    return;
  }
  let sql = "delete from t_voucher where `id` = ?;";
  deleteVoucher(sql, [id])
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

router.post("/selectVoucher",(req,res)=>{
  let {name} = req.body;
  if(!name){
      res.json({
          code:401,
          message:'入参不符'
      })
      return
  }
  let sql = " select * from t_voucher where `name` =?";
  selectVoucher(sql,[name]).then(result=>{
      res.json(result)
  }).catch(err=>{
      res.json({
          code:501,
          message:'服务端错误',
          err
      })
  })
})

router.post("/editVoucheer",(req,res)=>{
  let {id,deno,start_time,end_time,name,condition} = req.body;
  if(!id&&(deno&&start_time&&end_time&&name&&condition)){
      res.json({
          code:401,
          message:'入参不符'
      })
      return 
  }
  let param = [deno,start_time,end_time,name,condition,id]
  let sql = "update t_voucher set deno=?,start_time=?,end_time=?,`name`=?,`condition`=? where id=?"
  editVoucheer(sql,param).then(result=>{
      res.json(result)
  }).catch(err=>{
      console.log(err)
      res.json({
          code:501,
          message:'服务端错误'
      })
  })
})

router.post("/seeVoucheer",(req,res)=>{
  let {id} = req.body
  if(!id){
    res.json({
      code:401,
      message:'入参不符'
    })
    return 
  }
  let sql = 'select deno,`condition`,start_time,end_time,`name` from t_voucher WHERE id = ?'
  let param = [id]
  seeVoucher(sql,param).then(result=>{
    res.json(result)
  }).catch(err=>{
    console.log(err);
    res.json({
      code:501,
      message:'服务端错误'
    })
  })
})

module.exports = router;
