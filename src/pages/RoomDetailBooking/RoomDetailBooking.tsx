import { Button, Checkbox, CheckboxGroup, Image, Input, Text, View } from '@tarojs/components';
import { useState } from 'react';
import classNames from 'classnames';
import Taro from '@tarojs/taro';

export default function RoomDetailBooking() {

    let photoUrl = 'cloud://cloud1-1gxif9p835c655f8.636c-cloud1-1gxif9p835c655f8-1308942285/204室.png'

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
            <Image src={photoUrl} mode='aspectFill' className='absolute right-0 top-5 w-70 h-58 shadow-2xl'></Image>
            <Text className=' text-6xl absolute right-7 top-70 font-bold'>204室</Text>
            <View className=' text-purple-600 font-semibold text-xl relative top-93 left-9'>相关介绍：</View>
            <View className=' font-semibold text-xl relative top-98 mx-9 leading-7'>22座，有两列四排双人座桌椅和六个单人座沙发，配有投影仪，可供自习和中小型课演示。</View>
            <View className=' bg-gradient-to-b from-bottomColor to-topColor absolute rounded-3xl top-160 w-screen h-200'>
                <View className='h-40 w-screen'>
                    <View className=' w-24 font-bold mx-auto relative top-2 text-black text-2xl'>时间选择</View>
                    <View className='h-30 w-screen flex'>
                        <View 
                            className={classNames('h-24 w-5 bg-gray-200 my-3 mx-5 flex-1 rounded-xl', {'primarybutton': DayOrder === 1 , ' bg-gray-300': DayOrder !== 1})} 
                            onClick={() => setDayOrder(1)}
                        >
                            <View className=' m-5 font-bold text-xl text-white'>{firstDay}</View>
                        </View>
                        <View 
                            className={classNames('h-24 w-5 bg-gray-200 my-3 mx-5 flex-1 rounded-xl', {'primarybutton': DayOrder === 2 , ' bg-gray-300': DayOrder !== 2})} 
                            onClick={() => setDayOrder(2)}
                        >
                            <View className=' m-5 font-bold text-xl text-white'>{secondDay}</View>
                        </View>
                        <View 
                            className={classNames('h-24 w-5 bg-gray-200 my-3 mx-5 flex-1 rounded-xl', {'primarybutton': DayOrder === 3 , ' bg-gray-300': DayOrder !== 3})} 
                            onClick={() => setDayOrder(3)}
                        >
                            <View className=' m-5 font-bold text-xl text-white'>{thirdDay}</View>
                        </View>
                    </View>
                </View>

                <View className='h-65 w-screen '>
                    <CheckboxGroup className='relative top-8' onChange={(e) => console.log(e)}>
                        <Checkbox
                            value='08:30-10:00'
                            className=' font-semibold float-left ml-6 '
                        >
                            08:30-10:00
                        </Checkbox>

                        <Checkbox
                            value='16:10-17:40'
                            className=' font-semibold float-right mr-6 '
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
                </View>

                <View className=' w-screen h-80 '>
                    <View className='w-screen h-16 '>
                        <View className=' w-24 font-bold mx-auto relative top-3 text-black text-2xl'>填写信息</View>
                        <Text className=' text-blue-800 font-bold text-lg underline relative float-right right-9'>下载申请表</Text>
                    </View>

                    <View className='w-screen h-12 '>
                        <Input
                            placeholder='申请人姓名'
                            className='w-35 h-8 pl-3 bg-white relative left-6 rounded-lg float-left'
                        />
                        <Input
                            placeholder='申请人学号'
                            className='w-35 h-8 pl-3 bg-white relative right-6 rounded-lg float-right'
                        />
                    </View>

                    <View className='w-screen h-12 '>
                        <Input
                            placeholder='申请学院'
                            className='w-35 h-8 pl-3 bg-white relative left-6 rounded-lg float-left'
                        />
                        <Input
                            placeholder='申请单位名称'
                            className='w-35 h-8 pl-3 bg-white relative right-6 rounded-lg float-right'
                        />
                    </View>

                    <View className='w-screen h-12 '>
                        <Input
                            placeholder='联系电话'
                            className='w-35 h-8 pl-3 bg-white relative left-6 rounded-lg float-left'
                        />
                        <Input
                            placeholder='负责老师姓名'
                            className='w-35 h-8 pl-3 bg-white relative right-6 rounded-lg float-right'
                        />
                    </View>

                    <View className='w-screen h-12 '>
                        <Input
                            placeholder='负责老师电话'
                            className='w-35 h-8 pl-3 bg-white relative left-6 rounded-lg float-left'
                        />
                        { !isUpdateForm ?
                            <Button
                                className='w-38 h-8 bg-yellow-200 relative right-6 rounded-lg font-bold text-lg float-right'
                                onClick={() => setIsUpdateForm(true)}
                            >
                                上传申请表
                            </Button> :
                            <Button
                                className='w-38 h-8 bg-green-300 relative right-6 rounded-lg font-medium text-lg float-right'
                            >
                                已上传申请表
                            </Button>
                        }
                    </View>

                    <View className='w-screen h-30'>
                        <Button
                            className='mx-auto w-48 h-12 py-2 purplebutton relative top-3 rounded-xl font-bold text-black text-xl shadow-2xl items-center justify-center'
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