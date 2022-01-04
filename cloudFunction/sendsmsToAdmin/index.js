const cloud = require('wx-server-sdk')
const QcloudSms = require("qcloudsms_js")
const appid = 
const appkey = 
const templateId =
const smsSign =

cloud.init()
// 云函数入口函数
exports.main = async (event, context) => new Promise((resolve, reject) => {    
    var qcloudsms = QcloudSms(appid, appkey);
    var ssender = qcloudsms.SmsSingleSender();
    var params = [];
    var mobile = event.mobile
    var nationcode = event.nationcode
    ssender.sendWithParam(nationcode, mobile, templateId, params, smsSign, "", "", (err, res, resData) => {
        if (err) {
          console.log("err: ", err);
          reject({ err })
        } else {
          resolve({ res: res.req, resData })
        }
      }
    );

})
