// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async ( event ) => {
    const res = await db.collection('msgPhone').where({ phone: event.phone }).get()
    if (!res.data.length)
        db.collection('msgPhone').add({data: { phone: event.phone }})
}