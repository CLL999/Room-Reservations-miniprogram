import Taro, { useRouter } from '@tarojs/taro'
import { useState } from 'react'
import { Image, Text, View } from '@tarojs/components'

import { HistoryCard } from '../../components'
import key from '../../assets/images/key.png'


export default function EditRoom() {

    const router = useRouter()
    const [firstTime, setFirstTime] = useState(true)
    const [data, setData] = useState([])

    if (firstTime)
        {
            setFirstTime(false)
            Taro.showLoading()
            Taro.cloud.callFunction({ name: 'history' })
                      .then((res: any) => 
                        {
                            setData(res.result.data.reverse())
                            Taro.hideLoading()
                        })
        }

    return (
        <View className=' w-screen min-h-screen containerBackground'>
            <Image src={key} className=' w-36 h-36 relative float-right top-2 right-3'></Image>
            { router.params.isAdmin === 'false' ?
                <View>
                    <View className='w-screen h-43'>
                        <Text className=' relative font-extrabold text-3xl left-17 top-8'>申请记录</Text> 
                    </View>
                    {   data.map((item: historyItemType) => 
                            <HistoryCard
                                history
                                key={item._id}
                                _id={item._id}
                                auditor={item.auditor}
                                date={item.date}
                                department={item.department}
                                time={item.time}
                                room={item.room}
                                id={item.id}
                                unit={item.unit}
                                sheet={item.sheet}
                                state={item.state}
                                student={item.student}
                                studentPhone={item.studentPhone}
                                teacher={item.teacher}
                                teacherPhone={item.teacherPhone}                                
                            />
                    )}
                </View> :
                <View>
                    <View className='w-screen h-43'>
                        <View className=' relative font-extrabold text-3xl left-17 top-8'>审批记录</View> 
                    </View>
                    {   data.map((item: historyItemType) => 
                            <HistoryCard
                                admin
                                history
                                key={item._id}
                                auditor={item.auditor}
                                date={item.date}
                                department={item.department}
                                time={item.time}
                                room={item.room}
                                id={item.id}
                                unit={item.unit}
                                sheet={item.sheet}
                                state={item.state}
                                student={item.student}
                                studentPhone={item.studentPhone}
                                teacher={item.teacher}
                                teacherPhone={item.teacherPhone}
                            />
                    )}
                </View>
            }
        </View>
    )
}