// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async ( event ) => {

    return await db.collection('record')
                   .where({ room: event.room, date: event.date, state: 'success' })
                   .field({time: true})
                   .get()

}