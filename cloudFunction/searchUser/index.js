// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async ( event ) => {

    let count = await db.collection('users')
                      .where({ nickName: db.RegExp({ regexp: event.key, options: 'i' })})
                      .count()
    count = count.total

    let record = []
    for (let i = 0; i < count; i+=100) {
        let list = await db.collection('users')
                         .where({ nickName: db.RegExp({ regexp: event.key, options: 'i' })})
                         .skip(i)
                         .get()
        record = record.concat(list.data)
    }

    return  { data: record }
}

