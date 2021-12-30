// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async () => {

    const wxContext = cloud.getWXContext()

    const adminResult = await db.collection('admin').where({ openid: wxContext.OPENID }).get()
    const superAdminResult = await db.collection('superAdmin').where({ openid: wxContext.OPENID }).get()

    return { 
        openid: wxContext.OPENID,
        admin: adminResult.data.length ? true : false,
        superAdmin: superAdminResult.data.length ? true : false
    }
}