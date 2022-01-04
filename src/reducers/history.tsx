import { SET_REFRESHHISTORY, SET_REFRESHPAGE, SET_REFRESHDATA } from '../constants';

const INITIAL_STATE = {
    refreshHistory : function() {},
    refreshPage: function() {},
    refreshData: function() {}
}

export default function background(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SET_REFRESHHISTORY:
            const { refreshHistory } = action.payload
            return { ...state, refreshHistory }
        case SET_REFRESHPAGE:
            const { refreshPage } = action.payload
            return { ...state, refreshPage }
        case SET_REFRESHDATA:
            const { refreshData } = action.payload
            return { ...state, refreshData }
        default: 
            return state
    }
}