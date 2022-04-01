const express = require('express');
const router = express.Router();
const { msgSend } = require("../../modal/msgSend/index")
const SMSClient = require('@alicloud/sms-sdk');
//初始化sms_client
let smsClient = new SMSClient({
    accessKeyId: "LTAI4G6dLtqsiYYU18QQ23Hm",
    // secretAccessKey: "60M9cCDlfhMxu594Snrl7D5plB1DgW"
      secretAccessKey: "40M9cCDlfhMxu594Snrl7D5plB1Dgw"
})
//验证码
var codes = "";
for (let i = 0; i < 6; i++) {
    codes = codes + Math.floor(Math.random() * 10);
}
router.post('/msg_send', (req, res) => {
    let { phone } = req.body
    //发送短信
    if (phone != " ") {
        console.log(codes);
        smsClient.sendSMS({
            PhoneNumbers: phone,
            SignName: '贝思优选',
            TemplateCode: 'SMS_204105225',
            TemplateParam: `{\"code\":\"${codes}\"}`
        }).then((res) => {
            let { Code } = res
            if (Code === 'OK') {
                //处理返回参数
                console.log(res)
            }
        }).catch(err => {
            // console.log(err);
            res.json({
                code: 201,
                message: '发送失败',
            })
        })
        res.redirect("/");
    }

});
router.post('/mobile_login', (req, res) => {
    let { ver_code, tel } = req.body;
    if (!(ver_code && tel)) {
        res.json(
            {
                code: 401,
                message: '入参不符'
            }
        )
        return;
    } else if (ver_code != codes) {
        res.json(
            {
                code: 405,
                message: '验证码不正确'
            }
        )
        return
    }

    let sql = "select id,username,email,tel,create_time,last_update_time,nickname from t_customer where tel=?"
    msgSend(sql, [tel]).then(result => {
        res.json(result)
        console.log(result);
    }).catch(err => {
        console.log(err);
        res.json({
            code: 501,
            message: "服务器错误"
        })
    })

})




module.exports = router;