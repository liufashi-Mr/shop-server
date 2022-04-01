const express = require('express');
const Pool = require('mysql/lib/Pool');
const router = express.Router();
const {getBrands, getBrand, deleteBrand, updataBrand,getBrandId,addBrand,searchBrand,addStoreBrand,getStorBrands,addCategoryBrand } = require('../../modal/wares/brand')

// 根据指定分类获取其id （可以拿到某一分类下所有的品牌，不会有店铺的限定）
// router.post('/getBrand', (req, res) => {
//     let { store_id } = req.body;
//     if (!store_id) {
//         res.json({
//             code: 401,
//             message: '入参不符'
//         })
//         return
//     }
//     let sqlCat = `select brand_id from t_store_brand where store_id=?`
//     getBrandId(sqlCat,[category_id]).then(data=>{
//         // res.json(data)
//         console.log(data.data)
//         let idStr = '';
//         let idArr = [];
//         for(let i = 0; i < data.data.length; i++){
//             idStr += ' or id=?';
//             idArr.push(data.data[i].brand_id)
//         }
//         idStr = idStr.substring(3)
//         let sql = `select id,name,image,letter from t_brand where${idStr}`;
//         getBrand(sql,idArr).then(result => {
//             res.json(result);
//         }).catch(err => {
//             console.log(err);
//             res.json({
//                 code: 501,
//                 message: "服务端错误"
//             })
//         })
//     }).catch(err=>{
//         res.json({
//             code: 501,
//             message: "服务端错误"
//         })
//     })

// });


// 获取分类品牌 （有店铺的限定）
router.post('/getStorBrands',(req,res)=>{
    let {store_id,category_id} = req.body
    if(!store_id && !category_id){
        res.json({
            code:401,
            message:'入参不符'
        })
        return
    }
    let sql = `select * from t_brand where id in (select brand_id from t_brand_category where store_id=? and category_id=?)`
    getStorBrands(sql,[store_id,category_id]).then(data=>{
        res.json(data)
    }).catch(err=>{
        res.json({
            code:501,
            message:'服务端错误'
        })
    })
})

router.post('/getBrands', (req, res) => {
    let { store_id } = req.body;
    if (!store_id) {
        res.json({
            code: 401,
            message: '入参不符'
        })
        return
    }
    let sql = "select t_brand.* from t_store_brand join t_brand on t_brand.id=t_store_brand.brand_id where t_store_brand.store_id=?"
    getBrands(sql,[store_id]).then(result => {
        res.json(result);
    }).catch(err => {
        console.log(err);
        res.json({
            code: 501,
            message: "服务端错误"
        })
    })
});

router.post('/deleteBrand', (req, res) => {
    let { id } = req.body;
    id = parseInt(id)
    if (!id) {
        res.json({
            code: 401,
            msg: "入参不符"
        })
        return
    }
    let sql = `delete from t_brand where id=?`;
    deleteBrand(sql, [id]).then(result => {
        res.json(result)
    }).catch(err => {
        console.log(err);
        res.json({
            code: 501,
            message: "服务端错误"
        })
    })
});
router.post('/updataBrand', (req, res) => {
    let {  name, image, letter } = req.body;
    if (!( name && image && letter)) {
        res.json({
            code: 401,
            message: '入参不符'
        })
        return
    }
    let sql = "update t_brand set image=?,letter=? where name=?";
    updataBrand(sql, [ image, letter,name]).then(result => {
        res.json(result);
    }).catch(err => {
        console.log(err);
        res.json({
            code: 501,
            message: "服务端错误"
        })
    })
})
router.post('/searchBrand', (req, res) => {
    let {name} = req.body;
    if (!name) {
        res.json({
            code: 401,
            message: '入参不符'
        })
        return
    }
    let sql = "select * from t_brand where name=?";
    searchBrand(sql,[name]).then(result => {
        res.json(result);
    }).catch(err => {
        console.log(err);
        res.json({
            code: 501,
            message: "服务端错误"
        })
    })
})
router.post('/addBrand', (req, res) => {
    let {  name, image, letter } = req.body;
    if ( !(name && image && letter)) {
        res.json({
            code: 401,
            message: '入参不符'
        })
        return
    }
    let sql = "insert into t_brand (name,image,letter) values (?,?,?) ";
    let param = [name, image, letter]
    addBrand(sql,param).then(result => {
        res.json(result);
       
    }).catch(err => {
        console.log(err);
        res.json({
            code: 501,
            message: "服务端错误"
        })
    })
});

router.post('/addStoreBrand', (req, res) => {
    let { store_id,brand_id } = req.body;
    if ( !(store_id && brand_id)) {
        res.json({
            code: 401,
            message: '入参不符'
        })
        return
    }
    let sql = "insert ignore into t_store_brand (store_id ,brand_id) values (?,?)";
    let param = [store_id,brand_id]
    addStoreBrand(sql,param).then(result => {
        res.json(result);
    }).catch(err => {
        console.log(err);
        res.json({
            code: 501,
            message: "服务端错误"
        })
    })
});

router.post('/addCategoryBrand',(req,res)=>{
    let {category_id,brand_id,store_id} = req.body
    if(!(category_id&&brand_id&&store_id)){
        res.json({
            code:401,
            message:'入参不符'
        })
        return
    }
    let sql = "insert into t_brand_category (category_id,brand_id,store_id) values (?,?,?)"
    addCategoryBrand(sql,[category_id,brand_id,store_id]).then(result=>{
        res.json(result)
    }).catch(err=>{
        console.log(err)
        res.json({
            code:501,
            message:'服务器错误'
        })
    })
})

module.exports = router