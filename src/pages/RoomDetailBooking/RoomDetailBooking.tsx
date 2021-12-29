import Taro, { useRouter } from '@tarojs/taro';
import { Button, Checkbox, CheckboxGroup, Image, Input, Text, View } from '@tarojs/components';
import { useEffect, useState } from 'react';
import classNames from 'classnames';


export default function RoomDetailBooking() {

    const router = useRouter()

    let firstDay = `${new Date().getFullYear()}年${new Date().getMonth()+1}月${new Date().getDate()}日`
    let secondDay = `${(new Date(new Date().getTime() + 24*60*60*1000)).getFullYear()}年${(new Date(new Date().getTime() + 24*60*60*1000)).getMonth()+1}月${(new Date(new Date().getTime() + 24*60*60*1000)).getDate()}日`
    let thirdDay = `${(new Date(new Date().getTime() + 48*60*60*1000)).getFullYear()}年${(new Date(new Date().getTime() + 48*60*60*1000)).getMonth()+1}月${(new Date(new Date().getTime() + 48*60*60*1000)).getDate()}日`

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

    useEffect(() => {

        setCb1(false)
        setCb2(false)
        setCb3(false)
        setCb4(false)
        setCb5(false)
        setCb6(false)
        setCb7(false)
        setCb8(false)
        setCb9(false)


        let date = (DayOrder === 1 ? firstDay : DayOrder === 2 ? secondDay : thirdDay)
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
                        case '16:10-17:40': setCb2(true) 
                                            break
                        case '10:10-12:30': setCb3(true) 
                                            break
                        case '17:50-18:50': setCb4(true) 
                                            break
                        case '12:40-14:20': setCb5(true) 
                                            break
                        case '19:00-20:20': setCb6(true) 
                                            break
                        case '14:30-16:00': setCb7(true) 
                                            break
                        case '20:30-21:50': setCb8(true) 
                                            break
                        case '22:00-23:00': setCb9(true) 
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

        Taro.showModal({
            title: '核对信息',
            content: `活动室：${router.params.name}\n时间\n${time.join().replace(/,/g,'\r\n')}`
        }).then(res => {
            if (res.confirm) {

                let date = (DayOrder === 1 ? firstDay : DayOrder === 2 ? secondDay : thirdDay)
                let { openid } = Taro.getStorageSync('userInfo')

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
                            state: 'waiting'
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
                                        Taro.showModal({ title: '若操作不便，也可前往浏览器下载', content: '申请表文件填好后\r\n请发送给文件传输助手', showCancel: false })
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

    return (
        <View className=' h-screen overflow-hidden'>
            <Image src={router.params.photoUrl} mode='aspectFill' className='absolute right-0 top-5 w-70 h-58 shadow-2xl'></Image>
            <Text className=' text-6xl absolute right-7 top-70 font-bold'>{router.params.name}</Text>
            <View className=' text-purple-600 font-semibold text-xl relative top-93 left-9'>相关介绍：</View>
            <View className=' font-semibold text-xl relative top-98 mx-9 leading-7'>{router.params.content}</View>
            <View className=' bg-gradient-to-b from-bottomColor to-topColor absolute rounded-3xl top-160 w-screen h-200'>
                <View className='h-40 w-screen'>
                    <View className=' w-24 font-bold mx-auto relative top-2 text-black text-2xl'>时间选择</View>
                    <View className='h-30 w-screen flex'>
                        <View 
                            className={classNames('h-24 w-5 bg-gray-200 my-3 mx-5 flex-1 rounded-xl', {'primarybutton': DayOrder === 1 , ' bg-gray-300': DayOrder !== 1})} 
                            onClick={() => setDayOrder(1)}
                        >
                            <View className=' m-3 font-bold text-lg text-white'>{firstDay}</View>
                        </View>
                        <View 
                            className={classNames('h-24 w-5 bg-gray-200 my-3 mx-5 flex-1 rounded-xl', {'primarybutton': DayOrder === 2 , ' bg-gray-300': DayOrder !== 2})} 
                            onClick={() => setDayOrder(2)}
                        >
                            <View className=' m-3 font-bold text-lg text-white'>{secondDay}</View>
                        </View>
                        <View 
                            className={classNames('h-24 w-5 bg-gray-200 my-3 mx-5 flex-1 rounded-xl', {'primarybutton': DayOrder === 3 , ' bg-gray-300': DayOrder !== 3})} 
                            onClick={() => setDayOrder(3)}
                        >
                            <View className=' m-3 font-bold text-lg text-white'>{thirdDay}</View>
                        </View>
                    </View>
                </View>

                <View className='h-65 w-screen '>
                    <CheckboxGroup className='relative top-8' onChange={chooseTime}>
                        <Checkbox
                            value='08:30-10:00'
                            disabled={cb1 ? true : false}
                            className=' font-semibold float-left ml-6 '
                        >
                            08:30-10:00
                        </Checkbox>

                        <Checkbox
                            value='16:10-17:40'
                            disabled={cb2 ? true : false}
                            className=' font-semibold float-right mr-6 '
                        >
                            16:10-17:40
                        </Checkbox>

                        <Checkbox
                            value='10:10-12:30'
                            disabled={cb3 ? true : false}
                            className=' font-semibold float-left ml-6 mt-5'
                        >
                            10:10-12:30
                        </Checkbox>

                        <Checkbox
                            value='17:50-18:50'
                            disabled={cb4 ? true : false}
                            className=' font-semibold float-right mr-6 mt-5'
                        >
                            17:50-18:50
                        </Checkbox>

                        <Checkbox
                            value='12:40-14:20'
                            disabled={cb5 ? true : false}
                            className=' font-semibold float-left ml-6 mt-5'
                        >
                            12:40-14:20
                        </Checkbox>

                        <Checkbox
                            value='19:00-20:20'
                            disabled={cb6 ? true : false}
                            className=' font-semibold float-right mr-6 mt-5'
                        >
                            19:00-20:20
                        </Checkbox>

                        <Checkbox
                            value='14:30-16:00'
                            disabled={cb7 ? true : false}
                            className=' font-semibold float-left ml-6 mt-5'
                        >
                            14:30-16:00
                        </Checkbox>

                        <Checkbox
                            value='20:30-21:50'
                            disabled={cb8 ? true : false}
                            className=' font-semibold float-right mr-6 mt-5'
                        >
                            20:30-21:50
                        </Checkbox>

                        <Checkbox
                            value='22:00-23:00'
                            disabled={cb9 ? true : false}
                            className=' font-semibold float-right mr-6 mt-5'
                        >
                            22:00-23:00
                        </Checkbox>
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
                </View>
            </View>
        </View>
    )
}