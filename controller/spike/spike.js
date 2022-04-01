const express = require("express");
const router = express.Router();
const {addSpike,delSpike,getSpike,slectSpike,updateSpike} = require('../../modal/spike/spike')

router.post('/addspike',(req,res)=>{
    let {spu_id,star_time,end_time,active_name} = req.body;
    if(!(spu_id&&star_time&&end_time&&active_name)){
        res.json({
            code:401,
            message:"入参不符合"
        });
        return;
    }
    let sql = `insert into t_miaosha (spu_id,star_time,end_time,active_name) values (?,?,?,?)`
    let param = [spu_id,star_time,end_time,active_name];
    addSpike(sql,param).then(result=>{
        res.json(result)
    }).catch(err=>{
        console.log(err)
        res.json({
            code:501,
            message:"服务器端错误",
            err
        })
    })
});

router.post('/delspike',(req,res)=>{
    let {id} = req.body;
    if(!id){
        res.json({
            code:401,
            message:"入参不符"
        })
        return
    }
    let sql = `delete from t_miaosha where id=?`;
    delSpike(sql,[id]).then(result=>{
       res.json(result)
    }).catch(err=>{
        res.json({
            code:501,
            message:'服务端错误',
            err
        })
    })
});

router.post('/getspike',(req,res)=>{
    let {id} = req.body;
    if(!id){
        res.json({
            code:401,
            message:'入参不符'
        })
        return
    }
    // let sql = `SELECT  FROM_UNIXTIME(star_time,end_time) AS a FROM t_miaosha`
    // let sql = `select id,spu_id,active_name,FROM_UNIXTIME(star_time),FROM_UNIXTIME(end_time) from t_miaosha`;
    let sql = `select id,spu_id,active_name,star_time,end_time from t_miaosha`;
    getSpike(sql,[id]).then(result=>{
        res.json(result);
    }).catch(err=>{
        console.log(err);
        res.json({
            code:501,
            message:'服务端错误'
        })
    })
})

router.post('/slectspike',(req,res)=>{
    let {active_name} = req.body;
    if(!active_name){
        res.json({
            code:401,
            message:'入参不符'
        })
        return
    }
    let sql = `select * from t_miaosha where active_name=?`;
    slectSpike(sql,[active_name]).then(result=>{
        res.json(result);
    }).catch(err=>{
        console.log(err);
        res.json({
            code:501,
            message:'服务端错误'
        })
    })
})

router.post('/updatespike',(req,res)=>{
    let {id,spu_id,star_time,end_time,active_name} = req.body;
    if(!(id&&spu_id&&star_time&&end_time&&active_name)){
        res.json({
            code:401,
            message:"入参不符合"
        });
        return;
    }
    let sql = `update t_miaosha set spu_id=?,star_time=?,end_time=?,active_name=? where id=?;`
    let param = [spu_id,star_time,end_time,active_name,id];
    updateSpike(sql,param).then(result=>{
        res.json(result)
    }).catch(err=>{
        console.log(err)
        res.json({
            code:501,
            message:'服务端错误'
        })
    })
})

module.exports = router