import Taro from '@tarojs/taro'
import { View, Text, ScrollView, Image } from '@tarojs/components'
import { useEffect } from 'react'

import { RoomCard } from '../../components'

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

    function toHistory() {
        Taro.navigateTo({
            url: '../History/History?isAdmin=0'
        })
    }

    function toBackground() {
        console.log(1)
    }

    function toPerson() {
        Taro.navigateTo({
            url: '../EditAdmin/EditAdmin'
        })
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
                    <RoomCard name='201室' />
                    <RoomCard name='202室' />
                    <RoomCard name='203室' />
                </ScrollView>

            </View>
        </View>
    )
}


