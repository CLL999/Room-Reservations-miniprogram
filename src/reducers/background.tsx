import { SET_REFRESHBACKGROUND } from '../constants';

const INITIAL_STATE = {
    refreshBackground : function() {}
}

export default function background(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SET_REFRESHBACKGROUND:
            const { refreshBackground } = action.payload
            return { ...state, refreshBackground }
        default: 
            return state
    }
}