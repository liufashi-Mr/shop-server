const _=require('underscore')
const moment=require('moment')
const users={};

module.exports=server=>{
    const io=require('socket.io')(server);
    io.on("connection",socket=>{
        socket.on('online',username=>{
            console.log(username)
        })
        socket.on('private_chat',(param)=>{
            console.log(param),
            socket.emit('back',"zhou")
        })
    })
}
// Depends on tencentcloud-sdk-nodejs version 4.0.3 or higher
const tencentcloud = require("tencentcloud-sdk-nodejs");

const SmsClient = tencentcloud.sms.v20190711.Client;

const clientConfig = {
    credential: {
        secretId: "AKID0nMlurg0VypQkqI83qQkwvo11mOnurVd",
        secretKey: "MXXP1V5R2Z6OdcIMD2K0ToKICqPukLr7",
    },
    region: "",
    profile: {
        httpProfile: {
            endpoint: "sms.tencentcloudapi.com",
        },
    },
};
