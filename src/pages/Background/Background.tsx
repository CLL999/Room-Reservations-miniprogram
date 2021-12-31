import Taro from '@tarojs/taro'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Image, View } from '@tarojs/components'

import { SET_REFRESHBACKGROUND } from '../../constants'
import { HistoryCard } from '../../components'


import key from '../../assets/images/key.png'
import replace from '../../assets/images/replace.png'



export default function EditRoom() {

    const dispatch = useDispatch()

    const userInfo: any = useSelector(state => state)

    const [data, setData] = useState([])
    const [firstTime, setFirstTime] = useState(true)
    const [refreshBackground, setRefreshBackground] = useState(true)

    if (firstTime) {
        setFirstTime(false)
        dispatch({ type: SET_REFRESHBACKGROUND, payload: { refreshBackground: setRefreshBackground}})
    }

    if (refreshBackground) {
        Taro.showLoading()
        setRefreshBackground(false)
        Taro.cloud.callFunction({
            name: 'feedRecord'
        }).then((res: any) => {
            setData(res.result.record)
            Taro.hideLoading()
        })
    }

    function replaceSheet() {
        Taro.showModal({
            title: '注意',
            content: '确定要更换申请表吗？'
        }).then(() => {
            Taro.showToast({ title: '请在会话中选择文件' , icon: 'none', duration: 1000})
            setTimeout(() => {
                Taro.chooseMessageFile({
                    count: 1,
                    type: 'file'
                }).then(res => {
                    Taro.showLoading()
                    Taro.cloud.uploadFile({
                        cloudPath: '正义书院学生活动空间申请表.xlsx',
                        filePath: res.tempFiles[0].path
                    }).then(() => {
                        Taro.hideLoading()
                        setTimeout(() => Taro.showToast({ title: '更换成功', duration: 800 }), 100);
                    })
                })
            }, 1000)
        })
    }

    return (
        <View className=' w-screen min-h-screen containerBackground relative overflow-hidden'>
            <Image src={key} className=' w-36 h-36 relative float-right top-2 right-3'></Image>
            <View className='w-screen h-43'>
                <View className=' relative font-extrabold text-3xl left-17 top-8'>审批申请</View> 
                <View 
                    className=' w-10 h-10 bg-orange-600 rounded-full -bottom-2 mt-14 ml-9 z-10 relative shadow-lg'
                    onClick={replaceSheet}
                >
                    <Image
                        src={replace}
                        className=' w-6 h-6 m-2 z-10'
                />
                </View>
            </View>
            {   data.length ?
                data.map((item: historyItemType) => 
                    <HistoryCard
                        key={item._id}
                        _id={item._id}
                        room={item.room}
                        time={item.time}
                        student={item.student}
                        id={item.id}
                        department={item.department}
                        studentPhone={item.studentPhone}
                        teacher={item.teacher}
                        teacherPhone={item.teacherPhone}
                        unit={item.unit}
                        date={item.date}
                        sheet={item.sheet}
                        submitDate={item.submitDate}
                        auditor={userInfo.index.nickName}
                        refresh={setRefreshBackground}
                        admin
                        background
                    />
                ) :
                <View className='w-screen'>
                    <View className='h-14 w-60 mx-auto font-bold text-2xl text-center mt-45'>所有申请已批阅√</View>
                </View>
            }
        </View>
    )
}