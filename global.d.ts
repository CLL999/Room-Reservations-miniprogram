/// <reference path="node_modules/@tarojs/plugin-platform-weapp/types/shims-weapp.d.ts" />

declare module '*.png';
declare module '*.gif';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';
declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.styl';

declare namespace NodeJS {
    interface ProcessEnv {
        TARO_ENV: 'weapp' | 'swan' | 'alipay' | 'h5' | 'rn' | 'tt' | 'quickapp' | 'qq' | 'jd'
    }
}

interface historyItemType {
    _id: string
    room: string
    time: Array<string>
    student: string
    id: string
    department: string
    studentPhone: string
    teacher: string
    teacherPhone: string
    unit: string
    date: string
    submitDate: string
    admin?: any
    background?: any
    history?: any
    auditor?: string
    sheet?: string
    state?: string
}

interface userInfoType {
    admin?: boolean
    avatar: string
    nickName: string
    openid: string
    superAdmin?: boolean
}

interface roomType {
    name: string
    content: string
    photoUrl: string
    _id: string
}

interface timeType {
    date: string
    time: Array<string>
}