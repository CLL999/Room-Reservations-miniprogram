import Taro from '@tarojs/taro';
import { Image, Input, View } from '@tarojs/components';
import { useState } from 'react';

import { UserCard } from '../../components'

import img from '../../assets/images/personEdit.png'
import search from '../../assets/images/search.png'


export default function EditAdmin() {

    const [key, setKey] = useState('')
    const [data, setData] = useState([])

    function find() {
        setKey('')
        Taro.showLoading()
        Taro.cloud.callFunction({
            name: 'searchUser',
            data: { key }
        }).then((res: any) => {
            Taro.hideLoading()
            setData(res.result.record.data)
        })
    }

    return (
        <View className='w-screen min-h-screen containerBackground'>
            <View className='w-screen h-45'>
                <View className='bg-white z-10 w-screen h-90 rounded1 relative -top-45'>
                    <View className='w-screen relative top-33'>
                        <Image
                            src={img}
                            className='w-64 h-64 mx-auto block'
                        />
                    </View>
                </View>
            </View>
            <View className='w-screen h-20'>
                <View className=' bg-gray-200 w-60 h-9 rounded-xl relative mx-auto top-3 '>
                    <Input
                        placeholder='搜索曾使用过的用户'
                        value={key}
                        className=' font-semibold mx-3 my-2 h-6 w-40 relative top-1'
                        onInput={(e) => setKey(e.detail.value)}
                    />
                    <Image
                        src={search}
                        className='relative -top-9 w-10 h-10 float-right right-1'
                        onClick={find}
                    />
                </View>
            </View>
            {   
                data.map((item: userInfoType, index) => 
                    <UserCard 
                        clearData={setData}
                        key={index}
                        nickName={item.nickName}
                        avatar={item.avatar}
                        openid={item.openid}
                    />
                )
            }
        </View>
    )
}