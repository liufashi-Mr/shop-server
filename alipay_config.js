const fs = require('fs');
const path = require('path');

// 这里配置基本信息
const AlipayBaseConfig = {
    appId: '2021000116680575', // 应用 ID
    privateKey: fs.readFileSync(path.join(__dirname, './sandbox-pem/private_pem2048.txt'), 'ascii'), // 应用私钥
    alipayPublicKey: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAl1SmU08KxNtTG1eSqHDsExwDg+RARD896FlRHbijxwFWvrcSswkE2UjaHM1tcf4dXPPZcBs5/qMjzd9KlCG41D/IIeECN/EUHuE/xag2PzRaNsw3QbhuU6+CQyifEv2OgMOPOGxb3E6bQr2qSPVvfVpuqY1EGcugcv53HF3dwdfzzeiz1Et/EFH1kgdmg5QWUoQE0H+RBRoSI2F4TclefIBcm7zz+CWhMC7EVeMM+eokfYGUcUV+fgu3qfqwam2oP7hVTQPyIg3+XzRAQduio33ETPRCkSVyroI5l0skdpmpjbbAM96UO17cVxENwQQXZ+hhMbc68C/5/QrJTjyn4wIDAQAB',// 支付宝公钥
    gateway: 'https://openapi.alipaydev.com/gateway.do', // 支付宝的应用网关
    charset:'utf-8',
    version:'1.0',
    signType:'RSA2'
};

module.exports = {
    AlipayBaseConfig: AlipayBaseConfig,
}