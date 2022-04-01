const express = require('express');
const { result } = require('underscore');
const router = express.Router();
const { getSwiper, playImg, getParentName, getproduct, selectProduct, priceArea, similarProduct, addParent } = require('../../modal/type/type');

// 轮播图
router.post('/getSwiper', (req, res) => {
    let sql = "SELECT * FROM t_swiper "
    getSwiper(sql).then(result => {
        res.json(result)
    }).catch(err => {
        console.log(err);
        res.json({
            code: 501,
            message: '服务端错误'
        })
    })
})
// 获取满足条件按销量排序的图片
router.post("/getImg", (req, res) => {
    // SELECT a.runoob_id, a.runoob_author, b.runoob_count FROM runoob_tbl a INNER JOIN tcount_tbl b ON a.runoob_author = b.runoob_author;
    let { parent_name, name, start=0, end ,sort_="sale"} = req.body
    let sql = 'SELECT a.img,a.sale,a.id,a.title,a.price from t_spu a join t_category b on a.category_id = b.id where b.parent_name=?';
    arr = [parent_name]
    if (name) {
        sql += 'and b.name=?'
        arr.push(name)
    }
    playImg(sql,arr).then((result) => {
        result.data=result.data.sort((a,b)=>b[sort_]-a[sort_]);
        let result_ =result.data.filter((item,index)=>index>=start-1&&index<=end-1);
        res.json(result_)
    }).catch((err) => {
        console.log(err);
        res.json({
            code: 501,
            message: '服务端错误'
        })
    })
})

// pc端 获取一级分类
router.post('/getParentName', (req, res) => {
    let sql = 'select id,parent_name,name from t_category';
    getParentName(sql).then(result => {
        let data = []
        result.res.forEach(element => {
            data.push(element.parent_name)
        });
        data = [...new Set(data)]
        res.json({
            code: 200,
            data,
            result: result.res
        })
    }).catch(err => {
        console.log(err);
        res.json({
            code: 501,
            message: '服务端错误'
        })
    })
})

// pc 根据一级分类获取产品接口
router.post('/getproduct', (req, res) => {
    let { parent_name,page } = req.body;
    let sql = "SELECT spu.* FROM t_category category JOIN t_spu spu ON spu.category_id = category.id WHERE category.parent_name = ?";
    if(parent_name=='全部'){
        sql = `select * from t_spu`
    }
    if(page) {
        sql += " limit " + (parseInt(page) - 1) * 30 + ",30"
    }
    getproduct(sql, [parent_name]).then(result => {
        res.json(result)
    }).catch(err => {
        console.log(err);
        res.json({
            code: 501,
            message: '服务端错误'
        })
    })
})


// pc 搜索产品---模糊查询
router.post('/selectProduct', (req, res) => {
    let { name } = req.body
    let sql = 'SELECT spu.* FROM t_spu spu JOIN t_category category ON category.id = spu.category_id WHERE category.`name` = ?'
    selectProduct(sql, [name]).then(result => {
        res.json(result)
    }).catch(err => {
        console.log(err);
        res.json({
            code: 501,
            message: '服务端错误'
        })
    })
})

// pc 在价格区间内查询产品
router.post('/priceArea', (req, res) => {
    let { price1, price2, name } = req.body
    let sql = 'select spu.* from t_spu spu JOIN t_category cat ON spu.category_id = cat.id where spu.price>? AND spu.price<? AND cat.name = ?'
    priceArea(sql, [price1, price2, name]).then(result => {
        res.json(result)
    }).catch(err => {
        console.log(err);
        res.json({
            code: 501,
            message: '服务端错误'
        })
    })
})

// 随机推荐商品
router.post('/similarProduct', (req, res) => {
    let sql = 'SELECT * FROM t_spu  LIMIT 16'
    similarProduct(sql).then(result => {
        res.json(result)
    }).catch(err => {
        console.log(err);
        res.json({
            code: 501,
            message: '服务端错误'
        })
    })
})

// 通过parent_name将category_id 存入
router.post('/addParent', (req, res) => {
    let { category_id, store_id } = req.body
    let sql = `insert into t_store_category (category_id,store_id) values(?,?)`
    addParent(sql, [category_id, store_id]).then(result => {
        res.json(result)
    }).catch(err => {
        console.log(err);
        res.json({
            code: 501,
            message: '服务端错误'
        })
    })
})
module.exports = router;
