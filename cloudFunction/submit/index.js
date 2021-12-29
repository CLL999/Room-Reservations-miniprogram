// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {

    const wxContext = cloud.getWXContext()

    db.collection('record').add({
        data: {
            date: event.date,
            department: event.department, 
            id: event.id, 
            student: event.student, 
            studentPhone: event.studentPhone,
            teacher: event.teacher, 
            teacherPhone: event.teacherPhone, 
            time: event.time, 
            unit: event.unit,
            room: event.room,
            sheet: event.sheet, 
            state: event.state,
            submitDate: event.submitDate,
            applicantOpenid: wxContext.OPENID
        }
    })

}