import Taro from '@tarojs/taro'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Image, Input, View } from '@tarojs/components'
import classNames from 'classnames'

import { SET_REFRESHBACKGROUND } from '../../constants'
import { HistoryCard } from '../../components'


import key from '../../assets/images/key.png'
import replace from '../../assets/images/replace.png'
import phone from '../../assets/images/phone.png'
import add from '../../assets/images/add.png'
import deletePhone from '../../assets/images/deletePhone.png'

export default function EditRoom() {

    const dispatch = useDispatch()

    const userInfo: any = useSelector(state => state)

    const [data, setData] = useState([])
    const [firstTime, setFirstTime] = useState(true)
    const [refreshBackground, setRefreshBackground] = useState(true)
    const [addFlag, setAddFlag] = useState(false)
    const [deleteFlag, setDeleteFlag] = useState(false)
    const [addKey, setAddKey] = useState('')
    const [deleteKey, setDeleteKey] = useState('')
    const [showPhoneHandle, setShowPhoneHandle] = useState(false)

    if (firstTime) {
        console.log(123)
        setFirstTime(false)
        dispatch({ type: SET_REFRESHBACKGROUND, payload: { refreshBackground: setRefreshBackground}})
    }

    if (refreshBackground) {
        Taro.showLoading()
        setRefreshBackground(false)
        Taro.cloud.callFunction({
            name: 'feedRecord'
        }).then((res: any) => {
            setData(res.result.record)
            Taro.hideLoading()
        })
    }

    function replaceSheet() {
        Taro.showModal({
            title: '注意',
            content: '确定要更换申请表吗？'
        }).then((res) => {
            if (res.confirm) {            
                Taro.showToast({ title: '请在会话中选择文件' , icon: 'none', duration: 1000})
                setTimeout(() => {
                    Taro.chooseMessageFile({
                    count: 1,
                    type: 'file'
                }).then(res => {
                    Taro.showLoading()
                    Taro.cloud.uploadFile({
                        cloudPath: '正义书院学生活动空间申请表.xlsx',
                        filePath: res.tempFiles[0].path
                    }).then(() => {
                        Taro.hideLoading()
                        setTimeout(() => Taro.showToast({ title: '更换成功', duration: 800 }), 100);
                    })
                })
            }, 1000)}
        })
    }

    function updatePhone() {
        Taro.showModal({
            title: '提示',
            content: `再次确定手机号:${addKey}`
        }).then((res: any) => {
            if (res.confirm) {
                Taro.showLoading()
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
        Taro.showModal({
            title: '提示',
            content: `再次确定手机号:${deleteKey}`
        }).then((res: any) => {
            if (res.confirm) {
                Taro.showLoading()
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
        <View className=' w-screen min-h-screen containerBackground relative overflow-hidden'>
            <Image src={key} className=' w-36 h-36 relative float-right top-2 right-3'></Image>
            <View className='w-screen h-43'>
                <View className=' relative font-extrabold text-3xl left-17 top-8'>审批申请</View> 
                <View 
                    className=' w-10 h-10 bg-orange-600 rounded-full -bottom-2 mt-14 ml-9 z-10 relative shadow-lg'
                    onClick={replaceSheet}
                >
                    <Image
                        src={replace}
                        className=' w-6 h-6 m-2 z-10'
                    />
                </View>
                <View 
                    className={classNames(' overflow-hidden', {' w-10 h-10 bg-red-400 rounded-full left-24 top-25 z-10 absolute shadow-lg': !showPhoneHandle, 'h-0 w-0': showPhoneHandle})}
                    onLongPress={() => setShowPhoneHandle(true)}
                >
                    <Image
                        src={phone}
                        className={classNames({' w-6 h-6 m-2 z-10': !showPhoneHandle, 'h-0 w-0': showPhoneHandle})}
                    />
                </View>

                <View 
                    className={classNames({' w-10 h-10 bg-red-400 rounded-full left-24 top-25 z-10 absolute shadow-lg transition duration-1000': showPhoneHandle, 'h-0 w-0': !showPhoneHandle})}
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
                    className={classNames({' w-10 h-10 bg-red-400 rounded-full left-40 top-25 z-10 absolute shadow-lg transition duration-1000': showPhoneHandle, 'h-0 w-0': !showPhoneHandle})}
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
            </View>
            <View className={classNames(' overflow-hidden', {'h-20 w-screen mb-5 transition duration-1000': addFlag, 'h-0 transition duration-1000': !addFlag})}>
                <View className=' bg-gray-200 w-60 h-9 rounded-xl relative mx-auto top-3 '>
                    <Input
                        placeholder='填写需要添加的通知手机号'
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
                        placeholder='填写需要删除的通知手机号'
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
            {   data.length ?
                data.map((item: historyItemType) => 
                    <HistoryCard
                        key={item._id}
                        _id={item._id}
                        room={item.room}
                        time={item.time}
                        student={item.student}
                        id={item.id}
                        department={item.department}
                        studentPhone={item.studentPhone}
                        teacher={item.teacher}
                        teacherPhone={item.teacherPhone}
                        unit={item.unit}
                        sheet={item.sheet}
                        submitDate={item.submitDate}
                        applicantOpenid={item.applicantOpenid}
                        auditor={userInfo.index.nickName}
                        refresh={setRefreshBackground}
                        admin
                        background
                    />
                ) :
                <View className='w-screen'>
                    <View className='h-14 w-60 mx-auto font-bold text-2xl text-center mt-45'>所有申请已批阅</View>
                </View>
            }
        </View>
    )
}