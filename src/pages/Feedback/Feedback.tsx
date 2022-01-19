import Taro from '@tarojs/taro'
import { useState } from 'react'
import { Image, Textarea, View } from '@tarojs/components'

import suggest from '../../assets/images/suggest.png'

export default function Suggest() {
    const [guide, setGuide] = useState('')

    function send() {
        Taro.showLoading({ title: '加载中' })
        Taro.cloud.callFunction({
            name: 'sendFeedback',
            data: { content: guide }
        }).then((res: any) => {
            console.log(res)
            setGuide('')
            Taro.hideLoading()
            Taro.showToast({
                title: '发送成功',
                duration: 800
            })
            setTimeout(() => Taro.navigateBack({ delta: 1 }), 800)
        })
    }

    return (
        <View className=' w-screen min-h-screen containerBackground relative overflow-hidden'>
            <View className='w-screen h-33'>
                <Image src={suggest} className=' w-35 h-35 relative float-right right-5 -top-2'></Image>
                <View className=' relative font-extrabold text-3xl left-17 top-2'>问题反馈</View> 
            </View>
            <View className='w-screen'>
                <View className='w-80 mx-auto h-75'>
                    <View className='mx-4 h-70 rounded-2xl bg-white'>
                        <View className='w-full h-15'></View>
                            <Textarea 
                                className='mx-6 h-45 w-50 text-xl font-semibold -top-5'
                                onInput={(e) => setGuide(e.detail.value)}
                                value={guide}
                            />
                        <View className='w-full h-10'></View>
                    </View>
                </View>
            </View>
            <View 
                className=' font-bold w-54 mx-auto text-lg relative top-17 greenbutton h-14 shadow-2xl rounded-2xl'
                onClick={send}
            >
                <View className='text-center w-24 h-8 mx-15 my-3 absolute'>发送</View>
            </View>
        </View>
    )
}