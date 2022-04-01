const express=require('express');
const router=express.Router();
const {addShopCar,deleteShopCar,getShopCar}=require("../../modal/shopcar")
router.post("/addShopCar",(req,res)=>{
    let {customer_id,sku_id,num,params}=req.body;
    console.log(req.body)
    if(!(customer_id&&sku_id&&num&&params)){
        res.json({
            code: 401,
            message: '入参不符'
        })
        return;
    }
    
    let sql="insert into t_shopcar (customer_id,sku_id,num,params) values (?,?,?,?)";
    let param=[customer_id,sku_id,num,JSON.stringify(params) ];
    addShopCar(sql,param).then(result=>{
        res.json(result)
    }).catch(err=>{
        console.log(err);
        res.json({
            code:501,
            message:"服务器错误"
        })
    })
})

router.post('/deleteShopCar',(req,res)=>{
    let {id}=req.body;
    if(!id){
        res.json({
            code: 401,
            message: '入参不符'
        })
        return;
    }

    let sql=`DELETE from t_shopcar where id=?`;
    deleteShopCar(sql,[id]).then(result=>{
        res.json(result)
    }).catch(err=>{
        console.log(err);
        res.json({
            code:501,
            message:'服务器错误'
        })
    })
})

router.post("/getShopCar",(req,res)=>{
    let {customer_id}=req.body;
    if(!customer_id){
        res.json({
            code: 401,
            message: '入参不符'
        })
        return;
    }
    let sql="select d.id,d.customer_id,d.sku_id,d.num,d.params,t.spu_id,t.special_price from t_shopcar d join t_sku t on d.sku_id=t.id where customer_id=?"
    getShopCar(sql,[customer_id]).then(result=>{
        res.json(result)
    }).catch(err=>{
        console.log(err);
        res.json({
            code:501,
            message:"服务器错误"
        })
    })

})
module.exports=router