const express = require('express');
const router = express.Router();
// const md5 = require("md5")
const axios = require("axios")
// const { createOrder } = require("../../utils/createOrder");
const { payOrder } = require("../../utils/alipay");
// const checkSign = require("../../utils/checkSign")
const { addOrder, getOrder, getOrderDetail, deleteOrder, updateOrder, getBackStock, getBackStockDetail,addBackStock, updateBackStock, getUserOrder, getDeliveryInfo, deleteOrderDetail } = require('../../modal/order')

// const { key, EBusinessID } = require('../../delivery_config');
router.post('/payOrder', (req, res) => {
    const { outTradeNo, totalAmount, subject, body } = req.body
    if (!(outTradeNo && totalAmount && subject && body)) {
        res.json({
            code: 401,
            message: '入参不符'
        })
    }
    async function asyncPay() {
        let data = await payOrder(req.body);
        res.json({
            code: 200,
            data
        })
    }
    asyncPay()
});
router.post('/addOrder', (req, res) => {
    let { store_id, customer_id, money, skus, code } = req.body;
    console.log(store_id, customer_id, money, skus)
    if (!(code && store_id && customer_id && money && skus)) {
        res.json({
            code: 401,
            message: '入参不符'
        })
        return;
    }
    let sql = 'insert into t_order (code,store_id,customer_id,money,status,create_time,update_time) values (?,?,?,?,?,?,?)'
    let insertDetil = 'insert into t_order_detail (order_id,sku_id,price,actual_price,num) values (?,?,?,?,?)'
    let param = [code, store_id, customer_id, money, 0, Date.now(), Date.now() + 1000 * 60];
    skus = JSON.parse(skus);
    addOrder(sql, param, insertDetil, skus).then(result => {
        if (result.code == 200) {
            result.data = { code };
        }
        res.json(result)
    }).catch(err => {
        console.log(err);
        res.json({
            code: 501,
            message: "服务端错误"
        })
    })
})


router.post('/updateOrder', (req, res) => {
    let { id, status, ecp, address, postid } = req.body;
    if (!(id && status)) {
        res.json({
            code: 401,
            message: '入参不符'
        })
        return;
    }
    let sqls = ["update t_order set status=? where id=?"]
    let params = [[status, id]]
    if (status == 2) {
        sqls.push("insert into t_delivery (postid,ecp,address,order_id,create_time) values (?,?,?,?,?)")
        params.push([postid, ecp, address, id, Date.now()])
    }
    if (status == 1) {
        sqls = ["update t_order set status=?,payment_type=2 where id=?"];
    }
    updateOrder(sqls, params).then(result => {
        res.json(result);
    }).catch(err => {
        console.log(err);
        res.json({
            code: 501,
            message: "服务器端错误"
        })
    })

})

router.post('/getOrder', (req, res) => {
    let { store_id, page, count } = req.body;
    if (!(store_id && page && count)) {
        res.json({
            code: 401,
            message: '入参不符'
        })
        return;
    }
    count = parseInt(count) || 20;
    let start = (page - 1) * count
    let queryOrder = "select * from t_order  where store_id=? and is_normal=1 limit ?,?";
    let queryCount = "select count(id) from t_order where store_id=? and is_normal=1"
    getOrder([queryOrder, queryCount], [[store_id, start, count], [store_id]]).then(result => {
        console.log(result)
        res.json(result);
    }).catch(err => {
        console.log(err);
        res.json({
            code: 501,
            message: "服务器端错误"
        })
    })
})

router.post('/getOrderDetail', (req, res) => {
    let { order_id, status } = req.body;
    console.log(req.body)
    if (!order_id) {

        res.json({
            code: 401,
            message: '入参不符'
        })
        return;
    }
    let queryDetail = "select sku.id,sku.imgs,sku.title, sku.price ,sku.param, det.num,det.price,det.actual_price from t_order_detail det join t_sku sku on det.sku_id=sku.id where order_id=?"
    let queryMoney = "select detail.actual_price,detail.price from t_order o join t_order_detail detail on detail.order_id=o.id where o.id=?"
    let queryAddress = "select a.name, a.tel ,a.address from t_customer_address a join t_order o on o.customer_id=a.customer_id where o.id=? and a.prime=1";
    let tDelivery = "select o.`code`,o.create_time,o.update_time,o.payment_type,o.is_normal,o.`status`,o.postage ,o.id,o.money,d.postid,d.ecp from t_order o join t_delivery d on o.id=d.order_id where d.order_id=?";
    let nDelivery = "select `code`,id,create_time,update_time,is_normal,payment_type,money,`status`,postage from t_order where id=?"
    let queryDelivery = nDelivery;
    if (status > 1) {
        queryDelivery = tDelivery
    }
    let sql = [queryDetail, queryMoney, queryAddress, queryDelivery];
    // if(typeof status=="undefined"){
    //     sql="select a.name, a.tel ,a.address,o.id from t_customer_address a join t_order o on o.customer_id=a.customer_id where o.id=? and a.prime=1"
    // }
    getOrderDetail(sql, [order_id], status).then(result => {
        res.json(result)
    }).catch(err => {
        console.log(err);
        res.json({
            code: 501,
            message: "服务器端错误"
        })
    })
})

router.post('/deleteOrder', (req, res) => {
    let { id } = req.body;
    if (!id) {
        res.json({
            code: 401,
            message: '入参不符'
        })
        return;
    }
    let sql = "delete from t_order where id=?";
    deleteOrder(sql, [id]).then(result => {
        res.json(result)
    }).catch(err => {
        console.log(err);
        res.json({
            code: 501,
            message: "服务器端错误"
        })
    })
})

router.post('/getBackStock', (req, res) => {
    let { store_id } = req.body;
    if (!store_id) {
        res.json({
            code: 401,
            message: '入参不符'
        })
        return;
    }
    let sql = "select bs.id,bs.order_id,bs.create_time,bs.update_time,bs.status,bs.reason,bs.money from t_backstock as bs join t_order as o on o.id=bs.order_id WHERE o.store_id=? and is_normal=0"
    getBackStock(sql, [store_id]).then(result => {
        console.log(result)
        res.json(result)
    }).catch(err => {
        console.log(err);
        res.json({
            code: 501,
            message: "服务器端错误"
        })
    })
})

router.post('/getBackStockDetail', (req, res) => {
    let { order_id } = req.body;
    if (!order_id) {
        res.json({
            code: 401,
            message: '入参不符'
        })
        return;
    }
    let backStock = "select bs.money,bs.create_time,bs.update_time,bs.`status`,bs.reason,bs.imgs,o.status as orderStatus from t_order o join t_backstock bs on bs.order_id=o.id where order_id=?";
    let user = "select cd.name as user,cd.tel as userTel,cd.address as userAdd from t_order o join t_customer_address  cd on o.customer_id=cd.customer_id where prime=1 and o.id=?"
    let store = "select st.name as store,st.tel as storeTel,st.address as storeAdd,st.region  from t_order o join t_store st on o.store_id=st.id where o.id=?";
    let detail = "select detail.actual_price,detail.price from t_order o join t_order_detail detail on detail.order_id=o.id where detail.order_id=?"
    let skus = "select sku.id,sku.imgs,sku.title,sku.price,sku.param,detail.num,detail.actual_price from t_sku sku join t_order_detail detail  on sku.id=detail.sku_id where detail.order_id=?"
    getBackStockDetail([backStock, user, store, detail, skus], [order_id]).then(result => {
        console.log(result)
        res.json(result)
    }).catch(err => {
        console.log(err);
        res.json({
            code: 501,
            message: "服务器端错误"
        })
    })
})

router.post('/updateBackStock', (req, res) => {
    let { id, status } = req.body;
    if (!(id && status)) { 
        res.json({
            code: 401,
            message: '入参不符'
        })
        return;
    }
    let sql = "update t_backStock set status=? where id=?"
    updateBackStock(sql, [status, id]).then(result => {
        res.json(result);
    }).catch(err => {
        console.log(err);
        res.json({
            code: 501,
            message: "服务器端错误"
        })
    })

})

router.post('/addBackStock', (req, res) => {
    let { order_id, reason, money, imgs } = req.body
    if (!(order_id && reason)) {
        res.json({
            code: 401,
            message: '入参不符'
        })
        return;
    }
    let sql = "insert into t_backStock (order_id,create_time,update_time,reason,money,imgs) values (?,?,?,?,?,?)"
    let param = [order_id, Date.now(), Date.now(), reason, money, imgs]
    addBackStock(sql, param).then(result => {
        res.json(result);
    }).catch(err => {
        console.log(err);
        res.json({
            code: 501,
            message: "服务器端错误"
        })
    })
})
router.post('/getDeliveryInfo', (req, res) => {
    let { id } = req.body;
    if (!id) {
        res.json({
            code: 401,
            message: '入参不符'
        })
        return;
    }
    let sql = "select d.ecp,d.postid from t_delivery d join t_order o on o.id=d.order_id  where o.id= ?"
    getDeliveryInfo(sql, [id]).then(data => {
        // let requestData = JSON.stringify(data);
        // let cba = requestData + key;
        // let abc = md5(cba);
        // let base = Buffer.from(abc).toString("base64");
        // let result = encodeURIComponent(base);
        // let body = encodeURIComponent(requestData)
        // axios({
        //     url: `http://api.kdniao.com/Ebusiness/EbusinessOrderHandle.aspx?EBusinessID=${EBusinessID}&RequestType=1002&DataSign=${result}&RequestData=${requestData}`,
        //     method: 'POST',

        // }).then(result => {
        //     console.log(result.data);
        //     res.json(result.data)
        // })
        axios({
            url: `http://kdwlcxf.market.alicloudapi.com/kdwlcx?no=${data.no}`,
            method: "GET",
            headers: {
                "Authorization": "APPCODE fba5b2a0dce847ddb1ea5dc75aca74c5"
            }
        }).then(result => {
            res.json(result.data)
        })
    })
})


// router.post('/createOrder', (req, res) => {
//     console.log(req.body.price);
//     req.body.pack_params = {
//         payName: req.body.payName,
//         goodsName: req.body.goodsName,
//         price: req.body.price,
//         count: req.body.count,
//         cost: req.body.cost,
//     }
//     function asyncCreate() {
//         console.log(createOrder);
//         // const result = await createOrder(req.body);
//         // res.send(result);
//         createOrder(req.body).then(result => {
//             console.log(result);
//             res.send(result)
//
//         }).catch(err => {
//             console.log(err);
//         })
//     }
//     asyncCreate();
// });
//
//
// router.post('/notify.html', (req, res) => {
//     // 输出验签结果
//     async function checkResult(postData) {
//         let result = await checkSign(postData);
//         if (result) {
//             // console.log('订单成功支付！！！请做处理')
//             // console.log(req.body);
//             let data = req.body;
//             let goods = JSON.parse(data.passback_params);
//             let sqlStr = `
//             insert into order_list value("${data.out_trade_no}",
//                 "${data.trade_no}",
//                 "${goods.goodsName}",
//                 ${goods.price},
//                 ${goods.count},
//                 ${data.total_amount},
//                 "支付成功",
//                 "${goods.payName}");
//             `;
//             // 响应支付宝 success 处理成功，否则支付宝会一直定时发送异步通知
//             res.end('success');
//             mysql.addSql(sqlStr)
//         }
//     }
//     checkResult(req.body);
// })
//
// router.get('/payresult', (req, res) => {
//     let htmlStr = '';
//     htmlStr += `<p>` + '商户订单号' + ': ' + req.query.out_trade_no + '</p>'
//     htmlStr += `<p>` + '支付宝交易订单号' + ': ' + req.query.trade_no + '</p>'
//     htmlStr += `<p>` + '交易金额' + ': ' + req.query.total_amount + '￥</p>'
//     htmlStr += `<p>` + '交易时间' + ': ' + req.query.timestamp + '￥</p>'
//     htmlStr += '<h1 style:"text-align:center;">支付成功！！！<a href="./index.html">返回首页!</a></h1>'
//     res.send(htmlStr);
// })


router.post('/getUserOrder', (req, res) => {
    let { customer_id } = req.body;
    if (!customer_id) {
        res.json({
            code: 401,
            message: '入参不符'
        })
        return;
    }
    let order = "select id,store_id,money,status,is_normal,create_time as order_create_time,update_time,code from t_order where customer_id=?"
    let skus = "select s.*,det.price as detail_price,det.actual_price,det.num from t_sku s join t_order_detail det on s.id=det.sku_id WHERE det.order_id=?"
    getUserOrder([order, skus], [[customer_id]]).then(result => {
        res.json(result)
    }).catch(err => {
        console.log(err);
        res.json({
            code: 501,
            message: "服务器端错误"
        })
    })
})

router.post('/deleteOrderDetail', (req, res) => {
    let { sku_id, order_id } = req.body;
    if (!(sku_id && order_id)) {
        res.json({
            code: 401,
            message: '入参不符'
        })
        return;
    }
    let sql = 'delete from t_order_detail where order_id=? and sku_id=? ';
    deleteOrderDetail(sql, [order_id, sku_id]).then(data => {
        res.json(data)
    }).catch(err => {
        console.log(err)
        res.json({
            code: 501,
            message: "服务器端错误"
        })
    })
})
module.exports = router;
