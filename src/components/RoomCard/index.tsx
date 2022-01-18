import Taro from '@tarojs/taro';
import { useState } from 'react';
import { Button, Image, Text, View } from '@tarojs/components';
import classNames from 'classnames';

import pot from "../../assets/images/pot.png"
import deleteIcon from '../../assets/images/delete.png'
import tag from '../../assets/images/tag.png'

export default function RoomCard(props) {

    function toRoomDetail() {
        Taro.navigateTo({
            url: `../RoomDetail/RoomDetail?name=${props.name}&content=${props.content}&id=${props.id}&photoUrl=${props.photoUrl}&tag1=${props.tags[0]}&tag2=${props.tags[1]}`
        })
    }

    const [hide, setHide] = useState(true)

    function showMore() {
        if (props.showDelete) 
            setHide(!hide)
    }

    function deleteRoom() {
        Taro.showModal({
            title: '提示',
            content: '确定要删除该活动室吗'
        }).then((res) => {
            if (res.confirm)
                {               
                    Taro.showLoading({ title: '加载中'})
                    Taro.cloud.callFunction({
                        name: 'deleteRoom',
                        data: { id: props.id }
                    }).then(() => {
                        Taro.showToast({title: '删除成功', duration: 1000})
                        setTimeout(() => {
                            props.refresh(true)
                            Taro.hideLoading()
                        }, 1000)
            })}
        })
    }

    return (
        <View className='h-78 w-screen inline-block' onLongPress={showMore}>
            <View className='w-62 h-70 bg-white shadow-2xl rounded-3xl mx-auto relative'>
                <Image src={pot} className='absolute h-44 w-42 -top-8 left-27 overflow-visible z-50'></Image>
                <Text className=' text-4xl font-bold absolute top-14 left-5'>活动</Text>
                <Text className=' text-4xl font-bold absolute top-24 left-5'>中心</Text>
                <Text className=' text-6xl font-bold absolute top-38 left-4 text-black text-opacity-16 truncate w-65'>{props.name}</Text>
                <Button className=' rounded-full py-0 px-4 absolute primarybutton bottom-2 right-3 w-28 h-12 text-center font-bold border-separate' onClick={toRoomDetail}>了解更多</Button>
                {props.tags[0] ?
                    <View className=' bg-yellow-200 w-24 h-6 rounded-md relative top-54 left-5 flex flex-row'>
                        <Image
                            src={tag}
                            className=' absolute w-3 h-3 left-1 top-2 inline-block'
                        />
                        <View className=' text-xs font-medium h-4 w-23 text-right my-1 absolute'>{props.tags[0]}</View>
                    </View> : ''
                }
                {props.tags[1] ?
                    <View className=' bg-yellow-200 w-24 h-6 rounded-md relative top-56 left-5 flex flex-row'>
                        <Image
                            src={tag}
                            className=' absolute w-3 h-3 left-1 top-2 inline-block'
                        />
                        <View className=' text-xs font-medium h-4 w-23  text-right my-1 absolute'>{props.tags[1]}</View>
                    </View> : ''
                }
                <View 
                    className={classNames('absolute rounded-full top-3 left-5', { 'w-10 h-10 bg-orange-600 transition duration-500 ease-out' : !hide, 'w-0 h-0 bg-white transition duration-500 ease-in' : hide })}
                    onClick={deleteRoom}
                >
                    <Image
                        src={deleteIcon}
                        className={classNames({'w-6 h-6 m-2 transition ease-out duration-500' : !hide , 'w-0 h-0 transition duration-500 ease-in': hide})}
                    />
                </View>
            </View>
        </View>
    )
}