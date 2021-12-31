import Taro, { useRouter } from '@tarojs/taro';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Button, Checkbox, CheckboxGroup, Image, Input, Text, View } from '@tarojs/components';
import classNames from 'classnames';


export default function RoomDetailBooking() {

    const router = useRouter()

    const userInfo : any = useSelector(state => state)

    const [firstDay, setFirstDay] = useState(`${new Date().getFullYear()}年${new Date().getMonth()+1}月${new Date().getDate()}日`)
    const [secondDay, setSecondDay] = useState(`${(new Date(new Date().getTime() + 24*60*60*1000)).getFullYear()}年${(new Date(new Date().getTime() + 24*60*60*1000)).getMonth()+1}月${(new Date(new Date().getTime() + 24*60*60*1000)).getDate()}日`)
    const [thirdDay, setThirdDay] = useState(`${(new Date(new Date().getTime() + 48*60*60*1000)).getFullYear()}年${(new Date(new Date().getTime() + 48*60*60*1000)).getMonth()+1}月${(new Date(new Date().getTime() + 48*60*60*1000)).getDate()}日`)
    const [fourthDay, setFourthDay] = useState(`${(new Date(new Date().getTime() + 72*60*60*1000)).getFullYear()}年${(new Date(new Date().getTime() + 72*60*60*1000)).getMonth()+1}月${(new Date(new Date().getTime() + 72*60*60*1000)).getDate()}日`)


    const [DayOrder, setDayOrder] = useState(1)

    const [cb1, setCb1] = useState(false)
    const [cb2, setCb2] = useState(false)
    const [cb3, setCb3] = useState(false)
    const [cb4, setCb4] = useState(false)
    const [cb5, setCb5] = useState(false)
    const [cb6, setCb6] = useState(false)
    const [cb7, setCb7] = useState(false)
    const [cb8, setCb8] = useState(false)
    const [cb9, setCb9] = useState(false)

    function resetCb() {
        setCb1(false)
        setCb2(false)
        setCb3(false)
        setCb4(false)
        setCb5(false)
        setCb6(false)
        setCb7(false)
        setCb8(false)
        setCb9(false)
    }

    const [ck1, setCk1] = useState(false)
    const [ck2, setCk2] = useState(false)
    const [ck3, setCk3] = useState(false)
    const [ck4, setCk4] = useState(false)
    const [ck5, setCk5] = useState(false)
    const [ck6, setCk6] = useState(false)
    const [ck7, setCk7] = useState(false)
    const [ck8, setCk8] = useState(false)
    const [ck9, setCk9] = useState(false)

    function resetCk() {
        setCk1(false)
        setCk2(false)
        setCk3(false)
        setCk4(false)
        setCk5(false)
        setCk6(false)
        setCk7(false)
        setCk8(false)
        setCk9(false)
    }

    const [flag, setFlag] = useState(false)

    useEffect(() => {

        setFlag(!flag)

        resetCb()

        if (DayOrder === 1) setToday()

        let date = (DayOrder === 1 ? firstDay : DayOrder === 2 ? secondDay : DayOrder === 3 ? thirdDay : fourthDay)
        console.log(date)
        Taro.showLoading()
        Taro.cloud.callFunction({
            name: 'setCheckbox',
            data: { room: router.params.name, date }
        }).then((res: any) => {
            console.log(res.result.data)
            res.result.data.map(record => 
                record.time.map(item => {
                    switch (item) {
                        case '08:30-10:00': setCb1(true)
                                            break
                        case '17:50-18:50': setCb2(true) 
                                            break
                        case '10:10-12:30': setCb3(true) 
                                            break
                        case '19:00-20:20': setCb4(true) 
                                            break
                        case '12:40-14:20': setCb5(true) 
                                            break
                        case '20:30-21:50': setCb6(true) 
                                            break
                        case '14:30-16:00': setCb7(true) 
                                            break
                        case '22:00-23:00': setCb8(true) 
                                            break
                        case '16:10-17:40': setCb9(true) 
                                            break
                        default: break;
                    }
                })
            )
            Taro.hideLoading()
        })
    }, [DayOrder])

    const [time, setTime] = useState([])
    const [student, setStudent] = useState('')
    const [id, setId] = useState('')
    const [department, setDepartment] = useState('')
    const [unit, setUnit] = useState('')
    const [studentPhone, setStudentPhone] = useState('')
    const [teacher, setTeacher] = useState('')
    const [teacherPhone, setTeacherPhone] = useState('')
    const [sheet, setSheet] = useState('')

    function submit() {

        if (!sheet) 
            {
                Taro.showModal({title: '提示', content: '请上传申请表', showCancel: false}) 
                return 
            }

        if (!time.length) 
            {
                Taro.showModal({title: '提示', content: '至少选择一个时段', showCancel: false}) 
                return 
            }

        Taro.showModal({
            title: '核对信息',
            content: `活动室：${router.params.name}\n时间\n${time.join().replace(/,/g,'\r\n')}`
        }).then(res => {
            if (res.confirm) {

                let date = (DayOrder === 1 ? firstDay : DayOrder === 2 ? secondDay : DayOrder === 3 ? thirdDay : fourthDay)
                let openid = userInfo.index.openid 

                Taro.showLoading()
                Taro.cloud.uploadFile({
                    cloudPath: `sheets/${openid}${+new Date()}.xlsx`,
                    filePath: sheet
                }).then(res => {
                    Taro.cloud.callFunction({
                        name: 'submit',
                        data: {
                            date, department, id, student, studentPhone,
                            teacher, teacherPhone, time, unit,
                            room: router.params.name, sheet: res.fileID, 
                            state: 'waiting', submitDate: firstDay
                        }
                    }).then(() => {
                        Taro.hideLoading()
                        Taro.showToast({title: '上传成功', duration: 500})
                        setTimeout(() => Taro.navigateBack({ delta: 2 }), 500)
                    })   
                })  
        }})

    }

    function chooseTime(e) {
        console.log(e)
        setTime(e.detail.value)
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
            setCb1(true)
        if (nowTime > +new Date(new Date().toLocaleDateString()) + 10.16 * 60 * 60 * 1000)
            setCb3(true)
        if (nowTime > +new Date(new Date().toLocaleDateString()) + 12.66 * 60 * 60 * 1000)
            setCb5(true)
        if (nowTime > +new Date(new Date().toLocaleDateString()) + 14.5 * 60 * 60 * 1000)
            setCb7(true)
        if (nowTime > +new Date(new Date().toLocaleDateString()) + 16.16 * 60 * 60 * 1000)
            setCb9(true)
        if (nowTime > +new Date(new Date().toLocaleDateString()) + 17.83 * 60 * 60 * 1000)
            setCb2(true)
        if (nowTime > +new Date(new Date().toLocaleDateString()) + 19 * 60 * 60 * 1000)
            setCb4(true)
        if (nowTime > +new Date(new Date().toLocaleDateString()) + 20.5 * 60 * 60 * 1000)
            setCb6(true)
        if (nowTime > +new Date(new Date().toLocaleDateString()) + 22 * 60 * 60 * 1000)
            setCb8(true)
    }

    const [isLoading, setIsLoading] = useState(true)

    return (
        <View className='relative overflow-hidden'>
            <View className=' w-screen h-160'>
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
            <View className=' w-screen overflow-hidden min-h-205 relative'>
                <View className=' bg-gradient-to-b from-bottomColor to-topColor absolute timeChoose h-215 w-screen overflow-hidden'>
                    <View className='h-40 w-screen'>
                        <View className=' w-24 font-bold mx-auto relative top-2 text-black text-2xl'>时间选择</View>
                        <View className='h-28 w-screen pt-5 pb-3'>
                            <View className='min-w-screen h-12 relative'>
                                <View 
                                    className={classNames(' rounded-full h-12 bg-gray-200 absolute -left-20', {'w-60 primarybutton transition-transform duration-500': DayOrder === 1, 'w-50': DayOrder !== 1 })}
                                    onClick={() => {
                                        resetCk()
                                        setDayOrder(1)
                                    }}
                                >
                                    <View className='text-center w-30 font-semibold h-10 my-3 absolute right-5'>{firstDay.slice(5)}</View>
                                </View>
                                <View 
                                    className={classNames(' rounded-full h-12 bg-gray-200 absolute -right-20 float-right', {'w-60 primarybutton transition-transform duration-500': DayOrder === 2, 'w-50': DayOrder !==2 })}
                                    onClick={() => {
                                        resetCk()
                                        setDayOrder(2)
                                    }}
                                >
                                    <View className='text-center w-30 font-semibold h-10 my-3 absolute left-5'>{thirdDay.slice(5)}</View>
                                </View>
                            </View>
                            <View className='min-w-screen h-12 relative'>
                                <View 
                                    className={classNames(' rounded-full h-12 bg-gray-200 mt-3 absolute -left-20', {'w-60 primarybutton transition-transform duration-500': DayOrder === 3, 'w-50': DayOrder !== 3 })}
                                    onClick={() => {
                                        resetCk()
                                        setDayOrder(3)
                                    }}
                                >
                                    <View className='text-center w-30 font-semibold h-10 my-3 absolute right-5'>{secondDay.slice(5)}</View>
                                </View>
                                <View 
                                    className={classNames(' rounded-full h-12 bg-gray-200 mt-3 absolute -right-20 float-right', {'w-60 primarybutton transition-transform duration-500': DayOrder === 4, 'w-50': DayOrder !== 4 })}
                                    onClick={() => {
                                        resetCk()
                                        setDayOrder(4)
                                    }}
                                >
                                    <View className='text-center w-30 font-semibold h-10 my-3 absolute left-5'>{fourthDay.slice(5)}</View>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View className='h-65 w-screen '>
                        {   flag ?
                            <View className='h-px absolute'></View> : ''
                        }
                        <CheckboxGroup className='relative top-3' onChange={chooseTime}>
                            <View className='w-screen h-7'>
                                <View className='float-left ml-6 w-35'>
                                    <Checkbox
                                        value='08:30-10:00'
                                        disabled={cb1 ? true : false}
                                        checked={ck1 ? true : false}
                                        className=' font-semibold '
                                    >
                                        08:30-10:00
                                    </Checkbox>
                                </View>
                                <View className='float-right mr-6 w-35'>
                                    <Checkbox
                                        value='17:50-18:50'
                                        disabled={cb2 ? true : false}
                                        checked={ck2 ? true : false}
                                        className=' font-semibold float-left'
                                    >
                                        17:50-18:50
                                    </Checkbox>
                                </View>
                            </View>
                            <View className='w-screen h-7 mt-5'>
                                <View className='float-left ml-6 w-35'>
                                    <Checkbox
                                        value='10:10-12:30'
                                        disabled={cb3 ? true : false}
                                        checked={ck3 ? true : false}
                                        className=' font-semibold '
                                    >
                                        10:10-12:30
                                    </Checkbox>
                                </View>
                                <View className='float-right mr-6 w-35'>
                                    <Checkbox
                                        value='19:00-20:20'
                                        disabled={cb4 ? true : false}
                                        checked={ck4 ? true : false}
                                        className=' font-semibold float-left'
                                    >
                                        19:00-20:20
                                    </Checkbox>
                                </View>
                            </View>
                            <View className='w-screen h-7 mt-5'>
                                <View className='float-left ml-6 w-35'>
                                    <Checkbox
                                        value='12:40-14:20'
                                        disabled={cb5 ? true : false}
                                        checked={ck5 ? true : false}
                                        className=' font-semibold'
                                    >
                                        12:40-14:20
                                    </Checkbox>
                                </View>
                                <View className='float-right mr-6 w-35'>
                                    <Checkbox
                                        value='20:30-21:50'
                                        disabled={cb6 ? true : false}
                                        checked={ck6 ? true : false}
                                        className=' font-semibold float-left'
                                    >
                                        20:30-21:50
                                    </Checkbox>
                                </View>
                            </View>
                            <View className='w-screen h-7 mt-5'>
                                <View className='float-left ml-6 w-35'>
                                    <Checkbox
                                        value='14:30-16:00'
                                        disabled={cb7 ? true : false}
                                        checked={ck7 ? true: false}
                                        className=' font-semibold'
                                    >
                                        14:30-16:00
                                    </Checkbox>
                                </View>
                                <View className='float-right mr-6 w-35'>
                                    <Checkbox
                                        value='22:00-23:00'
                                        disabled={cb8 ? true : false}
                                        checked={ck8 ? true: false}
                                        className=' font-semibold float-left'
                                    >
                                        22:00-23:00
                                    </Checkbox>
                                </View>
                            </View>
                            <View className='w-screen h-7 mt-5'>
                                <Checkbox
                                    value='16:10-17:40'
                                    disabled={cb9 ? true : false}
                                    checked={ck9 ? true : false}
                                    className=' font-semibold float-left ml-6'
                                >
                                    16:10-17:40
                                </Checkbox>
                            </View>
                        </CheckboxGroup>
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