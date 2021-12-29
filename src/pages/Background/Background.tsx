import Taro from '@tarojs/taro'
import { useState } from 'react'
import { Image, View } from '@tarojs/components'

import { HistoryCard } from '../../components'
import key from '../../assets/images/key.png'

export default function EditRoom() {

    const [data, setData] = useState([])
    const [userInfo, setUserInfo] = useState<userInfoType>({avatar: '',nickName: '', openid: ''})
    const [fristTime, setFirstTime] = useState(true)

    if (fristTime)
        {
            Taro.showLoading()
            setFirstTime(false)
            Taro.cloud.callFunction({
                name: 'feedRecord'
            }).then((res: any) => {
                setData(res.result.data)
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
                        title={item.room}
                        time={item.time}
                        name={item.student}
                        studentId={item.id}
                        department={item.department}
                        studentPhone={item.studentPhone}
                        teacherName={item.teacher}
                        teacherPhone={item.teacherPhone}
                        unit={item.unit}
                        date={item.date}
                        auditor={userInfo.nickName}
                        refresh={setFirstTime}
                        admin
                        background
                    />
                )
            }
        </View>
    )
}