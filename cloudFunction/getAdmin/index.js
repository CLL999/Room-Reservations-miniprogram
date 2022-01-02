// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async () => {
    let result = []
    let list = []

    list.push(await db.collection('admin').field({ openid: true }).get())
    list.push(await db.collection('superAdmin').field({ openid : true}).get())

    let c = await Promise.all(list)
    c.forEach(item => result.push(...item.data))
    let res = []
    result.forEach(item => res.push(item.openid))
    return Array.from(new Set(res))
}