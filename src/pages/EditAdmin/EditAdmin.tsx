import Taro from '@tarojs/taro';
import { useState } from 'react';
import { Image, Input, ScrollView, View } from '@tarojs/components';

import { UserCard } from '../../components'

import img from '../../assets/images/personEdit.png'
import search from '../../assets/images/search.png'


export default function EditAdmin() {

    const [key, setKey] = useState('')
    const [data, setData] = useState([])

    function find() {
        if (!key) return
        setKey('')
        Taro.showLoading()
        Taro.cloud.callFunction({
            name: 'searchUser',
            data: { key }
        }).then((res: any) => {
            Taro.hideLoading()
            setData(res.result.data)
        })
    }

    return (
        <View className='w-screen min-h-screen containerBackground relative overflow-hidden'>
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
                        onConfirm={find}
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
            {   data.length ? 
                <ScrollView
                    scrollY
                    scrollTop={0}
                    className=' h-120'
                >
                    {   data.map((item: userInfoType, index) => 
                            <UserCard 
                                clearData={setData}
                                key={index}
                                nickName={item.nickName}
                                avatar={item.avatar}
                                openid={item.openid}
                            />) 
                    }
                </ScrollView> :
                <View className='w-screen relative'>
                    <View className=' mx-auto mt-30 w-50 h-14 font-semibold text-2xl'>请搜索名称关键字</View>
                </View>
            }
        </View>
    )
}