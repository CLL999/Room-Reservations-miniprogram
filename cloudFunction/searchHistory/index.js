// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async ( event ) => {

    let record = []
    let res = []
    let len = event.newData.length

    for (let i = 0; i < len ; i++) {
        let list = await db.collection('record')
                           .where({ _id: event.newData[i]._id })
                           .get()
        record.push(list)
    }

    let c = await Promise.all(record)
    c.forEach(item => res.push(...item.data))
    return res
}
