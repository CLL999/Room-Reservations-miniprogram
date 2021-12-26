import { Button, Image, Text, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useState } from 'react';

import photo from '../../assets/images/204.png'

export default function RoomDetail() {

    const [isAdmin, setisAdmin] = useState(true)

    function toBook() {
        Taro.navigateTo({
            url:'../RoomDetailBooking/RoomDetailBooking'
        })
    }

    function toEdit() {
        Taro.navigateTo({
            url:'../EditRoom/EditRoom'
        })
    }

    return (
        <View className=' h-screen overflow-hidden'>
            <Image src={photo} mode='aspectFill' className='absolute right-0 top-5 w-70 h-58 shadow-2xl'></Image>
            <Text className=' text-6xl absolute right-7 top-70 font-bold'>204室</Text>
            <View className=' text-purple-600 font-semibold text-xl relative top-93 left-9'>相关介绍：</View>
            { isAdmin ?
                <View className=' w-screen h-10 absolute top-89 '>
                    <View 
                        className=' bg-yellow-300 bg-opacity-30 w-20 right-7 relative h-8 float-right text-xl font-semibold underline text-blue-600'
                        onClick={toEdit}
                    >
                        编辑信息
                    </View>
                </View> : ''
            }
            <View className=' font-semibold text-xl relative top-98 mx-9 leading-7'>22座，有两列四排双人座桌椅和六个单人座沙发，配有投影仪，可供自习和中小型课演示。</View>
            <View className=' bg-purple-600 fixed rounded-full -bottom-15 w-screen h-46'>
                <Text className=' font-medium text-2xl text-white top-6 left-15 absolute'>学生活动中心</Text>
                <Text className=' font-bold text-2xl text-white top-18 left-24 absolute'>204室</Text>
                <Button className=' rounded-full py-0 px-4 absolute bg-green-400 w-28 h-12 text-center font-bold border-separate right-10 top-11' onClick={toBook}>现在预定</Button>
            </View>
        </View>
    )
}