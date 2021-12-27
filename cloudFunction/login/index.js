// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {

    const wxContext = cloud.getWXContext()

    const record = await db.collection('users')
                           .where({openid: wxContext.OPENID})
                           .get()

    if (!record.data.length) 
        await db.collection('users')
                .add({data:{ avatar: event.avatar, 
                             nickName: event.nickName, 
                             openid: wxContext.OPENID }})
    
    const admin = await db.collection('admin')
                          .where({openid: wxContext.OPENID})
                          .get()
        
    const superAdmin = await db.collection('superAdmin')
                               .where({openid: wxContext.OPENID})
                               .get()

    return {
        admin, 
        superAdmin,
        event
    }
}