const express = require('express');
const router = express.Router();
const {getspecialSpu, getCategorySpu, addSpu, getSku, checkDelete, updataShop, getShop, getSpu, updataSpu, deleteSpu, getSpecParam, addMoreSku, getSearch, addSku, getCatName, getBrandName, getShopList, getRandomSpu, getRandSpu, checkDeleteShop, updateQuick} = require('../../modal/store/product')

router.post('/addSpu', (req, res) => {
    let {title, brand, spec, img, store_id, price, special_price, is_special,verifyIndex} = req.body;
    console.log(req.body);
    if (!(title && store_id && spec && price && is_special)) {
        res.json({
            code: 401,
            message: '入参不符'
        })
        return;
    }
    if(!verifyIndex){
        verifyIndex=Date.now()
    }
    // let check = [
    //     { sql: "insert into t_category (`name`)  values (?) on duplicate key update `name`=?", param: [spec, spec] },
    //     { sql: "insert into t_spec_group (`name`)  values (?) on duplicate key update `name`=?", param: [spec, spec] },
    //     { sql: "insert into t_brand (`name`)  values (?) on duplicate key update `name`=?", param: [brand, brand] }
    // ];
    let query = [
        {sql: "select id from t_category where  `name`=?", param: [spec]},
        {sql: "select id from t_brand where  `name`=?", param: [brand]},
        {sql: "select id from t_spec_group where  `name`=?", param: [spec]}
    ];

    let sql = "insert into t_spu (category_id,brand_id,spg_id,img,title,store_id,price,special_price,is_special,sale,verifyIndex) values(?,?,?,?,?,?,?,?,?,?,?)"
    let insert = "insert into t_brand_category (brand_id,category_id) values (?,?) on duplicate key update brand_id=?,category_id=?"
    let param = [img, title, store_id, price, special_price, is_special, 0,verifyIndex]
    // if (brand) {
    //     check.push({ sql: "insert into t_brand (`name`)  values (?) on duplicate key update `name`=?", param: [brand, brand] })
    // }
    addSpu([sql, insert], [param], query).then(result => {
        res.json(result)
    }).catch(err => {
        console.log(err);
        res.json({
            code: 501,
            message: '服务端错误'
        })
    })
})

router.post('/getSku', (req, res) => {
    let {spu_id, id} = req.body
    if (!spu_id && !id) {
        res.json({
            code: 401,
            message: '入参不符'
        })
        return
    }
    let sql = `select * from t_sku where spu_id=? or id=?`
    getSku(sql, [spu_id, id]).then(data => {
        res.json(data)
    }).then(err => {
        res.json(err)
    })
})

// 尧 增加了stock 2020.9.27
router.post('/addSku', (req, res) => {
    let {title, spu_id, imgs, price, param, stock,special_price} = req.body;
    if (!(spu_id && title && price && param)) {
        res.json({
            code: 401,
            message: '入参不符'
        })
        return;
    }
    let sql = "insert into t_sku (title,spu_id,imgs,price,param,stock,special_price,sale) values (?,?,?,?,?,?,?,?)";
    price = parseFloat(price).toFixed(2);
    let reqParam = [title, spu_id, imgs, price, param, stock,special_price,0]
    addSku(sql, reqParam).then(result => {
        res.json(result)
    }).catch(err => {
        console.log(err);
        res.json({
            code: 501,
            message: '服务端错误'
        })
    })
});
// yao 增加了第二个添加sku的接口
router.post('/addMoreSku', (req, res) => {
    let {params} = req.body
    if (!params) {
        res.json({
            code: 401,
            msg: "入参不符"
        })
        return
    }
    let str = '';
    let num = params.length / 8;
    for (let i = 0; i < num; i++) {
        str += ', (?,?,?,?,?,?,?,?)'
    }
    str = str.substring(1)
    console.log(params)
    let sql = `insert into t_sku (param,price,stock,title,spu_id,imgs,desc_pc,desc_app) values ${str}`;
    addMoreSku(sql, params).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

// 根据id删除sku
router.post('/checkDelete', (req, res) => {
    let {id} = req.body;
    id = parseInt(id)
    if (!id) {
        res.json({
            code: 401,
            msg: "入参不符"
        })
        return
    }
    let sql = `delete from t_sku where id=?`;
    checkDelete(sql, [id]).then(result => {
        res.json(result)
    }).catch(err => {
        console.log(err);
        res.json({
            code: 501,
            message: "服务端错误"
        })
    })
});
// 根据spu_id删除sku
router.post('/checkDeleteShop', (req, res) => {
    let {spu_id} = req.body;
    spu_id = parseInt(spu_id)
    if (!spu_id) {
        res.json({
            code: 401,
            msg: "入参不符"
        })
        return
    }
    let sql = `delete from t_sku where spu_id=?`;
    checkDeleteShop(sql, [spu_id]).then(result => {
        res.json(result)
    }).catch(err => {
        console.log(err);
        res.json({
            code: 501,
            message: "服务端错误"
        })
    })
});
// 更新sku
router.post('/updateQuick', (req, res) => {
    let {spu_id, price, stock, param} = req.body;
    spu_id = parseInt(spu_id);
    price = parseFloat(price).toFixed(2);
    if (!(spu_id && price && stock && param)) {
        res.json({
            code: 401,
            message: '入参不符'
        })
        return
    }
    let sql = `update t_sku set price=?,stock=?,param=? where spu_id=?;`;
    let sql_ = `update t_spu set price=? where id=?;`
    let params = [price, stock, param, spu_id];
    let params_ = [price, spu_id];
    updateQuick(sql, params).then(result => {
        if (result.code == 200) {
            updateQuick(sql_, params_).then(result => {
                res.json(result)
            })
        }
    }).catch(err => {
        console.log(err);
        res.json({
            code: 501,
            message: '服务端错误'
        })
    })
});
router.post('/updateShop', (req, res) => {
    let {id, title, imgs, price, stock, detailHtml, detailMobileHtml} = req.body;
    console.log(id, title, imgs, price, stock, detailHtml, detailMobileHtml)
    id = parseInt(id);
    price = parseFloat(price).toFixed(2);
    if (!(id && title && imgs && price && stock && detailHtml)) {
        res.json({
            code: 401,
            message: '入参不符'
        })
        return
    }
    let sql = `update t_sku set title=?,imgs=?,price=?,stock=?,desc_pc=?,desc_app=? where id=?;`;

    let params = [title, imgs, price, stock, detailHtml, detailMobileHtml, id];
    updataShop(sql, params).then(result => {
        res.json(result)
    }).catch(err => {
        console.log(err);
        res.json({
            code: 501,
            message: '服务端错误'
        })
    })
});
//获取品类商品
router.post('/getShop', (req, res) => {
    let {spu_id} = req.body;
    spu_id = parseInt(spu_id);
    if (!spu_id) {
        res.json({
            code: 401,
            message: "入参不符"
        })
        return
    }
    let sql = "select * from t_sku where spu_id=?";
    getShop(sql, [spu_id]).then(result => {
        res.json(result);
    }).catch(err => {
        console.log(err);
        res.json({
            code: 501,
            message: "服务端错误"
        })
    })
});

// 增加category_id字段查询数据 2020.9.27
router.post('/getSpu', (req, res) => {
    let {id, category_id, title, store_id, verifyIndex} = req.body;
    if (!id && !category_id && !title && !store_id && !verifyIndex) {
        res.json({
            code: 401,
            message: "入参不符"
        })
        return
    }
    let sql = "select * from t_spu where id=? or category_id=? or title=? or store_id=?";
    let param = [id, category_id, title, store_id];
    if (verifyIndex) {
        sql += ' or verifyIndex=?';
        param.push(verifyIndex)
    }
    console.log(sql,param)
    getSpu(sql, param).then(result => {
        res.json(result);
    }).catch(err => {
        console.log(err);
        res.json({
            code: 501,
            message: "服务端错误"
        })
    })
});

//获取商品列表
router.post('/getShopList', (req, res) => {
    let {store_id} = req.body;
    if (!store_id) {
        res.json({
            code: 401,
            message: "入参不符"
        })
        return
    }
    let sql = "select * from t_spu where store_id=?";
    getShopList(sql, [store_id]).then(result => {
        res.json(result);
    }).catch(err => {
        console.log(err);
        res.json({
            code: 501,
            message: "服务端错误"
        })
    })
});


router.post('/updataSpu', (req, res) => {
    let {id, title, img, price, special_price, is_special} = req.body;
    if (!(id && title && img && price && special_price && is_special)) {
        res.json({
            code: 401,
            message: '入参不符'
        })
        return
    }
    let sql = `update t_spu set title=?,img=?,price=?,special_price=?,is_special=? where id=?;`;

    let params = [title, img, price, special_price, is_special, id];
    updataSpu(sql, params).then(result => {
        res.json(result)
    }).catch(err => {
        console.log(err);
        res.json({
            code: 501,
            message: '服务端错误'
        })
    })
});

// 删除spu
router.post('/deleteSpu', (req, res) => {
    let {id} = req.body;
    id = parseInt(id)
    if (!id) {
        res.json({
            code: 401,
            message: '入参不符'
        })
        return
    }
    let sql = `delete from t_spu where id=?`;
    deleteSpu(sql, [id]).then(result => {
        res.json(result)
    }).catch(err => {
        console.log(err);
        res.json({
            code: 501,
            message: "服务端错误"
        })
    })
});
// 获取品类参数
router.post('/getSpecParam', (req, res) => {
    let {spg_id} = req.body
    if (!spg_id) {
        res.json({
            code: 401,
            message: '入参不符'
        })
        return
    }
    let sql = `select name from t_spec_param where spg_id=?`
    getSpecParam(sql, [spg_id]).then((data) => {
        res.json(data)
    }).catch(err => {
        res.json({
            code: 501,
            message: "服务端错误"
        })
    })
})
router.post('/search', (req, res) => {
    let {keyword} = req.body;
    if (!keyword) {
        res.json({
            code: 401,
            message: "入参不符"
        })
        return
    }
    let sql = 'select * from t_spu where title like ?'
    getSearch(sql, ["%" + keyword + '%']).then((data) => {
        res.json(data)
    }).catch(err => {
        console.log(err);
        res.json({
            code: 501,
            message: "服务端错误"
        })
    })
})
router.post('/getBrands', (req, res) => {

    let sql = 'select * from t_brand'
    getSearch(sql).then((data) => {
        res.json(data)
    }).catch(err => {
        console.log(err);
        res.json({
            code: 501,
            message: "服务端错误"
        })
    })
})
// 获取品类参数
router.post('/getSpecParam', (req, res) => {
    let {spg_id} = req.body
    if (!spg_id) {
        res.json({
            code: 401,
            message: '入参不符'
        })
        return
    }
    let sql = `select name from t_spec_param where spg_id=?`
    getSpecParam(sql, [spg_id]).then((data) => {
        res.json(data)
    }).catch(err => {
        res.json({
            code: 501,
            message: "服务端错误"
        })
    })
})

// 通过spu_id查询t_category中的name
router.post('/getCatName', (req, res) => {
    let {id} = req.body
    if (!id) {
        res.json({
            code: 401,
            message: "入参不符"
        })
        return
    }
    let sql = `select cat.* from t_spu spu join t_category cat on cat.id=spu.category_id where spu.id=?`
    getCatName(sql, [id]).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})


// 通过spu_id查询t_brand中的name
router.post('/getBrandName', (req, res) => {
    let {id} = req.body
    if (!id) {
        res.json({
            code: 401,
            message: "入参不符"
        })
        return
    }
    let sql = `select brand.name from t_spu spu join t_brand brand on brand.id=spu.brand_id where spu.id=?`
    getBrandName(sql, [id]).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

// 根据store_id 获取产品
router.post('/getRandomSpu', (req, res) => {
    let {store_id} = req.body
    if (!store_id) {
        res.json({
            code: 401,
            message: '入参不符'
        })
        return
    }
    let sql = `select * from t_spu where store_id=? order by rand() limit 16`
    getRandomSpu(sql, [store_id]).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

// 随机获取几个spu
router.post('/getRandSpu', (req, res) => {
    let {num} = req.body
    if (!num) {
        res.json({
            code: 401,
            message: "入参不符"
        })
        return
    }
    let sql = 'select * from t_spu order by rand() limit ?'
    getRandSpu(sql, [num]).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

// gk根据六大类随机获取几个spu
router.post('/getCategorySpu', (req, res) => {
    let {parent_name, num} = req.body
    if (!(parent_name && num)) {

        res.json({
            code: 401,
            message: "入参不符"
        })
        return
    }
    let sql = 'select * from t_spu where category_id in (select id from t_category where parent_name=?) order by rand() limit ?;'
    getCategorySpu(sql, [parent_name, num]).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

//gk 根据特价获取商品
router.post('/getspecialSpu', (req, res) => {
    let {num, is_special} = req.body
    if (!num) {
        res.json({
            code: 401,
            message: "入参不符"
        })
        return
    }
    let sql = 'select * from t_spu where is_special=? order by rand() limit ?'
    getspecialSpu(sql, [is_special, num]).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})
// gk 获取根据name获取六大类


module.exports = router;
