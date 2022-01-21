import {authActionsTypes, authState, authTypes} from "../../types/authTypes";

const initialState: authState = {
    email: null,
    error: '',
    avatar: null,
}

export const authReducer = (state: authState = initialState, action: authTypes) => {
    switch (action.type) {
        /*case authActionsTypes.REGISTRATION {
            return {torrents: action.payload, error: ''}
        }*/
        case authActionsTypes.FIND_EMAIL: {
            return {...state, email: action.payload, error:null}
        }
        case authActionsTypes.FIND_EMAIL_ERROR: {
            return {...state, error: action.payload, email: null}
        }
        case authActionsTypes.PASSWORDS_MATCH: {
            return {...state, password:action.payload, error: null}
        }
        case authActionsTypes.ERROR: {
            return {...state, error: action.payload}
        }
        case authActionsTypes.AVATAR_IS_OK: {
            return {...state, avatar:action.payload, error: null}
        }
        default: return state
    }
}