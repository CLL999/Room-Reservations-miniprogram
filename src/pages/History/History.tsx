import Taro, { useRouter } from '@tarojs/taro'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Image, ScrollView, Text, View } from '@tarojs/components'

import { HistoryCard } from '../../components'
import key from '../../assets/images/key.png'
import { SET_REFRESHHISTORY, SET_REFRESHPAGE, SET_REFRESHDATA } from '../../constants'

export default function EditRoom() {

    const dispatch = useDispatch()

    const router = useRouter()
    const [firstTime, setFirstTime] = useState(true)
    const [data, setData] = useState([])
    const [page, setPage] = useState(0)
    const [idList, setIdList] = useState([])

    const [showNoRes, setShowNoRes] = useState(false)
    const [dispatched, setDispatched] = useState(false)

    if (!dispatched)
        {
            setDispatched(true)
            dispatch({type: SET_REFRESHHISTORY, payload: { refreshHistory: setFirstTime }})
            dispatch({type: SET_REFRESHPAGE, payload: { refreshPage: setPage }})
            dispatch({type: SET_REFRESHDATA, payload: { refreshData: setData }})
        }

    if (firstTime)
        {
            setFirstTime(false)
            Taro.showLoading({ title: '加载中'})
            Taro.cloud.callFunction({
                name: 'getIdList',
                data: {
                    page,
                    admin: router.params.isAdmin === 'true' 
                }
            }).then((res: any) => {
                if (res.result.data.length) setIdList(res.result.data.reverse())
                else setShowNoRes(true)
                Taro.hideLoading()
            })
        }

    useEffect(() => {
        if (idList.length) updateData()
    }, [idList])

    function updateData() {
        let newData = idList.slice(0 + page * 20, 20 + page * 20)
        if (!newData.length) 
            {
                Taro.showToast({ title: '已经到底了哦', icon: 'none'})
                return ;
            }
        Taro.showLoading({ title: '加载中'})
        Taro.cloud.callFunction({ name: 'searchHistory' , data: { newData }})
        .then((res: any) => 
          {
              setData(data.concat(res.result))
              Taro.hideLoading()
          })
        setPage(page+1)
    }

    return (
        <View className='w-screen overflow-hidden relative'>
            <View className=' w-screen min-h-screen containerBackground relative'>
                    <View className='min-h-screen'>
                        <View className='w-screen h-43'>
                            <Image src={key} className=' w-36 h-36 relative float-right top-2 right-3'></Image>
                            <Text className=' relative font-extrabold text-3xl left-17 top-8'>{`${router.params.isAdmin === 'true' ? '审批': '申请'}记录`}</Text> 
                        </View>
                        {   showNoRes ? 
                            <View className='w-screen h-60'>
                                <View className=' relative mx-auto font-semibold text-center w-30 h-14 text-2xl top-30'>暂无记录</View> 
                            </View> :
                            <ScrollView
                                scrollY
                                scrollTop={0}
                                onScrollToLower={updateData}
                                className=' h-128 overflow-y-scroll'
                            >
                            {   data.map((item: historyItemType) => 
                                    <HistoryCard
                                        admin={router.params.isAdmin === 'true' ? true : false}
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
                                        submitDate={item.submitDate}
                                        teacherPhone={item.teacherPhone}                                
                                    />
                                )}
                            </ScrollView>
                        }
                    </View>
            </View>
        </View>
    )
}