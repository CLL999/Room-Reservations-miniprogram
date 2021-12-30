// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    const _ = db.command

    let record = []

    if (event.admin) {
        let count = await db.collection('record').where({ state: _.neq('waiting') }).count()
        count = count.total
        if (!count) return { data: [] }

        for (let i = 0; i < count; i+=100) {
            let list = await db.collection('record')
                               .where({ state: _.neq('waiting') })
                               .skip(i)
                               .field({ _id: true })
                               .get()
            record.push(list)
        }
    }
    else {
        let count = await db.collection('record').where({ applicantOpenid: wxContext.OPENID }).count()
        count = count.total
        if (!count) return { data: [] }

        for (let i = 0; i < count; i+=100) {
            let list = await db.collection('record')
                               .where({ applicantOpenid: wxContext.OPENID })
                               .skip(i)
                               .field({ _id: true })
                               .get()
            record.push(list)
        }
    }
    return (await Promise.all(record)).reduce((acc, cur) => { 
        return { data: acc.data.concat(cur.data) }}) 
}