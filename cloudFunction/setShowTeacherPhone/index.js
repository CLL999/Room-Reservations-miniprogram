// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async ( event ) => {
    return await db.collection('showTeacherPhone').where({ _id: '5b049cc861e7f471070ddbf72276f7db' }).update({ data: { phone: event.phone }})
}