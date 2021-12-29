import { Button, Image, Picker, View } from '@tarojs/components';
import Taro from '@tarojs/taro';

export default function UserCard(props) {

    let chooseKind = [ '管理员', '超级管理员' ]

    function choosePicker(e) {
        let openid = props.openid
        Taro.cloud.callFunction({
            name: 'setAdmin',
            data: { openid, target: e.detail.value === '0' ? 'admin' : 'superAdmin' }
        }).then(() => 
            {
                Taro.showToast({title: '授权成功', icon: 'success', duration: 1000})
                setTimeout(() => props.clearData([]), 1000)
            })
    }

    return (
        <View className='w-screen h-34'>
            <View className='bg-white rounded-xl shadow-2xl w-74 h-29 mx-auto relative'>
                <View className='absolute w-full h-full'>
                    <Image
                        src={props.avatar}
                        className='w-25 h-25 rounded-xl my-2 mx-3 relative'
                    />
                    <View className=' text-pink-400 text-xl font-bold relative float-right right-3 top-3 w-40 whitespace-nowrap truncate text-center'>{props.nickName}</View>
                    <Picker
                        range={chooseKind}
                        onChange={choosePicker}
                        className='float-right -top-17 w-40 h-8 right-3 relative'
                    >
                        <Button className=' primarybutton font-bold rounded-full w-26 h-11 shadow-2xl mx-auto'>
                            授权管理
                        </Button>
                    </Picker>
                </View>
            </View>
        </View>
    )
}