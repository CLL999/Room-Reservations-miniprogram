// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async ( event ) => {

    const _ = db.command

    return await db.collection('record')
                   .where({ room: event.room, date: event.date, state: _.neq('fail') })
                   .field({time: true})
                   .get()

}