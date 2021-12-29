import { combineReducers } from 'redux'

import background from './background'

import {
    SET_USERINFO,
    SET_REFRESHROOM
} from '../constants'

const INITIAL_STATE = {
    userInfo : {},
    refreshRoom : function() {}
}

function index(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SET_USERINFO:
            const { userInfo } = action.payload
            return { ...state, userInfo }
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