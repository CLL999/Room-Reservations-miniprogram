// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event) => {
    return await db.collection('feedback').add({ data: { content: event.content, status: 'unread' }})
}