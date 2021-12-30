import { combineReducers } from 'redux'

import background from './background'

import {
    SET_USEROPENID,
    SET_ISADMIN,
    SET_ISSUPERADMIN,
    SET_NICKNAME,
    SET_REFRESHROOM
} from '../constants'

const INITIAL_STATE = {
    openid: '',
    admin: false,
    superAdmin: false,
    refreshRoom : function() {}
}

function index(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SET_USEROPENID:
            const { openid } = action.payload
            return { ...state, openid }
        case SET_ISADMIN:
            const { admin } = action.payload
            return { ...state, admin }
        case SET_ISSUPERADMIN:
            const { superAdmin } = action.payload
            return { ...state, superAdmin }
        case SET_NICKNAME:
            const { nickName } = action.payload
            return { ...state, nickName}
        case SET_REFRESHROOM:
            const { refreshRoom } = action.payload
            return { ...state, refreshRoom }
        default: 
            return state
    }
}

export default combineReducers({
    index, background
})