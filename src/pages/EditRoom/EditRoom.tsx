import Taro, { useRouter } from '@tarojs/taro'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Image, Input, Text, Textarea, View } from '@tarojs/components'

import editRoom from '../../assets/images/editRoom.png'
import update from '../../assets/images/update.png'
import defaultBg from '../../assets/images/default.png'


export default function EditRoom() {

    const router = useRouter()
    
    const refresh = useSelector((state: any) => state.index).refreshRoom

    const [photoUrl, setPhotoUrl] = useState(router.params.photoUrl ? router.params.photoUrl : defaultBg)
    const [name, setName] = useState(router.params.name)
    const [content, setContent] = useState(router.params.content)
    const [isChoosed, setIsChoosed] = useState(false)
    
    function updateDetail() {
        Taro.showLoading({ title: '加载中'})
        let id = ''
        if (router.params.id) id = router.params.id
        else Taro.cloud.callFunction({ name: 'addRoom' }).then((res: any) => id = res.result._id)
        if (!isChoosed && photoUrl === defaultBg)
            {
                Taro.hideLoading()
                Taro.showModal({
                    title: '提示',
                    content: '请选择活动室图片',
                    showCancel: false
                })
                return
            }
        Taro.cloud.uploadFile({
            cloudPath: `${name}预览图`,
            filePath: `${photoUrl}`
        }).then(res => {
            let fileId = res.fileID
            let tags: string[] = []
            if (tag1) tags.push(tag1)
            if (tag2) tags.push(tag2)
            Taro.cloud.callFunction({
                name: 'updateRoomDetail',
                data: { id, name, content, photoUrl: fileId, tags }
            }).then(() => {
                Taro.hideLoading()
                Taro.showToast({
                    title: '添加成功',
                    duration: 600
                })
                setTimeout(() => {
                    Taro.navigateBack({ delta: 2 })
                    refresh(true)
                }, 600)
            })
        }).catch(() => {
            let tags: string[] = []
            if (tag1) tags.push(tag1)
            if (tag2) tags.push(tag2)
            Taro.cloud.callFunction({
                name: 'updateRoomDetail',
                data: { id, name, content, photoUrl, tags }
            }).then(() => {
                Taro.hideLoading()
                Taro.showToast({
                    title: '更改成功',
                    duration: 600
                })
                setTimeout(() => {
                    Taro.navigateBack({ delta: 2 })
                    refresh(true)
                }, 600)
            })
        })
    }

    function chooseImg() {
        Taro.chooseImage({
            count: 1,
            sizeType: ['compressed']
        }).then(res => setPhotoUrl(res.tempFilePaths[0])).then(() => setIsChoosed(true))
    }

    function deleteRoom() {
        Taro.showModal({
            title: '提示',
            content: '确定要删除该活动室吗',
            showCancel: false
        }).then(() => {
            Taro.showLoading({ title: '加载中'})
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
    const [tag1, setTag1] = useState(router.params.tag1 !== 'undefined' ? router.params.tag1 : '')
    const [tag2, setTag2] = useState(router.params.tag2 !== 'undefined' ? router.params.tag2 : '')
    return (
        <View className=' w-screen min-h-screen containerBackground relative overflow-hidden'>
            <View className=' w-screen h-34 '>
                <Text className=' relative font-extrabold text-3xl left-17 top-8'>{router.params.add ? '增加房间' : '信息修改'}</Text>
                <Image src={editRoom} className=' w-40 h-40 relative float-right -top-10 -right-6'></Image>
            </View>
            <View className=' w-screen h-30'>
                <View className='mx-auto w-25 whitespace-nowrap font-semibold text-xl text-black'>活动室名称</View>
                <Input
                    placeholder='请填写活动室名称（三字以内）'
                    value={name}
                    maxlength={4}
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
            <View className=' w-screen h-40'>
                <View className=' mx-auto w-20 whitespace-nowrap font-semibold text-xl text-black'>添加标签</View>
                <Input
                    className=' rounded-xl mx-auto w-56 bg-gray-100 h-7 py-1 font-semibold px-5 mt-5'
                    placeholder='可选标签1(六字以内)'
                    maxlength={6}
                    value={tag1}
                    onInput={e => setTag1(e.detail.value)}
                />
                <Input
                    className=' rounded-xl mx-auto w-56 bg-gray-100 h-7 py-1 font-semibold px-5 mt-5'
                    placeholder='可选标签2(六字以内)'
                    maxlength={6}
                    value={tag2}
                    onInput={e => setTag2(e.detail.value)}
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
                        className='w-6 h-6 m-3'
                        onClick={chooseImg}
                    />
                </View>
                <View 
                    className=' font-bold w-54 mx-auto text-lg relative top-17 greenbutton h-14 shadow-2xl rounded-2xl'
                    onClick={updateDetail}
                >
                    <View className='text-center w-24 h-8 mx-15 my-3 absolute'>{router.params.add ? '确认添加' : '确认修改'}</View>
                </View>
                {   router.params.add ? '' :
                    <View 
                        className='mt-7 font-bold w-54 mx-auto text-lg relative top-17 bg-red-600 h-14 shadow-2xl rounded-2xl'
                        onClick={deleteRoom}
                    >
                        <View className='text-center w-24 h-8 mx-15 my-3 absolute'>删除活动室</View>
                    </View>
                }
            </View>
        </View>
    )
}