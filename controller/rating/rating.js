const express = require("express");
const router = express.Router();
const { addRating, delRating, getRating } = require('../../modal/rating/rating')

router.post('/addRating', (req, res) => {
    let { sku_id, customer_id, rating, comment, parent_comment,img } = req.body;
    if (!(sku_id && rating&& customer_id && comment)) {
        res.json({
            code: 401,
            message: "入参不符"
        })
        return;
    }
    let sql = `insert into t_rating (sku_id, customer_id, rating ,comment,img,parent_comment,create_time) values (?,?,?,?,?,?,?)`;
    
    let param = [sku_id,customer_id, rating, comment, img,parent_comment,Date.now()];

    addRating(sql, param).then(result => {
        res.json(result)
    }).catch(err => {
        console.log(err)
        res.json({
            code: 501,
            message: '服务端错误',
            err
        })
    })
});

router.post('/delRating', (req, res) => {
    let { id } = req.body;
    if (!id) {
        res.json({
            code: 401,
            message: "入参不符"
        });
        return;
    }
    let sql = `delete from t_rating where id=?`;
    delRating(sql, [id]).then(result => {
        res.json(result)
    }).catch(err => {
        res.json({
            code: 501,
            message: "服务端错误",
            err
        })
    })
});

router.post('/getRating', (req, res) => {
    let {spu_id} = req.body;
    if (!spu_id){
        res.json({
            code:401,
            message:"入参不符"
        })
        return
    }
    let sql = 'select s.param,r.`comment`,r.parent_comment,r.create_time,r.img,r.rating,c.avatar,c.nickname from t_sku s join t_rating r on s.id=r.sku_id join t_customer c on r.customer_id=c.id where s.id in ( select id from t_sku where spu_id=?)';
    getRating(sql,[spu_id]).then(result=>{
        res.json(result);
    }).catch(err=>{
        console.log(err);
        res.json({
            code:501,
            message:"服务端错误"
        })
    })
})


module.exports = router;