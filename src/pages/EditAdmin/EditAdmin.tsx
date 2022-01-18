import Taro from '@tarojs/taro';
import { useState } from 'react';
import { Image, Input, ScrollView, View } from '@tarojs/components';
import classNames from 'classnames';
import { UserCard } from '../../components'

import img from '../../assets/images/personEdit.png'
import search from '../../assets/images/search.png'
import phone from '../../assets/images/phone.png'
import add from '../../assets/images/add.png'
import deletePhone from '../../assets/images/deletePhone.png'

export default function EditAdmin() {

    const [key, setKey] = useState('')
    const [data, setData] = useState([])

    const [addFlag, setAddFlag] = useState(false)
    const [deleteFlag, setDeleteFlag] = useState(false)
    const [addKey, setAddKey] = useState('')
    const [deleteKey, setDeleteKey] = useState('')
    const [showPhoneHandle, setShowPhoneHandle] = useState(false)

    const [firstTime, setFirstTime] = useState(true)
    if (firstTime) {
        setFirstTime(false)
    }

    function find() {
        if (!key) return
        setKey('')
        Taro.showLoading({ title: '加载中'})
        Taro.cloud.callFunction({
            name: 'searchUser',
            data: { key }
        }).then((res: any) => {
            Taro.hideLoading()
            setData(res.result.data)
        })
    }

    function updatePhone() {
        if (addKey === '') return 
        Taro.showModal({
            title: '提示',
            content: `再次确定手机号:${addKey}`
        }).then((res: any) => {
            if (res.confirm) {
                Taro.showLoading({ title: '加载中'})
                Taro.cloud.callFunction({
                    name: 'addPhone',
                    data: { phone: addKey }
                }).then(() => {
                    Taro.hideLoading()
                    setAddKey('')
                    Taro.showToast({
                        title: '添加成功',
                        duration: 800
                    })
                })
            }
        })
    }

    function DeletePhone() {
        if (deleteKey === '') return 
        Taro.showModal({
            title: '提示',
            content: `再次确定手机号:${deleteKey}`
        }).then((res: any) => {
            if (res.confirm) {
                Taro.showLoading({ title: '加载中'})
                Taro.cloud.callFunction({
                    name: 'deletePhone',
                    data: { phone: deleteKey }
                }).then(() => {
                    Taro.hideLoading()
                    setDeleteKey('')
                    Taro.showToast({
                        title: '删除成功',
                        duration: 800
                    })
                })
            }
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
            <View 
                    className={classNames(' overflow-hidden', {' w-10 h-10 bg-red-400 rounded-full right-5 top-5 z-10 absolute shadow-lg': !showPhoneHandle, 'h-0 w-0': showPhoneHandle})}
                    onClick={() => setShowPhoneHandle(true)}
                >
                    <Image
                        src={phone}
                        className={classNames({' w-6 h-6 m-2 z-10': !showPhoneHandle, 'h-0 w-0': showPhoneHandle})}
                    />
                </View>

                <View 
                    className={classNames({' w-10 h-10 bg-red-400 rounded-full right-5 top-5 z-10 absolute shadow-lg transition duration-1000': showPhoneHandle, 'h-0 w-0': !showPhoneHandle})}
                    onClick={() => setAddFlag(!addFlag)}
                >
                    <Image
                        src={phone}
                        className={classNames({' w-6 h-6 m-2 z-10': showPhoneHandle, 'w-0 h-0': !showPhoneHandle})}
                    />
                    <View className={classNames({' w-5 h-5 rounded-full bg-red-300 absolute -right-2 -top-1 z-10': showPhoneHandle, 'h-0 w-0': !showPhoneHandle})}>
                        <Image
                            src={add}
                            className={classNames({' w-3 h-3 m-1 z-10 transition duration-1000': showPhoneHandle, 'w-0 h-0': !showPhoneHandle})}
                        />
                    </View>
                </View>
                <View 
                    className={classNames({' w-10 h-10 bg-red-400 rounded-full right-5 top-18 z-10 absolute shadow-lg transition duration-1000': showPhoneHandle, 'h-0 w-0': !showPhoneHandle})}
                    onClick={() => setDeleteFlag(!deleteFlag)}
                >
                    <Image
                        src={phone}
                        className={classNames({'w-6 h-6 m-2 z-10': showPhoneHandle, 'w-0 h-0': !showPhoneHandle})}
                    />
                    <View className={classNames({' w-5 h-5 rounded-full bg-red-300 absolute -right-2 -top-1 z-10': showPhoneHandle, 'h-0 w-0': !showPhoneHandle})}>
                        <Image
                            src={deletePhone}
                            className={classNames({' w-3 h-3 m-1 z-10 transition duration-1000': showPhoneHandle, 'w-0 h-0': !showPhoneHandle})}
                        />
                    </View>
                </View>
                <View className={classNames(' overflow-hidden', {'h-28 w-screen mb-5 transition duration-1000': addFlag, 'h-0 transition duration-1000': !addFlag})}>
                <View className='mx-auto font-semibold relative text-sm w-50 whitespace-nowrap'>注意：添加物业手机以下发通知</View>
                <View className=' bg-gray-200 w-60 h-9 rounded-xl relative mx-auto top-5 '>
                    <Input
                        placeholder='填写需要添加的物业手机号'
                        value={addKey}
                        type='digit'
                        onConfirm={updatePhone}
                        className=' font-semibold mx-3 my-2 h-6 w-50 relative top-1'
                        onInput={(e) => setAddKey(e.detail.value)}
                    />
                    <Image
                        src={add}
                        className='relative -top-6 w-4 h-4 float-right right-1'
                        onClick={updatePhone}
                    />
                </View>
            </View>
            <View className={classNames(' overflow-hidden',{'h-20 w-screen mb-5 transition duration-1000': deleteFlag, 'h-0 transition duration-1000': !deleteFlag})}>
                <View className=' bg-gray-200 w-60 h-9 rounded-xl relative mx-auto top-3 '>
                    <Input
                        placeholder='填写需要删除的物业手机号'
                        value={deleteKey}
                        type='digit'
                        onConfirm={DeletePhone}
                        className=' font-semibold mx-3 my-2 h-6 w-50 relative top-1'
                        onInput={(e) => setDeleteKey(e.detail.value)}
                    />
                    <Image
                        src={deletePhone}
                        className='relative -top-6 w-4 h-4 float-right right-1'
                        onClick={DeletePhone}
                    />
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