import Taro from '@tarojs/taro'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Image, Input, Switch, Text, View } from '@tarojs/components'
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
    const [bounce, setBounce] = useState(false)
    const [allow, setAllow] = useState(false)

    if (firstTime) {
        setFirstTime(false)
        dispatch({ type: SET_REFRESHBACKGROUND, payload: { refreshBackground: setRefreshBackground}})
        Taro.cloud.callFunction({ name: 'checkPhoneToAdmin'}).then((res: any) => {
            if (!res.result.data.length) {
                Taro.showModal({
                    showCancel: false,
                    title: '提示',
                    content: '系统尚未添加您的手机，请尽快添加\r\n以便于及时收到新申请'
                })
                setBounce(true)
            }
            else setAllow(res.result.data[0].status === 'allow')
        })
    }

    if (refreshBackground) {
        Taro.showLoading({ title: '加载中'})
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
                    Taro.showLoading({ title: '加载中'})
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
        if (addKey === '') return 
        Taro.showModal({
            title: '提示',
            content: `再次确定手机号:${addKey}`
        }).then((res: any) => {
            if (res.confirm) {
                Taro.showLoading({ title: '加载中'})
                Taro.cloud.callFunction({
                    name: 'addPhoneToAdmin',
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
                    name: 'deletePhoneToAdmin',
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

    function getPhoneNumber(e) {
        Taro.cloud.callFunction({
            name: 'getPhone',
            data: {
                weRunData: Taro.cloud.CloudID(e.detail.cloudID)
            }
        }).then((res: any) => setAddKey(res.result.moblie))
    }

    function switchHandle(e) {
        Taro.showLoading({title: '加载中'})
        console.log(e.detail.value)
        if (e.detail.value)
            Taro.cloud.callFunction({
                name: 'setRejectSwitch',
                data: {
                    status : 'allow'
                }
            }).then((e) => {
                console.log(e)
                setRefreshBackground(true)
                Taro.hideLoading()
                Taro.showToast({
                    title: '允许接收',
                    duration: 500,
                    icon: 'success'
                })
            })
        else 
            Taro.cloud.callFunction({
                name: 'setRejectSwitch',
                data: {
                    status: 'reject'
                }
            }).then((e) => {
                console.log(e)
                setRefreshBackground(true)
                Taro.hideLoading()
                Taro.showToast({
                    title: '暂不接收',
                    duration: 500,
                    icon: 'success'
                })
            })
    }

    return (
        <View className=' w-screen min-h-screen containerBackground relative overflow-hidden'>
            <Image src={key} className=' w-36 h-36 relative float-right top-2 right-3'></Image>
            <View className='w-screen h-47'>
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
                    className={classNames(' overflow-hidden', {' w-10 h-10 bg-red-400 rounded-full left-24 top-25 z-10 absolute shadow-lg': !showPhoneHandle, 'h-0 w-0': showPhoneHandle, 'animate-bounce': bounce})}
                    onClick={() => setShowPhoneHandle(true)}
                >
                    <Image
                        src={phone}
                        className={classNames({' w-6 h-6 m-2 z-10': !showPhoneHandle, 'h-0 w-0': showPhoneHandle})}
                    />
                </View>
                {!bounce &&
                    <View className=' w-70 h-8 relative top-3 left-24 mb-3'>
                        <Switch onChange={switchHandle} checked={allow} />
                        <Text className=' font-semibold text-sm'>开关关闭后不再接收短信</Text>
                    </View>
                }

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
            <View className={classNames(' overflow-hidden', {'h-40 w-screen mb-5 transition duration-1000': addFlag, 'h-0 transition duration-1000': !addFlag})}>
                <View className='text-center w-screen text-sm font-bold mt-3'>提示：登记手机后，每条新申请都将自动以短信通知。</View>
                <View className=' bg-gray-200 w-60 h-9 rounded-xl relative mx-auto top-3'>
                    <Input
                        placeholder='填写需要添加的通知手机号'
                        value={addKey}
                        type='digit'
                        onConfirm={updatePhone}
                        className=' font-semibold mx-3 my-2 h-6 w-50 relative top-1 mb-5'
                        onInput={(e) => setAddKey(e.detail.value)}
                    />
                    <Image
                        src={add}
                        className='relative -top-9 w-4 h-4 float-right right-1'
                        onClick={updatePhone}
                    />
                    <Button 
                        className=' w-50 h-10 font-medium rounded-full bg-amber-100'
                        openType='getPhoneNumber'
                        onGetPhoneNumber={getPhoneNumber}
                    >
                        点我自动获取手机号
                    </Button>
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
                        bounce={bounce}
                    />
                ) :
                <View className='w-screen'>
                    <View className='h-14 w-60 mx-auto font-bold text-2xl text-center mt-45'>所有申请已批阅</View>
                </View>
            }
        </View>
    )
}