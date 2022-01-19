import Taro from '@tarojs/taro';
import { useState } from 'react';
import { Image, View } from '@tarojs/components';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

import reject from '../../assets/images/reject.png'
import agree from '../../assets/images/agree.png'
import deleteIcon from '../../assets/images/delete.png'
import withdrawIcon from '../../assets/images/withdraw.png'

export default function HistoryCard(props) {

    const [hide, setHide] = useState(true)
    const [withdraw] = useState(() => {
        let firstDate = props.time[0].date.replace('年', '-').replace('月','-').slice(0,-1)
        let firstTime = new Date(firstDate).getTime()
        let localTime = +new Date(new Date().toLocaleDateString()).getTime()
        let flag = true
        if (localTime > firstTime) 
            flag = false
        else if (localTime === firstTime) {
            let tmp = localTime + parseInt(props.time[0].time[0].slice(0,2)) * 60 * 60 * 1000
            if (new Date(tmp).getHours() < new Date(+ new Date()).getHours() + 4)
                flag = false
        }
        return flag
    })

    const history = useSelector((state: any) => state.history)

    function toSuggest() {
        if (props.bounce) {
            Taro.showModal({
                title: '注意',
                content: '请先添加您的手机再继续审批',
                showCancel: false
            })
            return 
        }
        Taro.navigateTo({
            url: `../Suggest/Suggest?data=${JSON.stringify(props)}`
        })
    }

    function previewGuide() {
        Taro.showLoading({ title: '加载中'})

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
        if (props.bounce) {
            Taro.showModal({
                title: '注意',
                content: '请先添加您的手机再继续审批',
                showCancel: false
            })
            return 
        }
        Taro.showLoading({ title: '加载中'})
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
                await Taro.cloud.callFunction({
                        name: 'sendApplicant',
                        data: {
                            openid: props.applicantOpenid,
                            res: '申请成功',
                            room: props.room,
                            time: props.time[0].date,
                            tips: '请提前10分钟到场',
                            phone: props.showPhone
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
                console.log('studentPhone', props.studentPhone)
                await Taro.cloud.callFunction({ 
                                    name: 'resMsg',
                                    data: {
                                        mobile: props.studentPhone,
                                        nationcode: '86',
                                        res: '通过'
                                    }})
                                .then(res => console.log(res, '调用结果！'))
                setTimeout(() => props.refresh(true), 1000)
            })
    }

    function downloadSheet() {
        Taro.showLoading({ title: '加载中'})

        Taro.cloud.downloadFile({ fileID: props.sheet })
                  .then(res => {
                            Taro.hideLoading()
                            Taro.openDocument({
                                filePath: res.tempFilePath,
                                showMenu: true
                            })})
    }

    function deleteRecord() {
        if (props.bounce) {
            Taro.showModal({
                title: '注意',
                content: '请先添加您的手机再继续审批',
                showCancel: false
            })
            return 
        }
        Taro.showLoading({ title: '加载中'})
        Taro.cloud.callFunction({ name: 'removeRecord', data: { _id: props._id} })
                  .then(async () => {
                      Taro.hideLoading()
                      Taro.showToast({
                          title: '删除成功',
                          duration: 500
                      })
                      await history.refreshData([])
                      await history.refreshPage(0)
                      await history.refreshHistory(true)
                  })
    }

    function withdrawHandle() {
        Taro.showModal({
            title: '提示',
            content: '确定要撤回此条申请吗?',
            showCancel: false
        }).then(async res => {
            if (res.confirm) {
                Taro.showLoading({ title: '加载中'})
                await Taro.cloud.callFunction({
                        name: 'removeRecord',
                        data: {
                            _id: props._id
                        }
                    })
                if (props.state === 'success') {
                    await Taro.cloud.callFunction({ name: 'feedPhones' })
                                    .then((res: any) => {
                                        let content = `\r\n${props.time.map((item: any) => `${item.date}\r\n${item.time.join().replace(/,/g,' ')}`)}`
                                        content = content.replace(/,/g, '\r\n')                              
                                        res.result.data.map(async (item) => {
                                            await Taro.cloud.callFunction({ 
                                                                name: 'withdraw',
                                                                data: {
                                                                    mobile: item.phone,
                                                                    nationcode: '86',
                                                                    time: content,
                                                                    place: props.room
                                                                }})
                                                            .then(res => console.log(res))
                                        })
                                    })
                }
                Taro.hideLoading()
                Taro.showToast({
                    title: '撤回成功',
                    duration: 1000
                })
                await history.refreshData([])
                await history.refreshPage(0)
                await history.refreshHistory(true)
            }
        })
    }

    function handleDelete() {
        if (!props.admin)
            return 
        setHide(!hide)
    }

    return (
        <View className=' w-screen min-h-80' onLongPress={handleDelete}>
            <View className=' bg-white rounded-2xl w-70 mx-auto min-h-75 shadow-2xl'>
                <View className='h-3'></View>
                <View className=' w-60 min-h-60 mx-auto'>
                    <View className=' font-semibold text-4xl text-black w-full h-11'>{props.room}</View>
                    <View 
                    className={classNames('relative rounded-full -top-11 -right-2 float-right', { 'w-10 h-10 bg-orange-600 transition duration-500 ease-out' : !hide, 'w-0 h-0 bg-white transition ease-in duration-500' : hide })}
                    onClick={deleteRecord}
                    >
                        <Image
                            src={deleteIcon}
                            className={classNames({'w-6 h-6 m-2 transition ease-out duration-500' : !hide , 'w-0 h-0 transition duration-500 ease-in': hide})}
                        />
                    </View>
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
                            { props.state === 'success' && 
                                <View 
                                    className=' w-8 h-8 float-right bg-orange-600 right-3 relative top-2 rounded-full'
                                    onClick={toSuggest}
                                >
                                    <Image
                                        src={reject}
                                        className=' w-4 h-4 m-2'
                                    />
                                </View>
                            }
                        <View className='font-semibold text-xl float-left mt-2 mb-1'>审批人：</View>
                        <View className='font-semibold text-x1 float-left truncate w-32'>{props.auditor}</View>
                        </View> :
                        props.state === 'waiting' ? 
                        <View>
                            {   withdraw ?
                                <View 
                                    className=' bg-yellow-200 w-10 h-10 rounded-full relative bottom-0 float-left top-2'
                                    onClick={withdrawHandle}
                                >
                                    <Image
                                        src={withdrawIcon}
                                        className=' w-6 h-6 m-2 absolute'
                                    />
                                </View> : ''
                            }
                            <View className='h-9 bg-yellow-300 w-24 my-2 float-right text-center font-medium text-xl'>审核中</View> 
                        </View> :
                        props.state === 'success' ?
                        <View>
                            {   withdraw ?
                                <View 
                                    className=' bg-yellow-200 w-10 h-10 rounded-full relative bottom-0 float-left top-2'
                                    onClick={withdrawHandle}
                                >
                                    <Image
                                        src={withdrawIcon}
                                        className=' w-6 h-6 m-2 absolute'
                                    />
                                </View> : ''
                            }
                            <View className='h-9 bg-green-400 w-24 my-2 float-right text-center font-medium text-xl'>已通过</View>
                        </View> :
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