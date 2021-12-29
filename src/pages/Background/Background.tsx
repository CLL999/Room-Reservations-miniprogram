import Taro from '@tarojs/taro'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Image, View } from '@tarojs/components'

import { HistoryCard } from '../../components'
import key from '../../assets/images/key.png'

import { SET_REFRESHBACKGROUND } from '../../constants'


export default function EditRoom() {

    const dispatch = useDispatch()

    const [data, setData] = useState([])
    const [firstTime, setFirstTime] = useState(true)
    const [userInfo, setUserInfo] = useState<userInfoType>({avatar: '',nickName: '', openid: ''})
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
            setUserInfo(Taro.getStorageSync('userInfo'))
            Taro.hideLoading()
        })
    }

    return (
        <View className=' w-screen min-h-screen containerBackground'>
            <Image src={key} className=' w-36 h-36 relative float-right top-2 right-3'></Image>
            <View className='w-screen h-43'>
                <View className=' relative font-extrabold text-3xl left-17 top-8'>审批申请</View> 
            </View>
            {   data.map((item: historyItemType) => 
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
                        auditor={userInfo.nickName}
                        refresh={setRefreshBackground}
                        admin
                        background
                    />
                )
            }
        </View>
    )
}