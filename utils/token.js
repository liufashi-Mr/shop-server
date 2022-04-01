const jwt=require('jsonwebtoken');
const fs=require("fs")
const path=require("path")
const privateKey=fs.readFileSync(path.resolve(__dirname,'../private.key')).toString();

const getToken=(info)=>{
    // return jwt.sign(info,privateKey,{expiresIn:10})
    return jwt.sign(info,privateKey,{expiresIn:60*60*24*3})
}
const verify=(token)=>{
    return new Promise((resolve,reject)=>{
        jwt.verify(token,privateKey,(err,info)=>{
            if(err) {
                reject(err);
                return;
            }
            resolve(info)
        })
    })
}
module.exports={getToken,verify}