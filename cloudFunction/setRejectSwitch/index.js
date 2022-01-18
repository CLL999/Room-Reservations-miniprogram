// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async ( event ) => {
    const wxContext = cloud.getWXContext()
    return db.collection('msgPhoneToAdmin').where({ openid: wxContext.OPENID }).update({
     data: { status: event.status }})
}