const express = require('express');
const router = express.Router();
const { sendMessage, RndNum } = require('../../utils/message.js');
const { register, login, changePassword, updateUserInfo, getUserInfo } = require('../../modal/user/user');
const { send } = require('process');
let temp
router.post('/getMessage', (req, res) => {
    const VerificationCode = RndNum(6);
    temp = VerificationCode;
    setTimeout(() => {
        temp = ''
    }, 60000);
    const { phoneNum } = req.body
    sendMessage(phoneNum, VerificationCode).then(result => {
        res.json({
            code: '200',
            data: {
                Code: result
            }
        })
        return
    })
})
// 用户注册
router.post('/register', (req, res) => {
    let { username, password, email, VerificationCode } = req.body;
    if (VerificationCode != temp) {
        res.json({
            code: 401,
            message: '验证码输入错误!'
        })
    }
    if (!(username && password && VerificationCode)) {
        res.json({
            code: 401,
            message: '入参不符'
        })
        return
    }
    let sql = `insert into t_customer (nickname,username,password,email,create_time) value (?,?,?,?,?)`;
    register(sql, [Date.now(), username, password, email, Date.now()]).then((data) => {
        res.json(data)
    }).catch((err) => {
        res.json({
            code: 501,
            message: '服务器错误',
            err
        })
    })
})

// 用户登录
router.post('/login', (req, res) => {
    let { username, password } = req.body;
    console.log(username, password, 'aaaaaaa');
    if (!(username && password)) {
        res.json({
            code: 401,
            message: '入参不符'
        })
        return
    }
    let sql = `select * from t_customer where username=? and password=?`
    login(sql, [username, password]).then((data) => {
        res.json(data)
    }).catch((err) => {
        res.json({
            code: 501,
            message: '服务器错误'
        })
    })
})

// 用户修改密码
router.post('/changePassword', (req, res) => {
    let { username, password } = req.body;
    if (!(username && password)) {
        res.json({
            code: 401,
            message: '入参不符'
        })
        return
    }
    let sql = `update t_customer set password=? where username=?`
    changePassword(sql, [password, username]).then((data) => {
        res.json(data)
    }).catch((err) => {
        console.log(err)
        res.json({
            code: 501,
            message: '服务器错误'
        })
    })
})

// 修改个人信息
router.post('/updateUserInfo', (req, res) => {
    let { id, avatar, nickname, username, email, tel } = req.body;
    if (!(id && nickname && username && email && tel)) {
        res.json({
            code: 401,
            message: '入参不符'
        })
        return
    }
    let sql = "update t_customer set avatar=?,nickname=?,create_time=?,username=?,email=?,tel=? where id=?"
    updateUserInfo(sql, [avatar, nickname, Date.now(), username, email, tel, id]).then((data) => {
        res.json(data)
    }).catch((err) => {
        console.log(err);
        res.json({
            code: 501,
            message: '服务器错误'
        })
    })
})

router.post('/getUserInfo', (req, res) => {
    let { id } = req.body;
    if (!(id)) {
        res.json({
            code: 401,
            message: '入参不符'
        })
        return
    }
    let sql = `select * from t_customer where id=?`
    getUserInfo(sql, [id]).then((data) => {
        res.json(data)
    }).catch((err) => {
        console.log(err)
        res.json({
            code: 501,
            message: '服务器错误'
        })
    })
})

module.exports = router
