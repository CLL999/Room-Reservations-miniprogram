// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async ( event ) => {
    try {
        const result = await cloud.openapi.subscribeMessage.send({
            touser: event.openid,
            page: 'pages/Background/Background',
            data: {
                thing2: {
                    value: event.room
                },
                name1: {
                    value: event.name
                },
                date3: {
                    value: event.date
                },
                phone_number4: {
                    value: event.phone
                }
            },
            templateId: 'fKmnqu6gqVAl5HDgG-aSlx4kRUFwimIbrCgv5eMEaKA'
        })
        console.log(result)
        return result
    } catch (err) {
        console.log(err)
        return err
    }
}