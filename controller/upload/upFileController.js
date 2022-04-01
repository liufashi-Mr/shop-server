var muilter = require('./upFile.js');
//multer有single()中的名称必须是表单上传字段的name名称。
var upload=muilter.single('file');
function dataInput(req, res) {
    upload(req, res, function (err) {
        //添加错误处理
        if (err) {
            return console.log(err);
        }
        //文件信息在req.file或者req.files中显示。
        let photoPath = req.file.path;
        photoPath = photoPath.replace(/public/,"");//将文件路径中的public\去掉，否则会和静态资源配置冲突
        //将photoPath存入数据库即可
        console.log(photoPath);
        res.json({
            code:200,
            photoPath
        })
    });
}
module.exports = {
    dataInput
};

