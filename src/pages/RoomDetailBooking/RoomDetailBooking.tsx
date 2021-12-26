import { Button, Checkbox, CheckboxGroup, Image, Input, Text, View } from '@tarojs/components';
import { useState } from 'react';
import classNames from 'classnames';
import Taro from '@tarojs/taro';

import photo from '../../assets/images/204.png'


export default function RoomDetailBooking() {

    let firstDay = `${new Date().getMonth()+1}月${new Date().getDate()}日`
    let secondDay = `${(new Date(new Date().getTime() + 24*60*60*1000)).getMonth()+1}月${(new Date(new Date().getTime() + 24*60*60*1000)).getDate()}日`
    let thirdDay = `${(new Date(new Date().getTime() + 48*60*60*1000)).getMonth()+1}月${(new Date(new Date().getTime() + 48*60*60*1000)).getDate()}日`

    const [DayOrder, setDayOrder] = useState(1)

    const [isUpdateForm, setIsUpdateForm] = useState(false)

    function BackToHome() {
        Taro.showLoading()
        Taro.hideLoading()

        Taro.navigateBack({
            delta: 2
        })
    }

    return (
        <View className=' h-screen overflow-hidden'>
            <Image src={photo} mode='aspectFill' className='absolute right-0 top-5 w-70 h-58 shadow-2xl'></Image>
            <Text className=' text-6xl absolute right-7 top-70 font-bold'>204室</Text>
            <View className=' text-purple-600 font-semibold text-xl relative top-93 left-9'>相关介绍：</View>
            <View className=' font-semibold text-xl relative top-98 mx-9 leading-7'>22座，有两列四排双人座桌椅和六个单人座沙发，配有投影仪，可供自习和中小型课演示。</View>
            <View className=' bg-gradient-to-b from-bottomColor to-topColor absolute rounded-3xl top-160 w-screen h-200'>
            <View className=' w-24 font-bold mx-auto relative top-2 text-black text-2xl'>时间选择</View>
            <View className='flex w-screen absolute top-12'>
                <View 
                    className={classNames('w-5 h-23 top-12 flex-1 mx-5 rounded-xl', { 'bg-green-400': DayOrder === 1, ' bg-gray-300': DayOrder !== 1})}
                    onClick={() => setDayOrder(1)}
                >
                    <View className=' m-5 font-bold text-xl text-white'>{firstDay}</View>
                </View>
                <View 
                    className={classNames('w-5 h-23 top-12 flex-1 mx-5 rounded-xl', { 'bg-green-400': DayOrder === 2, ' bg-gray-300': DayOrder !== 2})}
                    onClick={() => setDayOrder(2)}
                >
                    <View className=' m-5 font-bold text-xl text-white'>{secondDay}</View>
                </View>
                <View 
                    className={classNames('w-5 h-23 top-12 flex-1 mx-5 rounded-xl', { 'bg-green-400': DayOrder === 3, ' bg-gray-300': DayOrder !== 3})}
                    onClick={() => setDayOrder(3)}
                >
                    <View className=' m-5 font-bold text-xl text-white'>{thirdDay}</View>
                </View>
            </View>

            <CheckboxGroup className='relative top-40' onChange={(e) => console.log(e)}>
                <Checkbox
                    value='08:30-10:00'
                    className=' font-semibold float-left ml-6'
                >
                    08:30-10:00
                </Checkbox>

                <Checkbox
                    value='16:10-17:40'
                    className=' font-semibold float-right mr-6'
                >
                    16:10-17:40
                </Checkbox>

                <Checkbox
                    value='10:10-12:30'
                    className=' font-semibold float-left ml-6 mt-5'
                >
                    10:10-12:30
                </Checkbox>

                <Checkbox
                    value='17:50-18:50'
                    className=' font-semibold float-right mr-6 mt-5'
                >
                    17:50-18:50
                </Checkbox>

                <Checkbox
                    value='12:40-14:20'
                    className=' font-semibold float-left ml-6 mt-5'
                >
                    12:40-14:20
                </Checkbox>

                <Checkbox
                    value='19:00-20:20'
                    className=' font-semibold float-right mr-6 mt-5'
                >
                    19:00-20:20
                </Checkbox>

                <Checkbox
                    value='14:30-16:00'
                    className=' font-semibold float-left ml-6 mt-5'
                >
                    14:30-16:00
                </Checkbox>

                <Checkbox
                    value='20:30-21:50'
                    className=' font-semibold float-right mr-6 mt-5'
                >
                    20:30-21:50
                </Checkbox>

                <Checkbox
                    value='22:00-23:00'
                    className=' font-semibold float-right mr-6 mt-5'
                >
                    22:00-23:00
                </Checkbox>
            </CheckboxGroup>

            <View className=' w-screen absolute'>
                <View className=' w-24 font-bold mx-auto relative top-95 text-black text-2xl'>填写信息</View>
                <Text className=' text-blue-800 font-bold text-lg underline relative top-93 float-right right-9'>下载申请表</Text>

                <Input
                    placeholder='申请人姓名'
                    className='w-35 h-8 pl-3 bg-white absolute left-6 top-110 rounded-lg'
                />

                <Input
                    placeholder='申请人学号'
                    className='w-35 h-8 pl-3 bg-white top-110 absolute rounded-lg right-6'
                />

                <Input
                    placeholder='申请学院'
                    className='w-35 h-8 pl-3 bg-white absolute left-6 top-123 rounded-lg'
                />

                <Input
                    placeholder='申请单位名称'
                    className='w-35 h-8 pl-3 bg-white top-123 absolute rounded-lg right-6'
                />

                <Input
                    placeholder='联系电话'
                    className='w-35 h-8 pl-3 bg-white absolute left-6 top-136 rounded-lg'
                />

                <Input
                    placeholder='负责老师姓名'
                    className='w-35 h-8 pl-3 bg-white top-136 absolute rounded-lg right-6'
                />

                <Input
                    placeholder='负责老师电话'
                    className='w-35 h-8 pl-3 bg-white absolute left-6 top-149 rounded-lg'
                />

                { !isUpdateForm ?
                    <Button
                        className='w-38 h-8 bg-yellow-200 absolute right-6 top-149 rounded-lg font-bold text-lg'
                        onClick={() => setIsUpdateForm(true)}
                    >
                        上传申请表
                    </Button> :
                    <Button
                        className='w-38 h-8 bg-green-300 absolute right-6 top-149 rounded-lg font-medium text-lg'
                    >
                        已上传申请表
                    </Button>
                }

                <View className='w-screen absolute'>
                    <Button
                        className='mx-auto w-48 h-12 py-2 bg-purple-600 relative top-160 rounded-xl font-bold text-black text-xl shadow-2xl items-center justify-center'
                        onClick={BackToHome}
                    >
                        提交
                    </Button>
                </View>
            </View>
            </View>
        </View>
    )
}