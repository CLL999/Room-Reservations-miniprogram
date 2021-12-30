import Taro from '@tarojs/taro'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { View, Text, ScrollView, Image, Button } from '@tarojs/components'

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

export default function Index() {

    const dispatch = useDispatch()

    const [refresh, setRefresh] = useState(true)
    const [firstTime, setFirstTime] = useState(true)

    const [roomList, setRoomList] = useState([])
    const [isLogin, setIsLogin] = useState(typeof Taro.getStorageSync('userInfo') == 'object')
    const [isAdmin, setIsAdmin] = useState(false)
    const [isSuperAdmin, setIsSuperAdmin] = useState(false)

    if (firstTime) {
        Taro.cloud.init()
        setFirstTime(false)
        let nickName = Taro.getStorageSync('userInfo').nickName
        if (nickName) dispatch({ type: SET_NICKNAME, payload: { nickName }})
        dispatch({ type: SET_REFRESHROOM, payload: { refreshRoom: setRefresh }})
    }

    if (refresh) {
        setRefresh(false)
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
                                    .then(() => Taro.hideLoading()))
    }

    function toHistory() {
        Taro.navigateTo({
            url: `../History/History?isAdmin=${isAdmin}`
        })
    }

    function toBackground() {
        Taro.navigateTo({
            url: '../Background/Background'
        })
    }

    function toEditAdmin() {
        Taro.navigateTo({
            url: '../EditAdmin/EditAdmin'
        })
    }

    function addRoom() {
        Taro.showLoading()
        Taro.cloud.callFunction({ name: 'addRoom' })
                  .then(() => {
                      Taro.showToast({title: '添加房间成功', duration: 1000})
                      setTimeout(() => setRefresh(true), 1000)
                  })
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
        }).then(() => setIsLogin(true)).catch(() => Taro.showToast({title: '请授权信息继续使用', icon:'none'}))
    }

    return (

        <View className='relative w-screen min-h-screen bg-gradient-to-b from-topColor to-bottomColor'>

            {   isLogin ?
                <View>
                    <View className='w-screen h-80'>
                        <Text className='relative left-8 top-13 font-bold text-white text-xl'>注意事项</Text>
                        <View 
                            className='relative rounded-full bg-white h-10 w-10 right-5 top-5 float-right'
                            onClick={toHistory}
                        >
                            <Image src={history} className='w-6 h-6 m-2'></Image>
                        </View>

                        {   (isAdmin || isSuperAdmin)?
                            <View 
                                className='relative rounded-full bg-white h-10 w-10 right-10 top-5 float-right'
                                onClick={toBackground}
                            >
                                <Image src={background} className='w-6 h-6 m-2'></Image>
                            </View> : ''
                        }

                        {   isSuperAdmin ?             
                                <View 
                                    className='relative rounded-full bg-white h-10 w-10 right-15 top-5 float-right'
                                    onClick={toEditAdmin}
                                >
                                    <Image src={person} className='w-6 h-6 m-2'></Image>
                                </View>  : ''
                        }

                        {   isSuperAdmin ?
                                <View 
                                className='relative rounded-full bg-white h-10 w-10 right-20 top-5 float-right'
                                onClick={addRoom}
                                >
                                    <Image src={add} className='w-4 h-4 m-3'></Image>
                                </View>  : ''

                        }

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
                        <Text className='relative left-8 top-3 font-bold text-white text-xl'>滑动选择活动室</Text>
                        <ScrollView 
                            className='relative top-8 w-screen h-85 whitespace-nowrap' 
                            scrollX
                            scrollWithAnimation
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
                                    />
                                )
                            }
                        </ScrollView>

                    </View>
                </View> :

                <View>
                    <View className='w-screen h-80'>
                        <Text className='relative left-8 top-13 font-bold text-white text-xl'>使用说明</Text>
                        <View className='absolute top-23 w-screen'>
                            <View className='relative w-70 h-53 bg-white shadow-xl rounded-2xl mx-auto'>
                                <View className='p-3'>
                                    <View className='text-lg py-3 font-semibold'>1.在此页面授权您的个人信息</View>
                                    <View className='text-lg py-3 font-semibold'>2.选择需要预约的活动室</View>
                                    <View className='text-lg py-3 font-semibold'>3.浏览活动室详情，选择合适的时间，并填写所需的信息</View>
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


