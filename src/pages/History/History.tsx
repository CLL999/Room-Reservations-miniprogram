import { Image, Text, View } from '@tarojs/components'
import { useRouter } from '@tarojs/taro'

import { HistoryCard } from '../../components'
import key from '../../assets/images/key.png'

export default function EditRoom() {

    const router = useRouter()

    return (
        <View className=' w-screen min-h-screen containerBackground'>
            <Image src={key} className=' w-36 h-36 relative float-right top-2 right-3'></Image>
            { router.params.isAdmin === 'false' ?
                <View className='w-screen h-43'>
                    <Text className=' relative font-extrabold text-3xl left-17 top-8'>申请记录</Text> 
                </View> :
                <View className='w-screen h-43'>
                    <View className=' relative font-extrabold text-3xl left-17 top-8'>审批记录</View> 
                </View>
            }
             <HistoryCard
                title='204室'
                time={['15:50-17:50', '15:50-17:50']}
                name='张三'
                studentId='2021000000'
                department='建筑与城市规划学院'
                studentPhone='123456789'
                teacherName='李四'
                teacherPhone='123456789'
                success
                admin
                history
                auditor='张三1234678999999'
            />
             <HistoryCard
                title='204室'
                time={['15:50-17:50', '15:50-17:50']}
                name='张三'
                studentId='2021000000'
                department='建筑与城市规划学院'
                studentPhone='123456789'
                teacherName='李四'
                teacherPhone='123456789'
                fail
                history
                admin
                auditor='张三1234678999999'
            />
        </View>
    )
}