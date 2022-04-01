const express = require('express');
const { result } = require('underscore');
const router = express.Router();
const { getNameSpu,getMenu,addMenu,updataMenu, deleteMenu, deleteSubmenu, updataSubmenu, getSubmenu,getStock ,getName,getSpu,getSecond,getSecondList,selectParentNameNUll,selectParentNotNull} = require('../../modal/wares/menu')

// 获取品类
router.post('/getMenu', (req, res) => {
    let { store_id } = req.body;
    if (!store_id) {
        res.json({
            code: 401,
            message: '入参不符'
        })
        return
    }
    let sql = "select c.id,c.name from t_category c join t_store_category tc on c.id=tc.category_id where parent_name is NULL and tc.store_id=?";
    getMenu(sql,[store_id]).then(result => {
        res.json(result);
    }).catch(err => {
        console.log(err);
        res.json({
            code: 501,
            message: "服务端错误"
        })
    })
});


// /wares/getSecond    二级分类
router.post('/getSecond',(req,res)=>{
    let {parent_name} = req.body;
    let sql =parent_name? `select name from t_category where parent_name=?`:`select name from t_category`
    getSecond(sql,[parent_name]).then(result=>{
        res.json(result)
    }).catch(err=>{
        console.log(err )
    })
})


// 添加品类
router.post('/addMenu', (req, res) => {
    let { store_id, name } = req.body;
    store_id = parseInt(store_id)
    if (!(store_id && name)) {
        res.json({
            code: 401,
            message: '入参不符'
        })
        return
    }
    let sql = "insert into t_spec_group (name)values(?)"
    addMenu(sql, [name]).then(result => {
        res.json(result);
    }).catch(err => {
        console.log(err);
        res.json({
            code: 501,
            message: "服务端错误"
        })
    })
});


// 更新品类

router.post('/updataMenu', (req, res) => {
    let { id, name } = req.body;
    id = parseInt(id)
    if (!(id && name)) {
        res.json({
            code: 401,
            message: '入参不符'
        })
        return
    }
    let sql = "update t_category set parent_name=? where id=?";
    updataMenu(sql, [name,id]).then(result => {
        res.json(result);
    }).catch(err => {
        console.log(err);
        res.json({
            code: 501,
            message: "服务端错误"
        })
    })
})

// 删除品类
router.post('/deleteMenu', (req, res) => {
    let { id } = req.body;
    id = parseInt(id)
    if (!id) {
        res.json({
            code: 401,
            msg: "入参不符"
        })
        return
    }
    let sql = `delete from t_category where id=?`;
    deleteMenu(sql, [id]).then(result => {
        res.json(result)
    }).catch(err => {
        console.log(err);
        res.json({
            code: 501,
            message: "服务端错误"
        })
    })
});

//二级菜单删、改、查

router.post('/deleteSubmenu', (req, res) => {
    let { id, parent_name } = req.body;
    id = parseInt(id);
    if (!(id && parent_name)) {
        res.json({
            code: 401,
            msg: "入参不符"
        });
        return;
    }
    
    let sql = `delete  from t_category where id=?`;
    
    deleteSubmenu(sql, [id]).then(result => {
        res.json(result);
    }).catch(err => {
        console.log(err);
        res.json({
            code: 501,
            message: "服务端错误"
        })
    })
});

router.post('/updataSubmenu', (req, res) => {
    let { id, name } = req.body;
    id = parseInt(id)
    if (!(id && name)) {
        res.json({
            code: 401,
            message: '入参不符'
        })
        return
    }
    let sql = "update t_category set name=? where id=?";
    updataSubmenu(sql, [name, id]).then(result => {
        res.json(result);
    }).catch(err => {
        console.log(err);
        res.json({
            code: 501,
            message: "服务端错误"
        })
    })
})

// 尧 添加通过id 查找 name
router.post('/getSubmenu', (req, res) => {
    let { parent_name,category_id } = req.body;
    if (!parent_name&&!category_id) {
        res.json({
            code: 401,
            message: '入参不符'
        })
        return
    }
    let sql = "select id,name from t_category where parent_name=? or id=?";
    getSubmenu(sql,[parent_name,category_id]).then(result => {
        res.json(result);
    }).catch(err => {
        console.log(err);
        res.json({
            code: 501,
            message: "服务端错误"
        })
    })
});

// 获取库存
router.post('/getStock',(req,res)=>{
    let {category_id}=req.body
    if(!(category_id)){
        res.json({
            code:401,
            message:'传入参数不对'
        })
    }
    let sql='select stock from t_spu spu join t_sku sku on sku.spu_id=spu.id where spu.category_id=?'
    let param = [category_id]
    getStock(sql,param).then(result=>{
        res.json(result)
    }).catch(err=>{
        console.log(err);
        res.json({
            code:501,
            message:'服务端错误'
        })
    })
})

//gk 根据一级分类获取二级分类
router.post('/getName',(req,res)=>{
    let {parent_name}=req.body
    if(!(parent_name)){
        res.json({
            code:401,
            message:'传入参数不对'
        })
    }
    let sql='select * from t_category where parent_name=? '
    let param = [parent_name]
    getName(sql,param).then(result=>{
        res.json(result)
    }).catch(err=>{
        console.log(err);
        res.json({
            code:501,
            message:'服务端错误'
        })
    })
})
//gk 根据二级分类获取产品
router.post('/getSpu', (req, res) => {
    let { name, series ,page } = req.body
    if (!(name)) {
        res.json({
            code: 401,
            message: '传入参数不对'
        })
    }
    let sql = 'select a.* from t_spu a join t_category b on a.category_id=b.id where name=?'
    let sql2 = 'select a.* from t_spu a join t_category b on a.category_id=b.id where a.title like ?'
    let param = [name]
    if (series) {
        sql += ' and a.title like ?';
        param.push("%" + series + "%")
    }
    console.log(param);
    if(page) {
        sql += " limit " + (parseInt(page) - 1) * 30 + ",30"
    }
    getSpu(sql, param).then(result => {
        if (result.data.length == 0) {
            getSpu(sql2, ["%" + series + "%"]).then(result => {
                res.json(result)
            })
        } else {
            res.json(result)
        }
    }).catch(err => {
        console.log(err);
        res.json({
            code: 501,
            message: '服务端错误'
        })
    })
})

// wyq 根据name 获取spu中的数据
router.post('/getNameSpu',(req,res)=>{
    let {name}=req.body
    if(!(name)){
        res.json({
            code:401,
            message:'传入参数不对'
        })
    }
    let sql='select t_spu.* from t_spu join t_category on t_spu.category_id=t_category.id where name=?'
    let param = [name]
    getNameSpu(sql,param).then(result=>{
        res.json(result)
    }).catch(err=>{
        console.log(err);
        res.json({
            code:501,
            message:'服务端错误'
        })
    })
})


// 获取二级分类
router.post('/getSecondList',(req,res)=>{
    let {store_id,parent_name} = req.body
    if(!(store_id&&parent_name)){
        res.json({
            code:401,
            message:'入参不符'
        })
    }
    let sql = "SELECT cat.id,cat.`name` FROM t_category cat JOIN t_store_category store ON cat.id = store.category_id WHERE store.store_id = ? AND cat.parent_name = ?"
    getSecondList(sql,[store_id,parent_name]).then(result=>{
        res.json(result)
    }).catch(err=>{
        console.log(err)
        res.json({
            code:501,
            message:'服务端错误'
        });
    })
})

router.post('/selectParentNameNUll',(req,res)=>{
    let { parent_name } = req.body
    if(parent_name){
        res.json({
            code:401,
            message:'入参不符'
        })
    }
    let sql = "SELECT * FROM t_category WHERE parent_name is NULL"
    selectParentNameNUll(sql,[parent_name]).then(result=>{
        res.json(result)
    }).catch(err=>{
        console.log(err);
        res.json({
            code:501,
            message:'服务端错误'
        })
    })
})

router.post('/selectParentNotNull',(req,res)=>{
    let {parent_name} = req.body
    if(!parent_name){
        res.json({
            code:401,
            message:'入参不符'
        })
    }
    let sql = "SELECT * FROM t_category WHERE parent_name = ?"
    selectParentNotNull(sql,[parent_name]).then(result=>{
        res.json(result)
    }).catch(err=>{
        console.log(err);
        res.json({
            code:501,
            message:'服务端错误'
        })
    })
})


module.exports = router
