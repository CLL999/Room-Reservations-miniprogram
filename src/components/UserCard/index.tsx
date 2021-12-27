import { Button, Image, Picker, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useState } from 'react';

export default function UserCard(props) {

    let chooseKind = ['管理员','超级管理员']

    function choosePicker(e) {
        let openid = props.openid
        Taro.cloud.callFunction({
            name: 'setAdmin',
            data: { openid, target: e.detail.value === '0' ? 'admin' : 'superAdmin' }
        }).then(() => Taro.showToast({title: '授权成功', icon: 'success'}))
        
        props.clearData([])
    }

    return (
        <View className='w-screen h-34'>
            <View className='bg-white rounded-xl shadow-2xl w-68 h-29 mx-auto relative'>
                <View className='absolute w-full h-full'>
                    <Image
                        src={props.avatar}
                        className='w-25 h-25 rounded-xl my-2 mx-3 relative'
                    />
                    <View className=' text-pink-400 text-2xl font-bold relative float-right right-5 top-3 w-30 whitespace-nowrap truncate'>{props.nickName}</View>
                    <Picker
                        range={chooseKind}
                        onChange={choosePicker}
                        className='float-right -top-17 w-full relative'
                    >
                        <Button className=' primarybutton font-bold rounded-full w-26 h-12 shadow-2xl relative right-5 float-right'>
                            授权管理
                        </Button>
                    </Picker>
                </View>
            </View>
        </View>
    )
}