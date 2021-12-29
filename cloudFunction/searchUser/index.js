// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async ( event ) => {

    const record = await db.collection('users')
                           .where({ 
                              nickName: db.RegExp({
                                regexp: event.key,
                                options: 'i'
                              })
                           }).get()
    return record
}