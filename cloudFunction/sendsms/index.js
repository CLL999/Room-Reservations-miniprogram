const cloud = require('wx-server-sdk')
const QcloudSms = require("qcloudsms_js")
const appid = 1400617486
const appkey = "244ef73f730c65911447553ca5080516"
const templateId = 1264361
const smsSign = "丽湖活动空间预约"

cloud.init()
// 云函数入口函数
exports.main = async (event, context) => new Promise((resolve, reject) => {    
    var qcloudsms = QcloudSms(appid, appkey);
    var ssender = qcloudsms.SmsSingleSender();
    var params = [event.time,event.place];
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