import { Image, View } from '@tarojs/components'

import { HistoryCard } from '../../components'
import key from '../../assets/images/key.png'


export default function EditRoom() {

    return (
        <View className=' w-screen min-h-screen containerBackground'>
            <Image src={key} className=' w-36 h-36 relative float-right top-2 right-3'></Image>
            <View className='w-screen h-43'>
                <View className=' relative font-extrabold text-3xl left-17 top-8'>审批申请</View> 
            </View>
            <HistoryCard
                title='204室'
                time={['15:50-17:50', '15:50-17:50']}
                name='张三'
                studentId='2021000000'
                department='建筑与城市规划学院'
                studentPhone='123456789'
                teacherName='李四'
                teacherPhone='123456789'
                admin
                background
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
                admin
                background
            />
        </View>
    )
}