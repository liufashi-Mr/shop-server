const express = require('express');
const router = express.Router();
const {getId} = require('../../modal/classification/class')

// 根据name字段获取品类表的ID
router.post('/class',(req,res)=>{
    let {name} = req.body;
    if(!name){
        res.json({
            code:401,
            message:'入参不符'
        })
        return
    }
    let sql = `select id from t_spec_group where name=?`
    getId(sql,[name]).then(data=>{
        res.json(data)
    }).catch(err=>{
        res.json({
            code:501,
            message:'服务器错误'
        })
    })
})

module.exports = router