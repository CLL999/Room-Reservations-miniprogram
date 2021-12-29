import Taro, { useRouter } from '@tarojs/taro'
import { useState } from 'react';
import { Button, Image, Text, View } from '@tarojs/components';


export default function RoomDetail() {

    const router = useRouter()

    const [isAdmin, setisAdmin] = useState(() => {
        let userInfo = Taro.getStorageSync('userInfo')
        return (userInfo.admin || userInfo.superAdmin)
    })

    function toBook() {
        Taro.navigateTo({
            url: `../RoomDetailBooking/RoomDetailBooking?name=${router.params.name}&content=${router.params.content}&photoUrl=${router.params.photoUrl}`
        })
    }

    function toEdit() {
        Taro.navigateTo({
            url: `../EditRoom/EditRoom?name=${router.params.name}&content=${router.params.content}&photoUrl=${router.params.photoUrl}&id=${router.params.id}`
        })
    }

    Taro.showLoading()

    return (
        <View className=' h-screen overflow-hidden'>
            {   router.params.photoUrl ?
                <Image 
                    src={router.params.photoUrl} mode='aspectFill' 
                    className='absolute right-0 top-5 w-70 h-58 shadow-2xl'
                    onLoad={() => Taro.hideLoading()}
                />: ''
            }
            <Text className=' text-6xl absolute right-7 top-70 font-bold'>{router.params.name}</Text>
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
            <View className=' font-semibold text-xl relative top-98 mx-9 leading-7'>{router.params.content}</View>
            <View className=' bg-purple-600 fixed rounded-full -bottom-22 w-screen h-46'>
                <Text className=' font-medium text-2xl text-white top-4 left-15 absolute'>学生活动中心</Text>
                <Text className=' font-bold text-2xl text-white top-13 left-24 absolute'>{router.params.name}</Text>
                <Button className=' rounded-full py-0 px-4 absolute primarybutton w-28 h-12 text-center font-bold border-separate right-10 top-8' onClick={toBook}>现在预定</Button>
            </View>
        </View>
    )
}