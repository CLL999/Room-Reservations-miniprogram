// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async ( event ) => {

    let { id, name, content, photoUrl, tags } = event
    
    db.collection('rooms').doc(id).update({
        data: {
            name,
            content,
            photoUrl,
            tags
        }
    })
}