// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async ( event ) => {
    const wxContext = cloud.getWXContext()
    const _ = db.command

    if (event.admin) 
        return await db.collection('record').where({ state: _.or(_.eq('success'), _.eq('fail')) }).get()
    else
        return await db.collection('record').where({ applicantOpenid: wxContext.OPENID }).get()
}