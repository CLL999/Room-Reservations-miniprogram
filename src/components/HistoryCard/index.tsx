import { Image, View } from '@tarojs/components';

import reject from '../../assets/images/reject.png'
import agree from '../../assets/images/agree.png'

export default function HistoryCard(props) {

    return (
        <View className=' w-screen min-h-80'>
            <View className=' bg-white rounded-2xl w-70 mx-auto min-h-75 shadow-2xl'>
                <View className='h-3'></View>
                <View className=' w-60 min-h-60 mx-auto'>
                    <View className=' font-semibold text-4xl text-black w-full h-11'>{props.title}</View>
                    { props.time.map((item, index) => 
                       <View key={index} className=' font-semibold text-4xl text-black w-full h-11 text-center'>{item}</View> )
                    }
                    <View className='w-full '>
                        <View className=' h-3'></View>
                        <View className=' font-medium text-lg h-7 w-full'>{`${props.name}  ${props.studentId}`}</View>
                        <View className=' font-medium text-lg h-7 w-full'>{props.department}</View>
                        <View className=' font-medium text-lg h-7 w-full'>{`联系电话： ${props.studentPhone}`}</View>
                        <View className=' font-medium text-lg h-7 w-full'>{`负责老师： ${props.teacherName}`}</View>
                        <View className=' font-medium text-lg h-7 w-full'>{`联系电话： ${props.teacherPhone}`}</View>
                    </View>
                </View>
                <View className='h-13 w-60 mx-auto'>
                    {   props.admin ? props.background ?
                        <View className='w-full h-full'>
                            <View className='underline font-semibold text-xl float-left text-blue-300 my-2'>下载申请表</View>
                            <View className=' w-10 h-10 float-right bg-orange-600 right-12 relative top-1 rounded-full'>
                                <Image
                                    src={reject}
                                    className=' w-6 h-6 m-2'
                                />
                            </View>
                            <View className=' w-10 h-10 float-right bg-green-400 relative -right-10 top-1 rounded-full'>
                                <Image
                                    src={agree}
                                    className=' w-6 h-6 m-2'
                                />
                            </View>
                        </View> :
                        <View className='w-full h-full'>
                            {   props.success ?
                                <View className='h-9 bg-green-400 w-24 my-2 float-right text-center font-medium text-xl'>已通过</View> :
                                <View className='h-9 bg-orange-700 w-24 my-2 float-right text-center font-semibold text-xl'>未通过</View>
                            }
                        <View className='font-semibold text-xl float-left mt-2 mb-1'>审批人：</View>
                        <View className='font-semibold text-x1 float-left truncate w-32'>{props.auditor}</View>
                        </View> :
                        props.waiting ? 
                        <View className='h-9 bg-yellow-300 w-24 my-2 float-right text-center font-medium text-xl'>审核中</View> :
                        props.success ?
                        <View className='h-9 bg-green-400 w-24 my-2 float-right text-center font-medium text-xl'>已通过</View> :
                        <View className='w-full h-full'>
                            <View className='h-9 bg-orange-700 w-24 my-2 float-right text-center font-semibold text-xl'>未通过</View>
                            <View className='underline font-semibold text-xl float-left text-blue-300 my-2'>查看指引</View>
                        </View>
                    }
                </View>
                <View className='h-4'></View>
            </View>
            <View className='h-5'></View>
        </View>
    )
}