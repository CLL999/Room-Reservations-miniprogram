import Taro from '@tarojs/taro';
import { Image, View } from '@tarojs/components';
import classNames from 'classnames';

import reject from '../../assets/images/reject.png'
import agree from '../../assets/images/agree.png'



export default function HistoryCard(props) {

    function toSuggest() {
        Taro.navigateTo({
            url: `../Suggest/Suggest?data=${JSON.stringify(props)}`
        })
    }

    function previewGuide() {
        Taro.showLoading()

        Taro.cloud.callFunction({
            name: 'feedGuide',
            data: { _id : props._id }
        }).then((res:any) => 
            {
                console.log(res.result.data, "数据")
                Taro.navigateTo({
                    url: `../Suggest/Suggest?data=${JSON.stringify(res.result.data)}&user=true`
                })
            })
    }

    function toPass() {
        Taro.showLoading()
        Taro.cloud.callFunction({
            name: 'pass',
            data: {
                auditor: props.auditor,
                _id: props._id
            }
        }).then(async() => 
            {
                Taro.hideLoading()
                Taro.showToast({
                    title: '批准成功',
                    icon: 'success',
                    duration: 1000
                })
                Taro.cloud.callFunction({
                    name: 'sendApplicant',
                    data: {
                        openid: props.applicantOpenid,
                        res: '申请成功',
                        room: props.room,
                        time: props.time[0].date,
                        tips: '请提前10分钟到场'
                    }
                }).then(res => console.log(res))
                await Taro.cloud.callFunction({ name: 'feedPhones' })
                .then((res: any) => {
                    let content = `\r\n${props.time.map((item: any) => `${item.date}\r\n${item.time.join().replace(/,/g,' ')}`)}`
                    content = content.replace(/,/g, '\r\n')                              
                    res.result.data.map(async (item) => {
                        await Taro.cloud.callFunction({ 
                                            name: 'sendsms',
                                            data: {
                                                mobile: item.phone,
                                                nationcode: '86',
                                                time: content,
                                                place: props.room
                                            }})
                                        .then(res => console.log(res))
                    })
                })
                setTimeout(() => props.refresh(true), 1000)
            })
    }

    function downloadSheet() {
        Taro.showLoading()

        Taro.cloud.downloadFile({ fileID: props.sheet })
                  .then(res => {
                            Taro.hideLoading()
                            Taro.openDocument({
                                filePath: res.tempFilePath,
                                showMenu: true
                            })})
    }

    return (
        <View className=' w-screen min-h-80'>
            <View className=' bg-white rounded-2xl w-70 mx-auto min-h-75 shadow-2xl'>
                <View className='h-3'></View>
                <View className=' w-60 min-h-60 mx-auto'>
                    <View className=' font-semibold text-4xl text-black w-full h-11'>{props.room}</View>
                    {/* <View className=' font-semibold text-3xl w-full h-10 text-center'>{props.date ? props.date.slice(5) : ''}</View> */}
                    { props.time.map((item, index) => 
                            <View key={index} className={classNames({' box0': index === 0 || index === 2 , ' box1': index === 1 || index === 3})}>
                                <View className=' font-medium text-3xl w-full h-10 text-left'>{item.date.slice(5)}</View>
                                {   item.time.map((ele, index) => 
                                    <View key={index} className=' font-semibold text-3xl text-black w-full h-11 text-center'>{ele}</View> )
                                }
                            </View>
                        )
                    }
                    <View className='w-full '>
                        <View className=' h-3'></View>
                        <View className=' font-medium text-lg h-7 w-full truncate'>{`申请人姓名：${props.student}`}</View>
                        <View className=' font-medium text-lg h-7 w-full truncate'>{`申请人学号：${props.id}`}</View>
                        <View className=' font-medium text-lg h-7 w-full truncate'>{`申请学院：${props.department}`}</View>
                        <View className=' font-medium text-lg h-7 w-full truncate'>{`申请单位名称：${props.unit}`}</View>
                        <View className=' font-medium text-lg h-7 w-full truncate'>{`联系电话： ${props.studentPhone}`}</View>
                        <View className=' font-medium text-lg h-7 w-full truncate'>{`负责老师： ${props.teacher}`}</View>
                        <View className=' font-medium text-lg h-7 w-full truncate'>{`联系电话： ${props.teacherPhone}`}</View>
                        <View className=' font-medium text-lg h-7 w-full truncate'>{`申请提交日期：${props.submitDate}`}</View>
                    </View>
                </View>
                <View className='h-13 w-60 mx-auto'>
                    {   props.admin ? props.background ?
                        <View className='w-full h-full'>
                            <View 
                                className='underline font-semibold text-xl float-left text-blue-300 my-2'
                                onClick={downloadSheet}
                            >
                                下载申请表
                            </View>
                            <View 
                                className=' w-10 h-10 float-right bg-orange-600 right-12 relative top-1 rounded-full'
                                onClick={toSuggest}
                            >
                                <Image
                                    src={reject}
                                    className=' w-6 h-6 m-2'
                                />
                            </View>
                            <View 
                                className=' w-10 h-10 float-right bg-green-400 relative -right-10 top-1 rounded-full'
                                onClick={toPass}
                            >
                                <Image
                                    src={agree}
                                    className=' w-6 h-6 m-2'
                                />
                            </View>
                        </View> :
                        <View className='w-full h-full'>
                            {   props.state === 'success' ?
                                <View className='h-9 bg-green-400 w-24 my-2 float-right text-center font-medium text-xl'>已通过</View> :
                                <View className='h-9 rejectColor w-24 my-2 float-right text-center font-semibold text-xl'>未通过</View>
                            }
                        <View className='font-semibold text-xl float-left mt-2 mb-1'>审批人：</View>
                        <View className='font-semibold text-x1 float-left truncate w-32'>{props.auditor}</View>
                        </View> :
                        props.state === 'waiting' ? 
                        <View className='h-9 bg-yellow-300 w-24 my-2 float-right text-center font-medium text-xl'>审核中</View> :
                        props.state === 'success' ?
                        <View className='h-9 bg-green-400 w-24 my-2 float-right text-center font-medium text-xl'>已通过</View> :
                        <View className='w-full h-full'>
                            <View className='h-9 rejectColor w-24 my-2 float-right text-center font-semibold text-xl'>未通过</View>
                            <View 
                                className='underline font-semibold text-xl float-left text-blue-300 my-2'
                                onClick={previewGuide}
                            >
                                查看指引
                            </View>
                        </View>
                    }
                </View>
                <View className='h-4'></View>
            </View>
            <View className='h-5'></View>
        </View>
    )
}