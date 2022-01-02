import Taro from '@tarojs/taro'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { View, Text, ScrollView, Image, Button } from '@tarojs/components'
import classNames from 'classnames'

import { RoomCard } from '../../components'
import { SET_USEROPENID,
         SET_ISADMIN,
         SET_ISSUPERADMIN,
         SET_REFRESHROOM, 
         SET_NICKNAME } from '../../constants'

import history from "../../assets/images/history.png"
import background from "../../assets/images/background.png"
import person from "../../assets/images/person.png"
import add from "../../assets/images/add.png"
import arrow from '../../assets/images/arrow.png'
import infomation from "../../assets/images/infomation.png"

export default function Index() {

    const dispatch = useDispatch()

    const [refresh, setRefresh] = useState(true)
    const [firstTime, setFirstTime] = useState(true)

    const [roomList, setRoomList] = useState([])
    const [isLogin, setIsLogin] = useState(typeof Taro.getStorageSync('userInfo') == 'object')
    const [isAdmin, setIsAdmin] = useState(false)
    const [isSuperAdmin, setIsSuperAdmin] = useState(false)
    const [showHistory, setShowHistory] = useState(false)
    const [hideArrow, setHideArrow] = useState(false)

    if (firstTime) {
        Taro.cloud.init()
        setFirstTime(false)
        setHideArrow(true)
        let nickName = Taro.getStorageSync('userInfo').nickName
        if (nickName) dispatch({ type: SET_NICKNAME, payload: { nickName }})
        dispatch({ type: SET_REFRESHROOM, payload: { refreshRoom: setRefresh }})
    }

    if (refresh) {
        setRefresh(false)
        if (isLogin) setTimeout(() => setShowHistory(true), 100)
        Taro.showLoading()
        Taro.cloud.callFunction({
            name: 'check'
        }).then((res: any) => 
            {
                let { openid, admin, superAdmin} = res.result
                dispatch({ type: SET_USEROPENID, payload: { openid }})
                dispatch({ type: SET_ISADMIN, payload: { admin }})
                dispatch({ type: SET_ISSUPERADMIN, payload: { superAdmin }})
                setIsAdmin(admin)
                setIsSuperAdmin(superAdmin)
            }).then(() => Taro.cloud.callFunction({ name: 'feedRoom' })
                                    .then((res: any) => setRoomList(res.result.rooms.data))
                                    .then(() => setHideArrow(false))
                                    .then(() => Taro.hideLoading()))
    }

    function toHistory() {
        Taro.navigateTo({
            url: `../History/History?isAdmin=${isAdmin}`
        })
    }

    function toBackground() {
        Taro.navigateTo({ url: '../Background/Background' })
        Taro.requestSubscribeMessage({
            tmplIds: ['fKmnqu6gqVAl5HDgG-aSlx4kRUFwimIbrCgv5eMEaKA'],
        }).then(res => console.log("授权成功", res))
          .catch(err => console.log("授权失败", err))
    }

    function toEditAdmin() {
        Taro.navigateTo({
            url: '../EditAdmin/EditAdmin'
        })
    }

    function addRoom() {
        Taro.navigateTo({ url: `../EditRoom/EditRoom?name=未命名&content=暂无内容，请编辑内容信息&add=true` })
    }

    function Login() {
        Taro.getUserProfile({
            desc: "注册成为用户"
        }).then(res => {
            let avatar = res.userInfo.avatarUrl
            let nickName = res.userInfo.nickName
            dispatch({type: SET_NICKNAME, payload: { nickName }})
            Taro.cloud.callFunction({name: 'login', data: {avatar, nickName}})
                      .then((res: any) => Taro.setStorage({ key: 'userInfo', data: { openid: res.result.openid, nickName } }))
        }).then(() => {
            setIsLogin(true) 
            setTimeout(() => setShowHistory(true), 100)
        }).catch(() => Taro.showToast({title: '请授权信息继续使用', icon:'none'}))
    }

    function openInformation() {
        let file = ''
        if (isAdmin || isSuperAdmin)
            file = 'cloud://room-cloud-1gy3i3f9c2ecb8e8.726f-room-cloud-1gy3i3f9c2ecb8e8-1309075220/活动室预约使用说明（管理员）.docx'
        else
            file = 'cloud://room-cloud-1gy3i3f9c2ecb8e8.726f-room-cloud-1gy3i3f9c2ecb8e8-1309075220/活动室预约使用说明（用户端）.docx'
        Taro.showLoading()
        Taro.cloud.downloadFile({ 'fileID': file })
                  .then(res => {
                      Taro.hideLoading()
                      Taro.openDocument({
                          filePath: res.tempFilePath,
                          showMenu: true
                      })
                  })
    }

    return (

        <View className='relative w-screen min-h-screen bg-gradient-to-b from-topColor to-bottomColor overflow-hidden'>
            <Image
                src={infomation}
                onClick={openInformation}
                className={classNames('z-10',{'absolute top-13 left-33 w-7 h-7 rounded-full': !isLogin, 'absolute top-168 left-7 w-10 h-10 rounded-full transition ease-out duration-3000': isLogin})}
            />
            {   isLogin ?
                <View>
                    <View className='w-screen h-80'>
                        <Text className='relative left-8 top-13 font-bold text-white text-xl'>注意事项</Text>
                        <View 
                            className={classNames('relative rounded-full bg-white right-5 top-4 float-right shadow-xl', {'h-10 w-10 transition ease-out duration-500': showHistory, 'h-0 w-0': !showHistory})}
                            onClick={toHistory}
                        >
                            <Image src={history} className={classNames({'w-6 h-6 m-2 transition duration-500 ease-out': showHistory, 'w-0 h-0': !showHistory})}></Image>
                        </View>
                        <View 
                            className={classNames('relative rounded-full bg-white right-10 top-4 float-right shadow-xl', {'h-10 w-10 transition ease-out duration-500': (isAdmin || isSuperAdmin), 'h-0 w-0': !(isAdmin || isSuperAdmin)})}
                            onClick={toBackground}
                        >
                            <Image src={background} className={classNames({'w-6 h-6 m-2 transition duration-500 ease-out': (isAdmin || isSuperAdmin), 'w-0 h-0': !(isAdmin || isSuperAdmin)})}></Image>
                        </View>
                        <View 
                            className={classNames('relative rounded-full bg-white right-15 top-4 float-right shadow-xl', {'h-10 w-10 transition ease-out duration-500': (isAdmin || isSuperAdmin), 'h-0 w-0': !(isAdmin || isSuperAdmin)})}
                            onClick={addRoom}
                        >
                            <Image src={add} className={classNames({'w-4 h-4 m-3 transition duration-500 ease-out': (isAdmin || isSuperAdmin), 'w-0 h-0': !(isAdmin || isSuperAdmin)})}></Image>
                        </View>
                        <View 
                            className={classNames('relative rounded-full bg-white right-20 top-4 float-right shadow-xl', {'h-10 w-10 transition ease-out duration-500': isSuperAdmin, 'h-0 w-0': !isSuperAdmin})}
                            onClick={toEditAdmin}
                        >
                            <Image src={person} className={classNames({'w-6 h-6 m-2 transition duration-500 ease-out': isSuperAdmin, 'w-0 h-0': !isSuperAdmin})}></Image>
                        </View>

                        <View className='absolute top-23 w-screen'>
                            <View className='relative w-70 h-53 bg-white shadow-xl rounded-2xl mx-auto'>
                                <View className='p-3'>
                                    <View className='text-lg'>1.请尽量控制会议声音，不要大声喧哗，以免影响其他同学。</View>
                                    <View className='text-lg'>2.使用完请把木椅归位，保持室内卫生。</View>
                                    <View className='text-lg'>3.请提前10分钟到场，超过预定时间15分钟之后将不再保留场地（场地将提供给其他同学自习）</View>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View className='w-screen h-100'>
                        <Text className='relative left-8 top-3 font-bold text-white text-xl'>选择活动室</Text>
                        <ScrollView 
                            className='relative top-8 w-screen h-85 whitespace-nowrap' 
                            scrollX
                            scrollWithAnimation
                            onScroll={() => {if (!hideArrow) setHideArrow(true)}}
                            scrollLeft={0}
                        >
                            {   
                                roomList.map((item: roomType, index) => 
                                    <RoomCard 
                                        name={item.name}
                                        content={item.content}
                                        photoUrl={item.photoUrl}
                                        id={item._id} 
                                        key={index}
                                        index={index}
                                        refresh={setRefresh}
                                        showDelete={isAdmin || isSuperAdmin}
                                    />
                                )
                            }
                            {   hideArrow ? '' :
                                <Image 
                                    src={arrow}
                                    className='absolute right-0 top-40 w-12 h-12 bounce'
                                />
                            }
                        </ScrollView>

                    </View>
                </View> :

                <View>
                    <View className='w-screen h-80'>
                        <Text className='relative left-8 top-13 font-bold text-white text-xl'>使用说明</Text>
                        <View className='absolute top-23 w-screen'>
                            <View className='relative w-70 h-53 bg-white shadow-xl rounded-2xl mx-auto'>
                                <View className='py-7 px-5'>
                                    <View className='text-lg py-3 font-semibold'>1.欢迎使用活动室预约小程序</View>
                                    <View className='text-lg py-3 font-semibold'>2.在此页面授权您的个人信息</View>
                                    <View className='text-lg py-3 font-semibold'>3.点击上方图标查看使用教程</View>
                                </View>
                            </View>
                        </View>
                    </View>
                    
                    <View className='w-screen h-100'>
                        <Text className='relative left-8 top-3 font-bold text-white text-xl'>授权个人信息</Text>
                        <Button 
                            className=' rounded-full py-0 px-4 primarybutton w-28 h-12 text-center font-bold border-separate relative top-18 shadow-2xl' 
                            onClick={Login}
                        >
                            点我授权
                        </Button>
                    </View>
                </View>
            }
        </View>

    )
}


