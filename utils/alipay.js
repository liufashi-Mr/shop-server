const AlipaySdk = require('alipay-sdk').default; // 引入 SDK
const AlipayFormData = require("alipay-sdk/lib/form").default
const formData = new AlipayFormData();
formData.addField('notifyUrl', 'http://localhost:8080/paySuccess')
formData.setMethod('get');
const payOrder =async function ({outTradeNo,totalAmount,subject,body}) {
    formData.addField('bizContent', {
        outTradeNo, // 商户订单号,64个字符以内、可包含字母、数字、下划线,且不能重复
        productCode: 'FAST_INSTANT_TRADE_PAY', // 销售产品码，与支付宝签约的产品码名称,仅支持FAST_INSTANT_TRADE_PAY
        totalAmount, // 订单总金额，单位为元，精确到小数点后两位
        subject, // 订单标题
        body, // 订单描述

    });
    formData.addField('returnUrl', 'http:///localhost:8080/paySuccess');//加在这里才有效果,不是加在
    const alipaySdk = new AlipaySdk({
        appId: '2021000117640960', // 开放平台上创建应用时生成的 appId
        signType: 'RSA2', // 签名算法,默认 RSA2
        charset: "utf-8",
        gateway: 'https://openapi.alipaydev.com/gateway.do', // 支付宝网关地址 ，沙箱环境下使用时需要修改
        alipayPublicKey: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAx5btvsyKjS3Qv3vnwmprpe+Ly59aZyV558oaK26a3gAuWR1F1je/N+kn6VOg2WFIL3OZUVy1jA5BRzgDeqswRpRjlFyiE06/MYaQbWq2ej3MLLm7JfVfyukIcD7cHY8ztyIzn7rqC0QkbAyucVUXsMQuQOFuB25S/YgIs7x7z3wtwRua8xpt1TP5wN1bUulZqKkccJYGKVONkrtZCbQCYaigCki3cuVSmQMaTcD8ZmSevzE9rkhEqW5bju/YV7LMBRAci1vxBi2AtLzf6m0ZCO2pYkD2vlp633TtFqgMivCl5nhvULex4zuGg9gsx8MkwNmzKRohHbMtuCAa3yuElwIDAQAB', // 支付宝公钥，需要对结果验签时候必填
        privateKey: 'MIIEogIBAAKCAQEAlLI1rWvyWG1rSpRqC8qndNfSOsX7MTfgb2fB5tKySFvfyjnNh0IWhahdgs6gcsWnz5BPUwYjapMqHLI4bZwqExwa9BS7UqCsWSDdyhukrKJhx2svL3tB9rFjaVi6qgzTbfjOXMpw3fGXpsTYH+tdTwbS2sGDR4fY1IEPDnrtsjq43ph1+M4Tx4sFvNRZFkr373qg/ceflmgWND+uYC4L0F6NxXUA0QbN9YSmq+Z3nWVBk3ytC8nt/kH21AkNT9ytDuwLIH6CiyXyUiNeQFgrJQtBptZWH1TDTANGLXNAxq35a4rWpFj3/d+aL5dSyJLzcspIpVtQz9FGj5PmUYl2TwIDAQABAoIBAFguKvjySCC6muL6irz9bDs1df3WxPVWLqnCfVH2ZzXUDi3uA32P6q1OwE2/XZVStAa6jOAuhrhAF7w20JHoB2eXxkAzPzdsA2lDvWOK6yhZj+TkInJlBSRX5B1oOiJ4QrY306FhiHeGOynyGD0tpgMkh8yk78ZuwF6dPqGWsvl7Q/djDgVkQkeYP5kan9lAu4WWUaAPmilBeldPBi/lfNu4UY6pegpwAF3r6SHmkIsDN73qq3Nc82Qv6PsQXyDlAF6NCf6vNsGw1ypfJW7kVej34VODegJJ1MQJnIEoHh+Ysqosprn3e4kVSr87cKmXdDQzJFrJGCndEpr9sBP9nTECgYEAybzVoiuCRwSP4JMDHX+hOWdVugHKJgClwLk388RxMmi3vRM9AFsL8w1wcXaGku451k3+UJOqgVhi8Aq6hSVZtX/Ou+lTYqecX++nlfl87QFlkIcK3LRC8u+z+JgHVJYKqTaxa9hg997bWwWirkB76NNhru/su0VrqY1CYqmNT0kCgYEAvLEQyYlevvaKMsGjK73CU/yOOAifUE5JeTWYYXLUHaTSsgIGhC+yho4gWN8JEzJ5ebc1CjtFMgD6sL3nCzXzwmmKRDKLBufDIr3rvcArP6HpuDB5YoYSAttNg7JVf7tfWsC/FwibPYpRgXHHKtutUrLo/sq0Z9j4dWotxEac4NcCgYAgO2qKsZbsD9+JCxQZV3YD/O2mfXi1366b/zvgV8eaPT72F6fMcb+UAtavWjegLC3TfryeVSmN5vhPz/cDJPeTVytJvLrU7WC/t0O4Y5dBKtL2Z40lvCtiM0g29Nte+WYUqSdpyrWbhODZRyo52xWxGmzmDXFubmYIPgiYSOzJ+QKBgAkEfUTkZ77AkYIzdtTUUMEqxLEw2ExCMYi1Yv7lOfXgtqEDL8SJcwKzMCCPKCPeuadzdflzM69cFJ71tGD4xxl3acAwmixOTykN4oJC+M4lssG2r1ZiCeJRELdGgoeEMN5pb7huFN0wCw0gnuARd4sIOdJTZaPA3r7dwCotJbopAoGAaeqVqAlmbvu2ogPgQo3chqfIEp7H5RbRczfbcE5NDJRES1MfPxO1+J3I0x6EbpPxV/jAFxenFU569S279jTmmbVdcltSYK0KopASoFr2JCWPa7DfTEQQbwlBILDdsM4FMXqOUMtnd0SsRpQ94LDFTqkx64QRdvp8zHNd+vr9qdI=', // 应用私钥字符串
    });
    const result = alipaySdk.exec(  // result 为可以跳转到支付链接的 url
        'alipay.trade.page.pay', // 统一收单下单并支付页面接口
        {}, // api 请求的参数（包含“公共请求参数”和“业务参数”）
        { formData: formData },
    );
    return result
}
module.exports={
    payOrder
}
//正式环境只要把上述换成正式的就可以了