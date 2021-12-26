import Taro from '@tarojs/taro'
import { View, Text, ScrollView, Image, Button } from '@tarojs/components'
import { useEffect } from 'react'

import pot from "../../assets/images/pot.png"
import history from "../../assets/images/history.png"
import background from "../../assets/images/background.png"
import person from "../../assets/images/person.png"

export default function Index() {

    useEffect(() => {
        const WeappEnv = Taro.getEnv() === Taro.ENV_TYPE.WEAPP

        if (WeappEnv) {
            Taro.cloud.init()
        }
        
    })

    function toRoomDetail() {
        Taro.navigateTo({
            url: '../RoomDetail/RoomDetail'
        })
    }

    function toHistory() {
        console.log(1)
    }

    function toBackground() {
        console.log(1)
    }

    function toPerson() {
        console.log(1)
    }

    return (
        <View className='relative w-screen min-h-screen bg-gradient-to-b from-topColor to-bottomColor'>
            <View className='w-screen h-80'>
                <Text className='relative left-8 top-13 font-bold text-white text-xl'>注意事项</Text>
                <View 
                    className='relative rounded-full bg-white h-12 w-12 right-5 top-5 float-right'
                    onClick={toHistory}
                >
                    <Image src={history} className='w-10 h-10 m-1'></Image>
                </View>
                <View 
                    className='relative rounded-full bg-white h-12 w-12 right-10 top-5 float-right'
                    onClick={toBackground}
                >
                    <Image src={background} className='w-10 h-10 m-1'></Image>
                </View>
                <View 
                    className='relative rounded-full bg-white h-12 w-12 right-15 top-5 float-right'
                    onClick={toPerson}
                >
                    <Image src={person} className='w-10 h-10 m-1'></Image>
                </View>
                <View className='absolute top-23 w-screen'>
                    <View className='relative w-70 h-53 bg-white shadow-xl rounded-2xl mx-auto'>
                        <View className='p-3'>
                            <View className='text-lg'>1.请尽量控制会议声音，不要大声喧哗，以免影响其他同学。</View>
                            <View className='text-lg'>2.使用完请把木椅归位，保持室内卫生。</View>
                            <View className='text-lg'>3.请提前10分钟到场，超过预定时间15分钟之后将不再保留场地（场地将提供给其他同学自习）</View>
                        </View>
                    </View>
                </View>
            </View>

            <View className='w-screen h-100'>
                <Text className='relative left-8 top-3 font-bold text-white text-xl'>滑动选择活动室</Text>
                <ScrollView 
                    className='relative top-8 w-screen h-85 whitespace-nowrap' 
                    scrollX
                    scrollWithAnimation
                    scrollLeft={0}
                >

                    <View className='w-70 h-78 bg-white shadow-2xl rounded-3xl mx-12 inline-block relative'>
                        <Image src={pot} className='absolute h-52 w-52 -top-8 left-26 overflow-visible z-50'></Image>
                        <Text className=' text-4xl font-bold absolute top-24 left-5'>活动</Text>
                        <Text className=' text-4xl font-bold absolute top-34 left-5'>中心</Text>
                        <Text className=' text-7xl font-bold absolute top-43 left-9 text-black text-opacity-16'>201室</Text>
                        <Button className=' rounded-full py-0 px-4 absolute bg-green-400 bottom-2 right-3 w-28 h-12 text-center font-bold border-separate' onClick={toRoomDetail}>了解更多</Button>
                    </View>

                    <View className='w-70 h-78 bg-white shadow-2xl rounded-3xl mx-12 inline-block relative'>
                        <Image src={pot} className='absolute h-52 w-52 -top-8 left-26 overflow-visible z-50'></Image>
                        <Text className=' text-4xl font-bold absolute top-24 left-5'>活动</Text>
                        <Text className=' text-4xl font-bold absolute top-34 left-5'>中心</Text>
                        <Text className=' text-7xl font-bold absolute top-43 left-9 text-black text-opacity-16'>202室</Text>
                        <Button className=' rounded-full py-0 px-4 absolute bg-green-400 bottom-2 right-3 w-28 h-12 text-center font-bold border-separate' onClick={toRoomDetail}>了解更多</Button>
                    </View>

                    <View className='w-70 h-78 bg-white shadow-2xl rounded-3xl mx-12 inline-block relative'>
                        <Image src={pot} className='absolute h-52 w-52 -top-8 left-26 overflow-visible z-50'></Image>
                        <Text className=' text-4xl font-bold absolute top-24 left-5'>活动</Text>
                        <Text className=' text-4xl font-bold absolute top-34 left-5'>中心</Text>
                        <Text className=' text-7xl font-bold absolute top-43 left-9 text-black text-opacity-16'>203室</Text>
                        <Button className=' rounded-full py-0 px-4 absolute bg-green-400 bottom-2 right-3 w-28 h-12 text-center font-bold border-separate' onClick={toRoomDetail}>了解更多</Button>
                    </View>

                    <View className='w-70 h-78 bg-white shadow-2xl rounded-3xl mx-12 inline-block relative'>
                        <Image src={pot} className='absolute h-52 w-52 -top-8 left-26 overflow-visible z-50'></Image>
                        <Text className=' text-4xl font-bold absolute top-24 left-5'>活动</Text>
                        <Text className=' text-4xl font-bold absolute top-34 left-5'>中心</Text>
                        <Text className=' text-7xl font-bold absolute top-43 left-9 text-black text-opacity-16'>204室</Text>
                        <Button className=' rounded-full py-0 px-4 absolute bg-green-400 bottom-2 right-3 w-28 h-12 text-center font-bold border-separate' onClick={toRoomDetail}>了解更多</Button>
                    </View>

                    <View className='w-70 h-78 bg-white shadow-2xl rounded-3xl mx-12 inline-block relative'>
                        <Image src={pot} className='absolute h-52 w-52 -top-8 left-26 overflow-visible z-50'></Image>
                        <Text className=' text-4xl font-bold absolute top-24 left-5'>活动</Text>
                        <Text className=' text-4xl font-bold absolute top-34 left-5'>中心</Text>
                        <Text className=' text-7xl font-bold absolute top-43 left-9 text-black text-opacity-16'>205室</Text>
                        <Button className=' rounded-full py-0 px-4 absolute bg-green-400 bottom-2 right-3 w-28 h-12 text-center font-bold border-separate' onClick={toRoomDetail}>了解更多</Button>
                    </View>

                    <View className='w-70 h-78 bg-white shadow-2xl rounded-3xl mx-12 inline-block relative'>
                        <Image src={pot} className='absolute h-52 w-52 -top-8 left-26 overflow-visible z-50'></Image>
                        <Text className=' text-4xl font-bold absolute top-24 left-5'>活动</Text>
                        <Text className=' text-4xl font-bold absolute top-34 left-5'>中心</Text>
                        <Text className=' text-7xl font-bold absolute top-43 left-9 text-black text-opacity-16'>206室</Text>
                        <Button className=' rounded-full py-0 px-4 absolute bg-green-400 bottom-2 right-3 w-28 h-12 text-center font-bold border-separate' onClick={toRoomDetail}>了解更多</Button>
                    </View>

                    <View className='w-70 h-78 bg-white shadow-2xl rounded-3xl mx-12 inline-block relative'>
                        <Image src={pot} className='absolute h-52 w-52 -top-8 left-26 overflow-visible z-50'></Image>
                        <Text className=' text-4xl font-bold absolute top-24 left-5'>活动</Text>
                        <Text className=' text-4xl font-bold absolute top-34 left-5'>中心</Text>
                        <Text className=' text-7xl font-bold absolute top-43 left-9 text-black text-opacity-16'>207室</Text>
                        <Button className=' rounded-full py-0 px-4 absolute bg-green-400 bottom-2 right-3 w-28 h-12 text-center font-bold border-separate' onClick={toRoomDetail}>了解更多</Button>
                    </View>

                </ScrollView>

            </View>
        </View>
    )
}


