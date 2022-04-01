const express = require('express');
const router = express.Router();
const { addDelivery,updateDelivery,getDelivery } = require('../../modal/delivery')
router.post('/addDelivery', (req, res) => {
    let { postid, ecp, address, order_id } = req.body
    if (!(postid && ecp && address && order_id)) {
        res.json({
            code: 401,
            message: '入参不符'
        })
        return;
    }
    let sql = "insert into t_delivery (postid,ecp,address,order_id,create_time) values (?,?,?,?,?)";
    let param = [postid, ecp, address, order_id, Date.now()];
    addDelivery(sql,param).then(result=>{
        res.json(result)
    }).catch(err=>{1
        console.log(err);
        res.json({
            code:501,
            message:'服务端错误'
        })
    })
})


router.post('/updateDelivery',(req,res)=>{
    let {id}=req.body;
    if(!id){
        res.json({
            code: 401,
            message: '入参不符'
        })
        return;
    }
    let sql ="update t_delivery set is_delete=? where id=?";
    updateDelivery(sql,[1,id]).then(result=>{
        res.json(result);
    }).catch(err=>{
        console.log(err);
        res.json({
            code:501,
            message:'服务端错误'
        })
    })
})

router.post('/getDelivery',(req,res)=>{
    let {order_id}=req.body;
    if(!order_id){
        res.json({
            code: 401,
            message: '入参不符'
        })
        return;
    }
    let sql="select id,postid,ecp,address from t_delivery where order_id=?";
    getDelivery(sql,[order_id]).then(result=>{
        res.json(result);
    }).catch(err=>{
        console.log(err);
        res.json({
            code:501,
            message:'服务端错误'
        })
    })
})
module.exports = router;