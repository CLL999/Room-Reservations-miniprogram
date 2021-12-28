import { Button, Image, Text, View } from '@tarojs/components';
import Taro from '@tarojs/taro';

import pot from "../../assets/images/pot.png"

export default function RoomCard(props) {

    function toRoomDetail() {
        Taro.navigateTo({
            url: `../RoomDetail/RoomDetail?name=${props.name}&content=${props.content}&id=${props.id}&photoUrl=${props.photoUrl}`
        })
    }

    return (
        <View className='w-70 h-78 bg-white shadow-2xl rounded-3xl mx-12 inline-block relative'>
            <Image src={pot} className='absolute h-52 w-52 -top-8 left-26 overflow-visible z-50'></Image>
            <Text className=' text-4xl font-bold absolute top-24 left-5'>活动</Text>
            <Text className=' text-4xl font-bold absolute top-34 left-5'>中心</Text>
            <Text className=' text-7xl font-bold absolute top-43 left-9 text-black text-opacity-16 truncate w-65'>{props.name}</Text>
            <Button className=' rounded-full py-0 px-4 absolute primarybutton bottom-2 right-3 w-28 h-12 text-center font-bold border-separate' onClick={toRoomDetail}>了解更多</Button>
        </View>
    )
}