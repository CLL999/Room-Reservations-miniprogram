import Taro, { useRouter } from '@tarojs/taro'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Button, Image, Input, Text, Textarea, View } from '@tarojs/components'

import editRoom from '../../assets/images/editRoom.png'
import update from '../../assets/images/update.png'


export default function EditRoom() {

    const router = useRouter()
    
    const refresh = useSelector((state: any) => state.index).refreshRoom

    const [photoUrl, setPhotoUrl] = useState(router.params.photoUrl)
    const [name, setName] = useState(router.params.name)
    const [content, setContent] = useState(router.params.content)
    
    function updateDetail() {
        Taro.showLoading()
        let id = router.params.id
        Taro.cloud.uploadFile({
            cloudPath: `${name}预览图`,
            filePath: `${photoUrl}`
        }).then(res => {
            let fileId = res.fileID
            Taro.cloud.callFunction({
                name: 'updateRoomDetail',
                data: { id, name, content, photoUrl: fileId }
            }).then(() => {
                Taro.navigateBack({ delta: 2 })
                Taro.hideLoading()
            })
        }).catch(() => {
            Taro.cloud.callFunction({
                name: 'updateRoomDetail',
                data: { id, name, content, photoUrl }
            }).then(() => {
                Taro.navigateBack({ delta: 2 })
                Taro.hideLoading()
            })
        })

    }

    function chooseImg() {
        Taro.chooseImage({
            count: 1,
            sizeType: ['compressed']
        }).then(res => setPhotoUrl(res.tempFilePaths[0]))
    }

    function deleteRoom() {
        Taro.showModal({
            title: '提示',
            content: '确定要删除该活动室吗',
            showCancel: false
        }).then(() => {
            Taro.showLoading()
            Taro.cloud.callFunction({
                name: 'deleteRoom',
                data: { id: router.params.id }
            }).then(() => {
                Taro.showToast({title: '删除成功', duration: 1000})
                setTimeout(() => {
                    Taro.navigateBack({ delta: 2 })
                    refresh(true)
                    Taro.hideLoading()
                }, 1000)
            })
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
                    placeholder='请填写活动室名称（三字以内）'
                    value={name}
                    onInput={(e) => setName(e.detail.value)}
                    className=' mx-auto w-56 bg-gray-100 rounded-xl h-7 py-1 font-semibold relative top-3 px-5'
                />
            </View>
            <View className=' w-screen h-84'>
                <View className='mx-auto w-20 whitespace-nowrap font-semibold text-xl text-black'>相关介绍</View>
                <Textarea
                    placeholder='请填写相关介绍'
                    value={content}
                    onInput={(e) => setContent(e.detail.value)}
                    className=' mx-auto w-51 bg-gray-100 rounded-2xl h-50 py-7 font-semibold relative top-3 px-7 leading-7 text-lg'
                />
            </View>
            <View className=' w-screen h-130'>
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
                        onClick={chooseImg}
                    />
                </View>
                
                <Button 
                    className=' font-bold w-54 mx-auto text-lg relative top-17 bg-orange-300 h-15 py-3 shadow-2xl rounded-xl'
                    onClick={updateDetail}
                >
                    确认修改
                </Button>

                <Button 
                    className=' font-bold w-54 mx-auto text-lg relative top-23 bg-red-600 h-15 py-3 shadow-2xl rounded-xl'
                    onClick={deleteRoom}
                >
                    删除活动室
                </Button>
            </View>
        </View>
    )
}