import { combineReducers } from 'redux'

import {
    SET_USERINFO
} from '../constants'

const INITIAL_STATE = {
    userInfo : {}
}

function index(state = INITIAL_STATE, action) {
    switch (action.type) {
        // case SET_AVATAR:
        //     const {avatar} = action.payload
        //     return {...state, avatar}
        // case SET_NICKNAME:
        //     const {nickName} = action.payload
        //     return {...state, nickName}
        // case SET_OPENID:
        //     const {openid} = action.payload
        //     return {...state, openid}
        case SET_USERINFO:
               const {userInfo} = action.payload
               return {...state, userInfo}
        default: 
            return state
    }
}

export default combineReducers({
    index
})