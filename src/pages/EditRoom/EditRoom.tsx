import Taro from '@tarojs/taro'
import { Button, Image, Input, Text, Textarea, View } from '@tarojs/components'

import editRoom from '../../assets/images/editRoom.png'
import update from '../../assets/images/update.png'



export default function EditRoom() {

    let name = '204室'
    let content = '22座，有两列四排双人座桌椅和六个单人座沙发，配有投影仪，可供自习和中小型课演示。'
    let photoUrl = 'cloud://cloud1-1gxif9p835c655f8.636c-cloud1-1gxif9p835c655f8-1308942285/204室.png'

    function BackToHome() {
        Taro.showLoading()
        Taro.hideLoading()

        Taro.navigateBack({
            delta: 2
        })
    }

    return (
        <View className=' w-screen min-h-screen containerBackground'>
            <View className=' w-screen h-34 '>
                <Text className=' relative font-extrabold text-3xl left-17 top-8'>信息修改</Text>
                <Image src={editRoom} className=' w-40 h-40 relative float-right -top-10 -right-6'></Image>
            </View>
            <View className=' w-screen h-30'>
                <View className='mx-auto w-25 whitespace-nowrap font-semibold text-xl text-black'>活动室名称</View>
                <Input
                    placeholder='请填写活动室信息'
                    value={name}
                    className=' mx-auto w-56 bg-gray-100 rounded-xl h-7 py-1 font-semibold relative top-3 px-5'
                />
            </View>
            <View className=' w-screen h-84'>
                <View className='mx-auto w-20 whitespace-nowrap font-semibold text-xl text-black'>相关介绍</View>
                <Textarea
                    placeholder='请填写相关介绍'
                    value={content}
                    className=' mx-auto w-51 bg-gray-100 rounded-2xl h-50 py-7 font-semibold relative top-3 px-7 leading-7 text-lg'
                />
            </View>
            <View className=' w-screen h-110'>
                <View className='mx-auto w-25 whitespace-nowrap font-semibold text-xl text-black '>活动室图片</View>
                <Image
                    src={photoUrl}
                    mode='aspectFill'
                    className='w-55 h-50 relative top-5 shadow-2xl'
                />
                <View className='w-12 h-12 rounded-full bg-gray-100 relative float-right right-10 shadow-xl top-45'>
                    <Image 
                        src={update}
                        className='w-8 h-8 m-2'
                    />
                </View>
                
                <Button 
                    className=' font-bold w-54 mx-auto text-lg relative top-17 bg-orange-300 h-15 py-3 shadow-2xl rounded-xl'
                    onClick={BackToHome}
                >
                    确认修改
                </Button>
            </View>
        </View>
    )
}