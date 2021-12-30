// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async () => {

    let count = await db.collection('record').where({ state: 'waiting' }).count()
    count = count.total

    let record = []
    for (let i = 0; i < count; i+=100) {
        let list = await db.collection('record').where({ state: 'waiting' }).skip(i).get()
        record = record.concat(list.data)
    }

    return { record }
}