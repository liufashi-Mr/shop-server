const express = require('express');
const router = express.Router();
const {register, login, addInfoModify, getInfo, getstoreBrand, getStoreSpu, getstoreSku, getStoreAll} = require('../../modal/store/user');

router.post('/register', (req, res) => {
    let {name, password, tel} = req.body;
    if (!(name && password && tel)) {
        res.json(
            {
                code: 401,
                message: '入参不符'
            }
        )
        return;
    }
    let sql = "insert into t_store (name,`password`,tel) values (?,?,?)";
    register(sql, [name, password]).then(result => {
        res.json(result)
    }).catch(err => {
        console.log(err);
        res.json({
            code: 501,
            message: "服务端错误"
        })
    })

})

router.post('/login', (req, res) => {
    let {name, password} = req.body;
    if (!(name && password)) {
        res.json(
            {
                code: 401,
                message: '入参不符'
            }
        )
        return;
    }
    let sql = "select * from t_store where name=? and password=? ";
    login(sql, [name, password]).then(result => {
        res.json(result)
    }).catch(err => {
        console.log(err);
        res.json({
            code: 501,
            message: "服务端错误"
        })
    })
})

router.post('/infoModify', (req, res) => {
    let {name, address, avatar, real_name, region, tel, desc, id} = req.body;
    if (!(name && address && avatar && real_name && region && tel && id)) {
        res.json(
            {
                code: 401,
                message: '入参不符'
            }
        )
        return;
    }
    let sql = "update t_store set `name`=?,address=?,`desc`=?,avatar=?,`region`=?,tel=?,real_name=? where id=?";
    let param = [name, address, desc, avatar, region, tel, real_name, id]
    console.log(param);
    addInfoModify(sql, param).then(result => {
        res.json(result)
    }).catch(err => {
        console.log(err);
        res.json({
            code: 501,
            message: "服务端错误"
        })
    })

})
// 获取的是店铺信息
router.post('/getInfo', (req, res) => {
    let {id} = req.body;
    if (!id) {
        res.json(
            {
                code: 401,
                message: '入参不符'
            }
        )
        return;
    }
    let sql = "select id,name,address,`desc`,avatar,`region`,tel,real_name from t_store where id=?";
    getInfo(sql, [id]).then(result => {
        res.json(result)
    }).catch(err => {
        console.log(err);
        res.json({
            code: 501,
            message: "服务端错误"
        })
    })
})


// 获取店铺下的品牌
router.post('/getstoreBrand', (req, res) => {
    let {id} = req.body;
    if (!id) {
        res.json({
            code: 401,
            message: "入参不符"
        })
        return
    }
    let sql = 'SELECT `name` FROM t_spu spu JOIN t_brand brand ON spu.brand_id = brand.id WHERE store_id = ?';
    getstoreBrand(sql, [id]).then(result => {
        res.json(result)
    }).catch(err => {
        console.log(err);
        res.json({
            code: 501,
            message: "服务端错误"
        })
    })
})

router.post('/getStoreSpu', (req, res) => {
    let {id} = req.body
    if (!id) {
        res.json({
            code: 401,
            message: '入参不符'
        })
        return
    }
    let sql = 'SELECT * FROM t_spu spu JOIN t_brand brand ON spu.brand_id = brand.id WHERE store_id = ?';
    getStoreSpu(sql, [id]).then(result => {
        res.json(result)
    }).catch(err => {
        res.json({
            code: 501,
            message: '服务端错误',
            err
        })
    })
})

router.post('/getstoreSku', (req, res) => {
    let {spu_id} = req.body;
    if (!spu_id) {
        res.json({
            code: 401,
            message: '入参不符'
        })
        return
    }
    let sql = 'SELECT sku.* FROM t_spu spu JOIN t_sku sku ON spu.id = sku.spu_id WHERE spu_id = ?'
    getstoreSku(sql, [spu_id]).then(result => {
        res.json(result)
    }).catch(err => {
        res.json({
            code: 501,
            message: '服务端错误',
            err
        })
    })
})

router.post('/getStoreAll', (req, res) => {
    let {id} = req.body
    if (!id) {
        res.json({
            code: 401,
            message: '入参不符'
        })
        return
    }
    let sql = `SELECT * from t_store`
    getStoreAll(sql, [id]).then(result => {
        res.json(result)
    }).catch(err => {
        res.jsob({
            code: 501,
            message: '服务端错误',
            err
        })
    })
})
module.exports = router;

