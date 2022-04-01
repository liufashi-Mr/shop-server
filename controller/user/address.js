const express = require('express');
const router = express.Router();
const { addAddress, updateAddress, defaultAddress, deleteAddress, getAddress, clearDefaultAddress } = require('../../modal/user/address')


// 新增收货地址
router.post('/addAddress', (req, res) => {
    let { customer_id, name, tel, address, prime } = req.body
    if (!(name && tel && address)) {
        res.json({
            code: 401,
            message: '入参不符'
        })
        return
    }
    let sqlClear = `update t_customer_address set prime=false where prime=true and customer_id=?` 
    if (!prime) { 
        sqlClear = `update t_customer_address set prime=false where prime=false and customer_id=?` 
    }
    clearDefaultAddress(sqlClear, [customer_id]).then(data => {
        let sql = `insert into t_customer_address (customer_id,name,tel,address,prime) value (?,?,?,?,?)`
        addAddress(sql, [customer_id, name, tel, address, prime]).then((data) => {
            res.json(data)
        }).catch((err) => {
            console.log(err);
            res.json({
                code: 501,
                message: "服务端错误"
            })
        })
    })
    
})

// 修改收货地址
router.post('/updateAddress', (req, res) => {
    let { name, tel, address, id } = req.body;
    if (!(id && name && tel && address)) {
        res.json({
            code: 401,
            message: '入参不符'
        })
        return
    }
    let sql = `update t_customer_address set name=?,tel=?,address=? where id=?`
    updateAddress(sql, [name, tel, address, id]).then(data => {
        res.json(data)
    }).catch(err => {
        res.json({
            code: 501,
            message: "服务端错误"
        })
    })
})

// 设置默认收货地址
router.post('/defaultAddress', (req, res) => {
    let { id, prime, customer_id } = req.body
    if (!(id)) {
        res.json({
            code: 401,
            message: '参数不符'
        })
        return
    }
    prime = Number(prime)
    let sql = `update t_customer_address set prime=0 where prime=1 and customer_id=?`
    clearDefaultAddress(sql, [customer_id]).then(data => {
        let sqldelete = `update t_customer_address set prime=? where id=?`
        defaultAddress(sqldelete, [prime, id]).then(data => {
            res.json(data)
        }).catch(err => {
            res.json({
                code: 501,
                message: "服务端错误"
            })
        })
    })
})

// 删除地址
router.post('/deleteAddress', (req, res) => {
    let { id } = req.body;
    if (!id) {
        res.json({
            code: 401,
            message: '入参不符'
        })
        return
    }
    let sql = `delete from t_customer_address where id=?`
    deleteAddress(sql, [id]).then(data => {
        res.json(data)
    }).catch(err => {
        res.json({
            code: 501,
            message: "服务端错误"
        })
    })
})

// 获取地址
router.post('/getAddress', (req, res) => {
    let { customer_id } = req.body;
    if (!customer_id) {
        res.json({
            code: 401,
            message: '入参不符'
        })
        return
    }
    let sql = `select * from t_customer_address where customer_id=?`
    getAddress(sql, [customer_id]).then((data) => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})
// 获取默认地址
router.post('/getDefaultAddress', (req, res) => {
    let { customer_id } = req.body;
    if (!customer_id) {
        res.json({
            code: 401,
            message: '入参不符'
        })
        return
    }
    let sql = `select * from t_customer_address where customer_id=? and prime=1`
    getAddress(sql, [customer_id]).then((data) => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})
module.exports = router