import { Button, Image, Text, View } from '@tarojs/components';
import Taro, { useRouter } from '@tarojs/taro'
import { useState } from 'react';

export default function RoomDetail() {

    const router = useRouter()

   // let photoUrl = 'cloud://cloud1-1gxif9p835c655f8.636c-cloud1-1gxif9p835c655f8-1308942285/204室.png'

    const [isAdmin, setisAdmin] = useState(true)
    const [photoUrl, setphotoUrl] = useState('')
    const [content, setContent] = useState('')
    const [name, setName] = useState(router.params.name)

    function toBook() {
        Taro.navigateTo({
            url:'../RoomDetailBooking/RoomDetailBooking'
        })
    }

    function toEdit() {
        Taro.navigateTo({
            url: `../EditRoom/EditRoom?name=${name}&content=${content}&photoUrl=${photoUrl}`
        })
    }

    Taro.cloud.callFunction({
        name: 'showDetail',
        data: { name }
    }).then(res => {
        let data = res.result.data[0]
        setphotoUrl(data.photoUrl)
        setContent(data.content)
    })

    return (
        <View className=' h-screen overflow-hidden'>
            {   photoUrl ?
                <Image src={photoUrl} mode='aspectFill' className='absolute right-0 top-5 w-70 h-58 shadow-2xl'></Image> : ''
            }
            <Text className=' text-6xl absolute right-7 top-70 font-bold'>{name}</Text>
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
            <View className=' font-semibold text-xl relative top-98 mx-9 leading-7'>{content}</View>
            <View className=' bg-purple-600 fixed rounded-full -bottom-22 w-screen h-46'>
                <Text className=' font-medium text-2xl text-white top-4 left-15 absolute'>学生活动中心</Text>
                <Text className=' font-bold text-2xl text-white top-13 left-24 absolute'>{name}</Text>
                <Button className=' rounded-full py-0 px-4 absolute primarybutton w-28 h-12 text-center font-bold border-separate right-10 top-8' onClick={toBook}>现在预定</Button>
            </View>
        </View>
    )
}