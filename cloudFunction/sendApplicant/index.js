// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async ( event ) => {
    try {
        const result = await cloud.openapi.subscribeMessage.send({
            touser: event.openid,
            page: 'pages/index/index',
            data: {
                phrase8: {
                    value: event.res
                },
                thing2: {
                    value: event.room
                },
                time10: {
                    value: event.time
                },
                thing19: {
                    value: event.tips
                },
                phone_number18: {
                    value: event.phone
                }
            },
            templateId: 'Q2z7sXK-myCrrPjtlKSlown5u4jcppRCzvu5hvPNCeo'
        })
        console.log(result)
        return result
    } catch (err) {
        console.log(err)
        return err
    }
}