import Taro, { useRouter } from '@tarojs/taro'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Button, Image, Textarea, View } from '@tarojs/components'

import suggest from '../../assets/images/suggest.png'
import suggest2 from '../../assets/images/suggest2.png'

export default function Suggest() {

    const router: any = useRouter()

    const refreshBackground = useSelector((state: any) => state.background).refreshBackground
    
    const [data, setData] = useState(JSON.parse(router.params.data))
    const [guide, setGuide] = useState('')

    function sendGuide() {
        Taro.showLoading({title: '加载中'})

        Taro.cloud.callFunction({
            name: 'reject',
            data: { _id : data._id, guide, auditor: data.auditor }
        }).then(() => 
            {
                Taro.hideLoading()
                refreshBackground(true)
                Taro.showToast({
                    title: '发送指引成功',
                    icon: 'success',
                    duration: 1000
                })
                Taro.cloud.callFunction({
                    name: 'sendApplicant',
                    data: {
                        openid: data.applicantOpenid,
                        res: '申请失败',
                        room: data.room,
                        time: data.time[0].date,
                        tips: '请点此查看修改指引'
                    }
                })
                setTimeout(() => {
                    Taro.navigateBack({ delta: 1 })
                }, 1000)
            })
    }

    function goBack() {
        Taro.navigateBack({ delta: 1 })
        Taro.hideLoading()
    }

    return (
        <View className=' w-screen min-h-screen containerBackground relative overflow-hidden'>
            <View className='w-screen h-33'>
                <Image src={suggest} className=' w-35 h-35 relative float-right right-5 -top-2'></Image>
                <View className=' relative font-extrabold text-3xl left-17 top-2'>意见指引</View> 
            </View>
            <View className='w-screen min-h-200'>
                <View className='w-70 mx-auto guideCard min-h-180 shadow-2xl rounded-2xl'>
                    <View className='h-3'></View>
                    <View className=' w-60 min-h-60 mx-auto'>
                        <View className=' font-semibold text-4xl text-black w-full h-11'>{data.room}</View>
                        { data.time.map((item, index) => 
                            <View key={index}>
                                <View className=' font-medium text-3xl w-full h-10 text-left'>{item.date.slice(5)}</View>
                                {   item.time.map((ele, index) => 
                                    <View key={index} className=' font-semibold text-3xl text-black w-full h-11 text-center'>{ele}</View> )
                                }
                            </View>
                        )
                        }
                        <View className='w-full '>
                            <View className=' h-3'></View>
                            <View className=' font-medium text-lg h-7 w-full truncate'>{`申请人姓名：${data.student}`}</View>
                            <View className=' font-medium text-lg h-7 w-full truncate'>{`申请人学号：${data.id}`}</View>
                            <View className=' font-medium text-lg h-7 w-full truncate'>{`申请学院：${data.department}`}</View>
                            <View className=' font-medium text-lg h-7 w-full truncate'>{`申请单位名称：${data.unit}`}</View>
                            <View className=' font-medium text-lg h-7 w-full truncate'>{`联系电话： ${data.studentPhone}`}</View>
                            <View className=' font-medium text-lg h-7 w-full truncate'>{`负责老师： ${data.teacher}`}</View>
                            <View className=' font-medium text-lg h-7 w-full truncate'>{`联系电话： ${data.teacherPhone}`}</View>
                        </View>
                    </View>
                    <View className='w-full h-10'>
                        <Image
                            src={suggest2}
                            className='w-30 h-30 float-right relative -right-13 -top-6'
                        />
                    </View>
                    <View className='w-full h-75'>
                        <View className='mx-4 h-70 rounded-2xl bg-white'>
                            <View className='w-full h-15'></View>
                            {   router.params.user === 'true' ?
                                <View 
                                    className='mx-6 h-45 w-50 text-xl font-semibold -top-5'
                                >
                                    {data.guide}
                                </View> :
                                <Textarea 
                                    className='mx-6 h-45 w-50 text-xl font-semibold -top-5'
                                    onInput={(e) => setGuide(e.detail.value)}
                                    value={guide}
                                />
                            }
                            <View className='w-full h-10'></View>
                        </View>
                    </View>
                    <View className='w-full h-20 pt-5'>
                        {   router.params.user === 'true' ?
                            <Button 
                                className='mx-auto font-bold text-xl shadow-2xl confirmbutton h-10 w-35 pt-1'
                                onClick={goBack}
                            >
                            确定
                            </Button> :
                            <Button 
                                className='mx-auto font-bold text-xl shadow-2xl confirmbutton h-10 w-35 pt-1'
                                onClick={sendGuide}
                            >
                            发送
                            </Button>
                        }
                    </View>
                </View>
            </View>
            <View className=' w-screen h-13'></View>
        </View>
    )
}