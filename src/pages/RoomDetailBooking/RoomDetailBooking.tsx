import Taro, { useRouter } from '@tarojs/taro';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Button, Checkbox, CheckboxGroup, Image, Input, Picker, Text, View } from '@tarojs/components';
import classNames from 'classnames';


export default function RoomDetailBooking() {

    const router = useRouter()

    const userInfo : any = useSelector(state => state)

    const [firstDay, setFirstDay] = useState(`${new Date().getFullYear()}年${new Date().getMonth()+1}月${new Date().getDate()}日`)
    const [secondDay, setSecondDay] = useState(`${(new Date(new Date().getTime() + 24*60*60*1000)).getFullYear()}年${(new Date(new Date().getTime() + 24*60*60*1000)).getMonth()+1}月${(new Date(new Date().getTime() + 24*60*60*1000)).getDate()}日`)
    const [thirdDay, setThirdDay] = useState(`${(new Date(new Date().getTime() + 48*60*60*1000)).getFullYear()}年${(new Date(new Date().getTime() + 48*60*60*1000)).getMonth()+1}月${(new Date(new Date().getTime() + 48*60*60*1000)).getDate()}日`)
    const [fourthDay, setFourthDay] = useState(`${(new Date(new Date().getTime() + 72*60*60*1000)).getFullYear()}年${(new Date(new Date().getTime() + 72*60*60*1000)).getMonth()+1}月${(new Date(new Date().getTime() + 72*60*60*1000)).getDate()}日`)


    const [DayOrder, setDayOrder] = useState(1)
    const [timeList, setTimeList] = useState(['08:30-10:00', '10:10-12:30', '12:40-14:20', '14:30-16:00', '16:10-17:40', '17:50-18:50', '19:00-20:20', '20:30-21:50', '22:00-23:00'])

    const [firstDayTime, setFirstDayTime] = useState<Array<string>>([])
    const [secondDayTime, setSecondDayTime] = useState<Array<string>>([])
    const [thirdDayTime, setThirdDayTime] = useState<Array<string>>([])
    const [fourthDayTime, setFourthDayTime] = useState<Array<string>>([])

    const [student, setStudent] = useState('')
    const [id, setId] = useState('')
    const [department, setDepartment] = useState('')
    const [unit, setUnit] = useState('')
    const [studentPhone, setStudentPhone] = useState('')
    const [teacher, setTeacher] = useState('')
    const [teacherPhone, setTeacherPhone] = useState('')
    const [sheet, setSheet] = useState('')

    const [isToday, setIsToday] = useState(true)
    const [isLoading, setIsLoading] = useState(true)


    const [cb10, setCb10] = useState(false)
    const [cb11, setCb11] = useState(false)
    const [cb12, setCb12] = useState(false)
    const [cb13, setCb13] = useState(false)
    const [cb14, setCb14] = useState(false)
    const [cb15, setCb15] = useState(false)
    const [cb16, setCb16] = useState(false)
    const [cb17, setCb17] = useState(false)
    const [cb18, setCb18] = useState(false)

    const [cb20, setCb20] = useState(false)
    const [cb21, setCb21] = useState(false)
    const [cb22, setCb22] = useState(false)
    const [cb23, setCb23] = useState(false)
    const [cb24, setCb24] = useState(false)
    const [cb25, setCb25] = useState(false)
    const [cb26, setCb26] = useState(false)
    const [cb27, setCb27] = useState(false)
    const [cb28, setCb28] = useState(false)

    const [cb30, setCb30] = useState(false)
    const [cb31, setCb31] = useState(false)
    const [cb32, setCb32] = useState(false)
    const [cb33, setCb33] = useState(false)
    const [cb34, setCb34] = useState(false)
    const [cb35, setCb35] = useState(false)
    const [cb36, setCb36] = useState(false)
    const [cb37, setCb37] = useState(false)
    const [cb38, setCb38] = useState(false)

    const [cb40, setCb40] = useState(false)
    const [cb41, setCb41] = useState(false)
    const [cb42, setCb42] = useState(false)
    const [cb43, setCb43] = useState(false)
    const [cb44, setCb44] = useState(false)
    const [cb45, setCb45] = useState(false)
    const [cb46, setCb46] = useState(false)
    const [cb47, setCb47] = useState(false)
    const [cb48, setCb48] = useState(false)

    const [ck10, setCk10] = useState(false)
    const [ck11, setCk11] = useState(false)
    const [ck12, setCk12] = useState(false)
    const [ck13, setCk13] = useState(false)
    const [ck14, setCk14] = useState(false)
    const [ck15, setCk15] = useState(false)
    const [ck16, setCk16] = useState(false)
    const [ck17, setCk17] = useState(false)
    const [ck18, setCk18] = useState(false)

    const [ck20, setCk20] = useState(false)
    const [ck21, setCk21] = useState(false)
    const [ck22, setCk22] = useState(false)
    const [ck23, setCk23] = useState(false)
    const [ck24, setCk24] = useState(false)
    const [ck25, setCk25] = useState(false)
    const [ck26, setCk26] = useState(false)
    const [ck27, setCk27] = useState(false)
    const [ck28, setCk28] = useState(false)

    const [ck30, setCk30] = useState(false)
    const [ck31, setCk31] = useState(false)
    const [ck32, setCk32] = useState(false)
    const [ck33, setCk33] = useState(false)
    const [ck34, setCk34] = useState(false)
    const [ck35, setCk35] = useState(false)
    const [ck36, setCk36] = useState(false)
    const [ck37, setCk37] = useState(false)
    const [ck38, setCk38] = useState(false)

    const [ck40, setCk40] = useState(false)
    const [ck41, setCk41] = useState(false)
    const [ck42, setCk42] = useState(false)
    const [ck43, setCk43] = useState(false)
    const [ck44, setCk44] = useState(false)
    const [ck45, setCk45] = useState(false)
    const [ck46, setCk46] = useState(false)
    const [ck47, setCk47] = useState(false)
    const [ck48, setCk48] = useState(false)

    function resetCb() {
        setCb10(false)
        setCb11(false)
        setCb12(false)
        setCb13(false)
        setCb14(false)
        setCb15(false)
        setCb16(false)
        setCb17(false)
        setCb18(false)
        setCb20(false)
        setCb21(false)
        setCb22(false)
        setCb23(false)
        setCb24(false)
        setCb25(false)
        setCb26(false)
        setCb27(false)
        setCb28(false)
        setCb30(false)
        setCb31(false)
        setCb32(false)
        setCb33(false)
        setCb34(false)
        setCb35(false)
        setCb36(false)
        setCb37(false)
        setCb38(false)
        setCb40(false)
        setCb41(false)
        setCb42(false)
        setCb43(false)
        setCb44(false)
        setCb45(false)
        setCb46(false)
        setCb47(false)
        setCb48(false)
    }

    function resetCk() {
        setCk10(false)
        setCk11(false)
        setCk12(false)
        setCk13(false)
        setCk14(false)
        setCk15(false)
        setCk16(false)
        setCk17(false)
        setCk18(false)
        setCk20(false)
        setCk21(false)
        setCk22(false)
        setCk23(false)
        setCk24(false)
        setCk25(false)
        setCk26(false)
        setCk27(false)
        setCk28(false)
        setCk30(false)
        setCk31(false)
        setCk32(false)
        setCk33(false)
        setCk34(false)
        setCk35(false)
        setCk36(false)
        setCk37(false)
        setCk38(false)
        setCk40(false)
        setCk41(false)
        setCk42(false)
        setCk43(false)
        setCk44(false)
        setCk45(false)
        setCk46(false)
        setCk47(false)
        setCk48(false)
    }

    useEffect(() => {

        resetCb()

        if (isToday && DayOrder === 1) setToday()

        let date = (DayOrder === 1 ? firstDay : DayOrder === 2 ? secondDay : DayOrder === 3 ? thirdDay : fourthDay)
        Taro.showLoading()
        Taro.cloud.callFunction({
            name: 'setCheckbox',
            data: { room: router.params.name, date }
        }).then((res: any) => {
                console.log(res.result.data, '查询cb') 
                res.result.data.map(item => 
                    item.time.map(cur => {
                        if (cur.date === date) {
                            cur.time.map(ele => {
                                switch (DayOrder) {
                                    case 1: switch(ele) {
                                                case '08:30-10:00': setCb10(true)
                                                                    break
                                                case '10:10-12:30': setCb11(true)
                                                                    break
                                                case '12:40-14:20': setCb12(true)
                                                                    break
                                                case '14:30-16:00': setCb13(true)
                                                                    break
                                                case '16:10-17:40': setCb14(true)
                                                                    break
                                                case '17:50-18:50': setCb15(true)
                                                                    break
                                                case '19:00-20:20': setCb16(true)
                                                                    break
                                                case '20:30-21:50': setCb17(true)
                                                                    break
                                                case '22:00-23:00': setCb18(true)
                                                                    break
                                            }
                                            break
                                    case 2: switch(ele) {
                                                case '08:30-10:00': setCb20(true)
                                                                    break
                                                case '10:10-12:30': setCb21(true)
                                                                    break
                                                case '12:40-14:20': setCb22(true)
                                                                    break
                                                case '14:30-16:00': setCb23(true)
                                                                    break
                                                case '16:10-17:40': setCb24(true)
                                                                    break
                                                case '17:50-18:50': setCb25(true)
                                                                    break
                                                case '19:00-20:20': setCb26(true)
                                                                    break
                                                case '20:30-21:50': setCb27(true)
                                                                    break
                                                case '22:00-23:00': setCb28(true)
                                                                    break
                                            }
                                            break
                                    case 3: switch(ele) {
                                                case '08:30-10:00': setCb30(true)
                                                                    break
                                                case '10:10-12:30': setCb31(true)
                                                                    break
                                                case '12:40-14:20': setCb32(true)
                                                                    break
                                                case '14:30-16:00': setCb33(true)
                                                                    break
                                                case '16:10-17:40': setCb34(true)
                                                                    break
                                                case '17:50-18:50': setCb35(true)
                                                                    break
                                                case '19:00-20:20': setCb36(true)
                                                                    break
                                                case '20:30-21:50': setCb37(true)
                                                                    break
                                                case '22:00-23:00': setCb38(true)
                                                                    break
                                            }
                                            break     
                                    case 4: switch(ele) {
                                                case '08:30-10:00': setCb40(true)
                                                                    break
                                                case '10:10-12:30': setCb41(true)
                                                                    break
                                                case '12:40-14:20': setCb42(true)
                                                                    break
                                                case '14:30-16:00': setCb43(true)
                                                                    break
                                                case '16:10-17:40': setCb44(true)
                                                                    break
                                                case '17:50-18:50': setCb45(true)
                                                                    break
                                                case '19:00-20:20': setCb46(true)
                                                                    break
                                                case '20:30-21:50': setCb47(true)
                                                                    break
                                                case '22:00-23:00': setCb48(true)
                                                                    break
                                            }
                                            break                               
                                }
                            })
                        }
                    })
                )
                Taro.hideLoading()
            })
    }, [DayOrder])

    function submit() {

        if (!sheet) 
            {
                Taro.showModal({title: '提示', content: '请上传申请表', showCancel: false}) 
                return 
            }
        
        if (!(student && id && department && unit && studentPhone && teacher && teacherPhone))
            {
                Taro.showModal({title: '提示', content: '请填写完所有信息', showCancel: false}) 
                return 
            }

        let finalTime: Array<object> = []
        if (firstDayTime.length) finalTime.push({ date: firstDay, time: firstDayTime})
        if (secondDayTime.length) finalTime.push({ date: secondDay, time: secondDayTime})
        if (thirdDayTime.length) finalTime.push({ date: thirdDay, time: thirdDayTime})
        if (fourthDayTime.length) finalTime.push({ date: fourthDay, time: fourthDayTime})
        console.log(finalTime, '最终时间')

        if (!finalTime.length) 
        {
            Taro.showModal({title: '提示', content: '至少选择一个时段', showCancel: false}) 
            return 
        }

        let content = `活动室：${router.params.name}\r\n时间\r\n${finalTime.map((item: any) => 
                      `${item.date}\r\n${item.time.join().replace(/,/g,' ')}`)}`
        content = content.replace(/,/g, '\r\n')

        Taro.showModal({ title: '核对信息', content })
            .then(res => {
                if (res.confirm) {
                    let openid = userInfo.index.openid 

                    Taro.showLoading()
                    Taro.cloud.uploadFile({
                        cloudPath: `sheets/${openid}${+new Date()}.xlsx`,
                        filePath: sheet
                    }).then(res => {
                        Taro.cloud.callFunction({
                            name: 'submit',
                            data: {
                                department, id, student, studentPhone,
                                teacher, teacherPhone, time: finalTime, unit,
                                room: router.params.name, sheet: res.fileID, 
                                state: 'waiting', 
                                submitDate: `${new Date().getMonth()+1}月${new Date().getDate()}日`
                            }
                        }).then(() => {
                            Taro.hideLoading()
                            Taro.showToast({ title: '上传成功', duration: 500 })
                            setTimeout(() => Taro.navigateBack({ delta: 2 }), 500)
                        })   
                    })  
            }})

    }

    function chooseTime(e) {
        let index: Array<string> = []
        let temp = e.detail.value.sort()
        for (let i = 0; i < temp.length; i++)
            {
                let Index = parseInt(temp[i])
                index[i] = timeList[Index]
                switch (DayOrder) {
                    case 1 : switch (Index) {
                                  case 0: setCk10(true)
                                            break
                                  case 1: setCk11(true)
                                            break
                                  case 2: setCk12(true)
                                            break
                                  case 3: setCk13(true)
                                            break
                                  case 4: setCk14(true)
                                            break
                                  case 5: setCk15(true)
                                            break
                                  case 6: setCk16(true)
                                            break
                                  case 7: setCk17(true)
                                            break
                                  case 8: setCk18(true)
                                            break   
                                }
                                break
                    case 2 : switch (Index) {
                                    case 0: setCk20(true)
                                                break
                                    case 1: setCk21(true)
                                                break
                                    case 2: setCk22(true)
                                                break
                                    case 3: setCk23(true)
                                                break
                                    case 4: setCk24(true)
                                                break
                                    case 5: setCk25(true)
                                                break
                                    case 6: setCk26(true)
                                                break
                                    case 7: setCk27(true)
                                                break
                                    case 8: setCk28(true)
                                                break
                                }
                                break
                    case 3 : switch (Index) {
                                    case 0: setCk30(true)
                                                break
                                    case 1: setCk31(true)
                                                break
                                    case 2: setCk32(true)
                                                break
                                    case 3: setCk33(true)
                                                break
                                    case 4: setCk34(true)
                                                break
                                    case 5: setCk35(true)
                                                break
                                    case 6: setCk36(true)
                                                break
                                    case 7: setCk37(true)
                                                break
                                    case 8: setCk38(true)
                                                break
                                }
                                break
                    case 4 : switch (Index) {
                                    case 0: setCk40(true)
                                                break
                                    case 1: setCk41(true)
                                                break
                                    case 2: setCk42(true)
                                                break
                                    case 3: setCk43(true)
                                                break
                                    case 4: setCk44(true)
                                                break
                                    case 5: setCk45(true)
                                                break
                                    case 6: setCk46(true)
                                                break
                                    case 7: setCk47(true)
                                                break
                                    case 8: setCk48(true)
                                                break
                                }
                                break
                }
            }
        switch (DayOrder) {
            case 1 : setFirstDayTime(index) 
                     break
            case 2 : setSecondDayTime(index)
                     break
            case 3 : setThirdDayTime(index)
                     break
            case 4 : setFourthDayTime(index)
                     break
        }
    }

    function downloadSheet() {
        Taro.showLoading()

        Taro.cloud.downloadFile({ fileID: 'cloud://cloud1-1gxif9p835c655f8.636c-cloud1-1gxif9p835c655f8-1308942285/正义书院学生活动空间申请表.xlsx' })
                  .then(res => {
                      console.log(res.tempFilePath)
                      Taro.hideLoading()
                      Taro.openDocument({
                          filePath: res.tempFilePath,
                          showMenu: true
                      }).then(() => {
                            Taro.setClipboardData({ data: 'https://qianchen.ink/sourse/%E6%AD%A3%E4%B9%89%E4%B9%A6%E9%99%A2%E5%AD%A6%E7%94%9F%E6%B4%BB%E5%8A%A8%E7%A9%BA%E9%97%B4%E7%94%B3%E8%AF%B7%E8%A1%A8.xlsx'})
                                .then(() => { 
                                Taro.showToast({
                                    title: '下载链接已复制',
                                    duration: 600
                                }).then(() => 
                                    setTimeout(() => 
                                        Taro.showModal({ title: '提示', content: '若操作不便，也可前往浏览器粘贴链接下载\r\n申请表文件修改好后\r\n请发送给文件传输助手\r\n再在文件传输助手中选择申请表', showCancel: false })
                                    , 600)
                            )})
                      })
                    })
            
    }

    function uploadSheet() {
        Taro.chooseMessageFile({
            count: 1,
            type: 'file',
            extension: ['xlsx']
        }).then(res => setSheet(res.tempFiles[0].path))

    }

    function setToday() {
        let nowTime = +new Date()
        if (nowTime > +new Date(new Date().toLocaleDateString()) + 8.5 * 60 * 60 * 1000)
            setCb10(true)
        if (nowTime > +new Date(new Date().toLocaleDateString()) + 10.16 * 60 * 60 * 1000)
            setCb11(true)
        if (nowTime > +new Date(new Date().toLocaleDateString()) + 12.66 * 60 * 60 * 1000)
            setCb12(true)
        if (nowTime > +new Date(new Date().toLocaleDateString()) + 14.5 * 60 * 60 * 1000)
            setCb13(true)
        if (nowTime > +new Date(new Date().toLocaleDateString()) + 16.16 * 60 * 60 * 1000)
            setCb14(true)
        if (nowTime > +new Date(new Date().toLocaleDateString()) + 17.83 * 60 * 60 * 1000)
            setCb15(true)
        if (nowTime > +new Date(new Date().toLocaleDateString()) + 19 * 60 * 60 * 1000)
            setCb16(true)
        if (nowTime > +new Date(new Date().toLocaleDateString()) + 20.5 * 60 * 60 * 1000)
            setCb17(true)
        if (nowTime > +new Date(new Date().toLocaleDateString()) + 22 * 60 * 60 * 1000)
            setCb18(true)
    }

    function pickerChange(e) {
        resetCb()
        resetCk()

        let pickerDate = e.detail.value
        let firstDayTime = new Date(pickerDate).getTime() - 8 * 60 * 60 * 1000
        let secondDayTime = firstDayTime + 24 * 60 * 60 * 1000
        let thirdDayTime = secondDayTime + 24 * 60 * 60 * 1000
        let fourthDayTime = thirdDayTime + 24 * 60 * 60 * 1000

        if (+new Date(new Date().toLocaleDateString()) === firstDayTime) setIsToday(true)
        else setIsToday(false)
        setFirstDay(`${new Date(firstDayTime).getFullYear()}年${new Date(firstDayTime).getMonth()+1}月${new Date(firstDayTime).getDate()}日`)
        setSecondDay(`${new Date(secondDayTime).getFullYear()}年${new Date(secondDayTime).getMonth()+1}月${new Date(secondDayTime).getDate()}日`)
        setThirdDay(`${new Date(thirdDayTime).getFullYear()}年${new Date(thirdDayTime).getMonth()+1}月${new Date(thirdDayTime).getDate()}日`)
        setFourthDay(`${new Date(fourthDayTime).getFullYear()}年${new Date(fourthDayTime).getMonth()+1}月${new Date(fourthDayTime).getDate()}日`)
        setDayOrder(1)
    }

    return (
        <View className='relative overflow-hidden'>
                <View className=' w-screen min-h-160'>
                    <View className=' min-h-140'>
                        <Image 
                            src={router.params.photoUrl} 
                            mode='aspectFill' 
                            onLoad={() => setIsLoading(false)}
                            className={classNames('absolute right-0 top-5 w-70 h-58 shadow-2xl bg-blue-400 bg-opacity-50', {'animate-pulse': isLoading})}
                        />
                        <Text className=' text-6xl absolute right-7 top-70 font-bold'>{router.params.name}</Text>
                        <View className=' text-purple-600 font-semibold text-xl relative top-93 left-9'>相关介绍：</View>
                        <View className=' font-semibold text-xl relative top-98 mx-9 leading-7'>{router.params.content}</View>
                    </View>
                    <Picker
                        mode='date'
                        value='22'
                        onChange={pickerChange}
                        className=' mt-5 pb-5'
                    >
                        <View className=' font-bold w-54 mx-auto text-lg relative bottom-0 greenbutton h-14 shadow-2xl rounded-2xl'>
                            <View className='text-center w-24 h-8 mx-15 my-3 absolute'>选择日期</View>
                        </View>
                    </Picker>

                </View>
                <View className=' w-screen overflow-hidden min-h-205'>
                    <View className=' bg-gradient-to-b from-bottomColor to-topColor absolute timeChoose h-215 w-screen overflow-hidden'>
                        <View className='h-40 w-screen'>
                            <View className=' w-24 font-bold mx-auto relative top-2 text-black text-2xl'>时间选择</View>
                            <View className='h-28 w-screen pt-5 pb-3'>
                                <View className='min-w-screen h-12 relative'>
                                    <View 
                                        className={classNames(' rounded-full h-12 bg-gray-200 absolute -left-20', {'w-60 primarybutton transition-transform duration-500': DayOrder === 1, 'w-50': DayOrder !== 1 })}
                                        onClick={() => setDayOrder(1)}
                                    >
                                        <View className='text-center w-30 font-semibold h-10 my-3 absolute right-5'>{firstDay.slice(5)}</View>
                                    </View>
                                    <View 
                                        className={classNames(' rounded-full h-12 bg-gray-200 absolute -right-20 float-right', {'w-60 primarybutton transition-transform duration-500': DayOrder === 3, 'w-50': DayOrder !== 3 })}
                                        onClick={() => setDayOrder(3)}
                                    >
                                        <View className='text-center w-30 font-semibold h-10 my-3 absolute left-5'>{thirdDay.slice(5)}</View>
                                    </View>
                                </View>
                                <View className='min-w-screen h-12 relative'>
                                    <View 
                                        className={classNames(' rounded-full h-12 bg-gray-200 mt-3 absolute -left-20', {'w-60 primarybutton transition-transform duration-500': DayOrder === 2, 'w-50': DayOrder !== 2 })}
                                        onClick={() => setDayOrder(2)}
                                    >
                                        <View className='text-center w-30 font-semibold h-10 my-3 absolute right-5'>{secondDay.slice(5)}</View>
                                    </View>
                                    <View 
                                        className={classNames(' rounded-full h-12 bg-gray-200 mt-3 absolute -right-20 float-right', {'w-60 primarybutton transition-transform duration-500': DayOrder === 4, 'w-50': DayOrder !== 4 })}
                                        onClick={() => setDayOrder(4)}
                                    >
                                        <View className='text-center w-30 font-semibold h-10 my-3 absolute left-5'>{fourthDay.slice(5)}</View>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View className='h-65 w-screen '>
                            {   DayOrder === 1 ?
                                <CheckboxGroup className='relative top-3' onChange={chooseTime}>
                                    <View className='w-screen h-7'>
                                        <View className='float-left ml-6 w-35'>
                                            <Checkbox
                                                value='0'
                                                disabled={cb10 ? true : false}
                                                checked={ck10 ? true : false}
                                                className=' font-semibold '
                                            >
                                                08:30-10:00
                                            </Checkbox>
                                        </View>
                                        <View className='float-right mr-6 w-35'>
                                            <Checkbox
                                                value='5'
                                                disabled={cb15 ? true : false}
                                                checked={ck15 ? true : false}
                                                className=' font-semibold float-left'
                                            >
                                                17:50-18:50
                                            </Checkbox>
                                        </View>
                                    </View>
                                    <View className='w-screen h-7 mt-5'>
                                        <View className='float-left ml-6 w-35'>
                                            <Checkbox
                                                value='1'
                                                disabled={cb11 ? true : false}
                                                checked={ck11 ? true : false}
                                                className=' font-semibold '
                                            >
                                                10:10-12:30
                                            </Checkbox>
                                        </View>
                                        <View className='float-right mr-6 w-35'>
                                            <Checkbox
                                                value='6'
                                                disabled={cb16 ? true : false}
                                                checked={ck16 ? true : false}
                                                className=' font-semibold float-left'
                                            >
                                                19:00-20:20
                                            </Checkbox>
                                        </View>
                                    </View>
                                    <View className='w-screen h-7 mt-5'>
                                        <View className='float-left ml-6 w-35'>
                                            <Checkbox
                                                value='2'
                                                disabled={cb12 ? true : false}
                                                checked={ck12 ? true : false}
                                                className=' font-semibold'
                                            >
                                                12:40-14:20
                                            </Checkbox>
                                        </View>
                                        <View className='float-right mr-6 w-35'>
                                            <Checkbox
                                                value='7'
                                                disabled={cb17 ? true : false}
                                                checked={ck17 ? true : false}
                                                className=' font-semibold float-left'
                                            >
                                                20:30-21:50
                                            </Checkbox>
                                        </View>
                                    </View>
                                    <View className='w-screen h-7 mt-5'>
                                        <View className='float-left ml-6 w-35'>
                                            <Checkbox
                                                value='3'
                                                disabled={cb13 ? true : false}
                                                checked={ck13 ? true : false}
                                                className=' font-semibold'
                                            >
                                                14:30-16:00
                                            </Checkbox>
                                        </View>
                                        <View className='float-right mr-6 w-35'>
                                            <Checkbox
                                                value='8'
                                                disabled={cb18 ? true : false}
                                                checked={ck18 ? true : false}
                                                className=' font-semibold float-left'
                                            >
                                                22:00-23:00
                                            </Checkbox>
                                        </View>
                                    </View>
                                    <View className='w-screen h-7 mt-5'>
                                        <Checkbox
                                            value='4'
                                            disabled={cb14 ? true : false}
                                            checked={ck14 ? true : false}
                                            className=' font-semibold float-left ml-6'
                                        >
                                            16:10-17:40
                                        </Checkbox>
                                    </View>
                                </CheckboxGroup> :  DayOrder === 2 ?
                                <CheckboxGroup className='relative top-3' onChange={chooseTime}>
                                <View className='w-screen h-7'>
                                    <View className='float-left ml-6 w-35'>
                                        <Checkbox
                                            value='0'
                                            disabled={cb20 ? true : false}
                                            checked={ck20 ? true : false}
                                            className=' font-semibold '
                                        >
                                            08:30-10:00
                                        </Checkbox>
                                    </View>
                                    <View className='float-right mr-6 w-35'>
                                        <Checkbox
                                            value='5'
                                            disabled={cb25 ? true : false}
                                            checked={ck25 ? true : false}
                                            className=' font-semibold float-left'
                                        >
                                            17:50-18:50
                                        </Checkbox>
                                    </View>
                                </View>
                                <View className='w-screen h-7 mt-5'>
                                    <View className='float-left ml-6 w-35'>
                                        <Checkbox
                                            value='1'
                                            disabled={cb21 ? true : false}
                                            checked={ck21 ? true : false}
                                            className=' font-semibold '
                                        >
                                            10:10-12:30
                                        </Checkbox>
                                    </View>
                                    <View className='float-right mr-6 w-35'>
                                        <Checkbox
                                            value='6'
                                            disabled={cb26 ? true : false}
                                            checked={ck26 ? true : false}
                                            className=' font-semibold float-left'
                                        >
                                            19:00-20:20
                                        </Checkbox>
                                    </View>
                                </View>
                                <View className='w-screen h-7 mt-5'>
                                    <View className='float-left ml-6 w-35'>
                                        <Checkbox
                                            value='2'
                                            disabled={cb22 ? true : false}
                                            checked={ck22 ? true : false}
                                            className=' font-semibold'
                                        >
                                            12:40-14:20
                                        </Checkbox>
                                    </View>
                                    <View className='float-right mr-6 w-35'>
                                        <Checkbox
                                            value='7'
                                            disabled={cb27 ? true : false}
                                            checked={ck27 ? true : false}
                                            className=' font-semibold float-left'
                                        >
                                            20:30-21:50
                                        </Checkbox>
                                    </View>
                                </View>
                                <View className='w-screen h-7 mt-5'>
                                    <View className='float-left ml-6 w-35'>
                                        <Checkbox
                                            value='3'
                                            disabled={cb23 ? true : false}
                                            checked={ck23 ? true : false}
                                            className=' font-semibold'
                                        >
                                            14:30-16:00
                                        </Checkbox>
                                    </View>
                                    <View className='float-right mr-6 w-35'>
                                        <Checkbox
                                            value='8'
                                            disabled={cb28 ? true : false}
                                            checked={ck28 ? true : false}
                                            className=' font-semibold float-left'
                                        >
                                            22:00-23:00
                                        </Checkbox>
                                    </View>
                                </View>
                                <View className='w-screen h-7 mt-5'>
                                    <Checkbox
                                        value='4'
                                        disabled={cb24 ? true : false}
                                        checked={ck24 ? true : false}
                                        className=' font-semibold float-left ml-6'
                                    >
                                        16:10-17:40
                                    </Checkbox>
                                </View>
                            </CheckboxGroup> : DayOrder === 3 ?
                            <CheckboxGroup className='relative top-3' onChange={chooseTime}>
                            <View className='w-screen h-7'>
                                <View className='float-left ml-6 w-35'>
                                    <Checkbox
                                        value='0'
                                        disabled={cb30 ? true : false}
                                        checked={ck30 ? true : false}
                                        className=' font-semibold '
                                    >
                                        08:30-10:00
                                    </Checkbox>
                                </View>
                                <View className='float-right mr-6 w-35'>
                                    <Checkbox
                                        value='5'
                                        disabled={cb35 ? true : false}
                                        checked={ck35 ? true : false}
                                        className=' font-semibold float-left'
                                    >
                                        17:50-18:50
                                    </Checkbox>
                                </View>
                            </View>
                            <View className='w-screen h-7 mt-5'>
                                <View className='float-left ml-6 w-35'>
                                    <Checkbox
                                        value='1'
                                        disabled={cb31 ? true : false}
                                        checked={ck31 ? true : false}
                                        className=' font-semibold '
                                    >
                                        10:10-12:30
                                    </Checkbox>
                                </View>
                                <View className='float-right mr-6 w-35'>
                                    <Checkbox
                                        value='6'
                                        disabled={cb36 ? true : false}
                                        checked={ck36 ? true : false}
                                        className=' font-semibold float-left'
                                    >
                                        19:00-20:20
                                    </Checkbox>
                                </View>
                            </View>
                            <View className='w-screen h-7 mt-5'>
                                <View className='float-left ml-6 w-35'>
                                    <Checkbox
                                        value='2'
                                        disabled={cb32 ? true : false}
                                        checked={ck32 ? true : false}
                                        className=' font-semibold'
                                    >
                                        12:40-14:20
                                    </Checkbox>
                                </View>
                                <View className='float-right mr-6 w-35'>
                                    <Checkbox
                                        value='7'
                                        disabled={cb37 ? true : false}
                                        checked={ck37 ? true : false}
                                        className=' font-semibold float-left'
                                    >
                                        20:30-21:50
                                    </Checkbox>
                                </View>
                            </View>
                            <View className='w-screen h-7 mt-5'>
                                <View className='float-left ml-6 w-35'>
                                    <Checkbox
                                        value='3'
                                        disabled={cb33 ? true : false}
                                        checked={ck33 ? true : false}
                                        className=' font-semibold'
                                    >
                                        14:30-16:00
                                    </Checkbox>
                                </View>
                                <View className='float-right mr-6 w-35'>
                                    <Checkbox
                                        value='8'
                                        disabled={cb38 ? true : false}
                                        checked={ck38 ? true : false}
                                        className=' font-semibold float-left'
                                    >
                                        22:00-23:00
                                    </Checkbox>
                                </View>
                            </View>
                            <View className='w-screen h-7 mt-5'>
                                <Checkbox
                                    value='4'
                                    disabled={cb34 ? true : false}
                                    checked={ck34 ? true : false}
                                    className=' font-semibold float-left ml-6'
                                >
                                    16:10-17:40
                                </Checkbox>
                            </View>
                            </CheckboxGroup> :
                            <CheckboxGroup className='relative top-3' onChange={chooseTime}>
                            <View className='w-screen h-7'>
                                <View className='float-left ml-6 w-35'>
                                    <Checkbox
                                        value='0'
                                        disabled={cb40 ? true : false}
                                        checked={ck40 ? true : false}
                                        className=' font-semibold '
                                    >
                                        08:30-10:00
                                    </Checkbox>
                                </View>
                                <View className='float-right mr-6 w-35'>
                                    <Checkbox
                                        value='5'
                                        disabled={cb45 ? true : false}
                                        checked={ck45 ? true : false}
                                        className=' font-semibold float-left'
                                    >
                                        17:50-18:50
                                    </Checkbox>
                                </View>
                            </View>
                            <View className='w-screen h-7 mt-5'>
                                <View className='float-left ml-6 w-35'>
                                    <Checkbox
                                        value='1'
                                        disabled={cb41 ? true : false}
                                        checked={ck41 ? true : false}
                                        className=' font-semibold '
                                    >
                                        10:10-12:30
                                    </Checkbox>
                                </View>
                                <View className='float-right mr-6 w-35'>
                                    <Checkbox
                                        value='6'
                                        disabled={cb46 ? true : false}
                                        checked={ck46 ? true : false}
                                        className=' font-semibold float-left'
                                    >
                                        19:00-20:20
                                    </Checkbox>
                                </View>
                            </View>
                            <View className='w-screen h-7 mt-5'>
                                <View className='float-left ml-6 w-35'>
                                    <Checkbox
                                        value='2'
                                        disabled={cb42 ? true : false}
                                        checked={ck42 ? true : false}
                                        className=' font-semibold'
                                    >
                                        12:40-14:20
                                    </Checkbox>
                                </View>
                                <View className='float-right mr-6 w-35'>
                                    <Checkbox
                                        value='7'
                                        disabled={cb47 ? true : false}
                                        checked={ck47 ? true : false}
                                        className=' font-semibold float-left'
                                    >
                                        20:30-21:50
                                    </Checkbox>
                                </View>
                            </View>
                            <View className='w-screen h-7 mt-5'>
                                <View className='float-left ml-6 w-35'>
                                    <Checkbox
                                        value='3'
                                        disabled={cb43 ? true : false}
                                        checked={ck43 ? true : false}
                                        className=' font-semibold'
                                    >
                                        14:30-16:00
                                    </Checkbox>
                                </View>
                                <View className='float-right mr-6 w-35'>
                                    <Checkbox
                                        value='8'
                                        disabled={cb48 ? true : false}
                                        checked={ck48 ? true : false}
                                        className=' font-semibold float-left'
                                    >
                                        22:00-23:00
                                    </Checkbox>
                                </View>
                            </View>
                            <View className='w-screen h-7 mt-5'>
                                <Checkbox
                                    value='4'
                                    disabled={cb44 ? true : false}
                                    checked={ck44 ? true : false}
                                    className=' font-semibold float-left ml-6'
                                >
                                    16:10-17:40
                                </Checkbox>
                            </View>
                            </CheckboxGroup>
                        }
                        </View>

                        <View className=' w-screen h-80 '>
                            <View className='w-screen h-16 '>
                                <View className=' w-24 font-bold mx-auto relative top-3 text-black text-2xl'>填写信息</View>
                                <Text 
                                    className=' text-blue-800 font-bold text-lg underline relative float-right right-9'
                                    onClick={downloadSheet}
                                >
                                    下载申请表
                                </Text>
                            </View>

                            <View className='w-screen h-12 '>
                                <Input
                                    placeholder='申请人姓名'
                                    value={student}
                                    onInput={e => setStudent(e.detail.value)}
                                    className='w-35 h-8 pl-3 bg-white relative left-6 rounded-lg float-left'
                                />
                                <Input
                                    placeholder='申请人学号'
                                    value={id}
                                    type='digit'
                                    onInput={e => setId(e.detail.value)}
                                    className='w-35 h-8 pl-3 bg-white relative right-6 rounded-lg float-right'
                                />
                            </View>

                            <View className='w-screen h-12 '>
                                <Input
                                    placeholder='申请学院'
                                    value={department}
                                    onInput={e => setDepartment(e.detail.value)}
                                    className='w-35 h-8 pl-3 bg-white relative left-6 rounded-lg float-left'
                                />
                                <Input
                                    placeholder='申请单位名称'
                                    value={unit}
                                    onInput={e => setUnit(e.detail.value)}
                                    className='w-35 h-8 pl-3 bg-white relative right-6 rounded-lg float-right'
                                />
                            </View>

                            <View className='w-screen h-12 '>
                                <Input
                                    placeholder='联系电话'
                                    value={studentPhone}
                                    type='digit'
                                    onInput={e => setStudentPhone(e.detail.value)}
                                    className='w-35 h-8 pl-3 bg-white relative left-6 rounded-lg float-left'
                                />
                                <Input
                                    placeholder='负责老师姓名'
                                    value={teacher}
                                    onInput={e => setTeacher(e.detail.value)}
                                    className='w-35 h-8 pl-3 bg-white relative right-6 rounded-lg float-right'
                                />
                            </View>

                            <View className='w-screen h-12 '>
                                <Input
                                    placeholder='负责老师电话'
                                    value={teacherPhone}
                                    type='digit'
                                    onInput={e => setTeacherPhone(e.detail.value)}
                                    className='w-35 h-8 pl-3 bg-white relative left-6 rounded-lg float-left'
                                />
                                { !sheet ?
                                    <Button
                                        className='w-38 h-8 bg-yellow-200 relative right-6 rounded-lg font-bold text-lg float-right'
                                        onClick={uploadSheet}
                                    >
                                        上传申请表
                                    </Button> :
                                    <Button
                                        className='w-38 h-8 bg-green-300 relative right-6 rounded-lg font-medium text-lg float-right'
                                    >
                                        已选择申请表
                                    </Button>
                                }
                            </View>

                            <View className='w-screen h-30'>
                                <Button
                                    className='mx-auto w-48 h-12 py-2 purplebutton relative top-3 rounded-xl font-bold text-black text-xl shadow-2xl items-center justify-center'
                                    onClick={submit}
                                >
                                    提交
                                </Button>
                            </View>

                            <View className='w-screen h-15'></View>
                        </View>
                    </View>
                </View>
        </View>
    )
}