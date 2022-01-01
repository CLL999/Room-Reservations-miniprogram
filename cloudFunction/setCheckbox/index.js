// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async ( event ) => {

    const _ = db.command

    return await db.collection('record')
                   .where({ room: event.room, state: _.neq('fail'), time: _.elemMatch({ date: event.date }) })
                   .field({time: true})
                   .get()

}