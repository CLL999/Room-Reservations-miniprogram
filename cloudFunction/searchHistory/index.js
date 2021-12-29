// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    const _ = db.command

    const record = event.admin ? 
                   await db.collection('record')
                           .where({ state: _.neq('waiting') })
                           .skip(event.page*20)
                           .limit(20)
                           .get() : 
                   await db.collection('record')
                           .where({ applicantOpenid: wxContext.OPENID })
                           .skip(event.page*20)
                           .limit(20)
                           .get()

    return record
}