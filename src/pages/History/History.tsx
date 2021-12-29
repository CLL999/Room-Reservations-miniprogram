import Taro, { useRouter } from '@tarojs/taro'
import { useState } from 'react'
import { Image, ScrollView, Text, View } from '@tarojs/components'

import { HistoryCard } from '../../components'
import key from '../../assets/images/key.png'


export default function EditRoom() {

    const router = useRouter()
    const [firstTime, setFirstTime] = useState(true)
    const [data, setData] = useState([])
    const [page, setPage] = useState(0)
    const [idList, setIdList] = useState([])

    if (firstTime)
        {
            setFirstTime(false)
            Taro.showLoading()
            Taro.cloud.callFunction({
                name: 'getIdList',
                data: {
                    page,
                    admin: router.params.isAdmin === 'true' 
                }
            }).then((res: any) => {
                setIdList(res.result.data)
                Taro.hideLoading()
            })
            update()
        }

    function update() {
        Taro.showLoading()
        Taro.cloud.callFunction({ name: 'searchHistory' , data: { admin: router.params.isAdmin === 'true', page }})
        .then((res: any) => 
          {
              if (res.result.data.length) setData(data.concat(res.result.data.reverse()))
              else Taro.showToast({ title: '已经到底了哦', icon: 'none'})
              Taro.hideLoading()
          })
        setPage(page+1)
    }

    return (
        <View className=' w-screen min-h-screen containerBackground'>
            <Image src={key} className=' w-36 h-36 relative float-right top-2 right-3'></Image>
            { router.params.isAdmin === 'false' ?
                <View>
                    <View className='w-screen h-43'>
                        <Text className=' relative font-extrabold text-3xl left-17 top-8'>申请记录</Text> 
                    </View>
                    <ScrollView
                        scrollY
                        onScrollToLower={update}
                    >
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
                    </ScrollView>
                    <View className='w-screen h-3'></View>
                </View> :
                <View>
                    <View className='w-screen h-43'>
                        <View className=' relative font-extrabold text-3xl left-17 top-8'>审批记录</View> 
                    </View>
                    <ScrollView
                        scrollY
                        scrollTop={0}
                        onScrollToLower={update}
                        className=' h-150'
                    >
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
                    </ScrollView>
                </View>
            }
        </View>
    )
}