// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async () => {

    await db.collection('rooms').add({
        data: {
            name: '未命名',
            content: '暂无内容，请编辑内容信息',
            photoUrl: 'cloud://cloud1-1gxif9p835c655f8.636c-cloud1-1gxif9p835c655f8-1308942285/默认背景.png'
        }
    })

}