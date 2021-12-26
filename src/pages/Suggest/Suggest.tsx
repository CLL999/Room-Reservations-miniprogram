import { Button, Image, Textarea, View } from '@tarojs/components'
import { useRouter } from '@tarojs/taro'
import { useState } from 'react'

import suggest from '../../assets/images/suggest.png'
import suggest2 from '../../assets/images/suggest2.png'


export default function Suggest() {

    const router = useRouter()
    
    const [data, setData] = useState(JSON.parse(router.params.data))


    return (
        <View className=' w-screen min-h-screen containerBackground'>
            <View className='w-screen h-33'>
                <Image src={suggest} className=' w-35 h-35 relative float-right right-5 -top-2'></Image>
                <View className=' relative font-extrabold text-3xl left-17 top-2'>意见指引</View> 
            </View>
            <View className='w-screen h-200'>
                <View className='w-70 mx-auto guideCard min-h-180 shadow-2xl rounded-2xl'>
                    <View className='h-3'></View>
                    <View className=' w-60 min-h-60 mx-auto'>
                        <View className=' font-semibold text-4xl text-black w-full h-11'>{data.title}</View>
                        { data.time.map((item, index) => 
                        <View key={index} className=' font-semibold text-4xl text-black w-full h-11 text-center'>{item}</View> )
                        }
                        <View className='w-full '>
                            <View className=' h-3'></View>
                            <View className=' font-medium text-lg h-7 w-full'>{`${data.name}  ${data.studentId}`}</View>
                            <View className=' font-medium text-lg h-7 w-full'>{data.department}</View>
                            <View className=' font-medium text-lg h-7 w-full'>{`联系电话： ${data.studentPhone}`}</View>
                            <View className=' font-medium text-lg h-7 w-full'>{`负责老师： ${data.teacherName}`}</View>
                            <View className=' font-medium text-lg h-7 w-full'>{`联系电话： ${data.teacherPhone}`}</View>
                        </View>
                    </View>
                    <View className='w-full h-10'>
                        <Image
                            src={suggest2}
                            className='w-30 h-30 float-right relative -right-13 -top-6'
                        />
                    </View>
                    <View className='w-full h-75'>
                        <View className='mx-4 h-70 rounded-2xl bg-white'>
                            <View className='w-full h-15'></View>
                            <Textarea className='mx-6 h-45 w-50 text-xl font-semibold'></Textarea>
                            <View className='w-full h-10'></View>
                        </View>
                    </View>
                    <View className='w-full h-20 pt-5'>
                        <Button className='mx-auto font-bold text-xl shadow-2xl confirmButtom h-10 w-35 pt-1'>发送</Button>
                    </View>
                </View>
            </View>
        </View>
    )
}