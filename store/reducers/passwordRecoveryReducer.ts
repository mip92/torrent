import {authActionsTypes, authState, authTypes} from "../../types/authTypes";
import {
    passwordRecoveryActionsTypes,
    passwordRecoveryState,
    passwordRecoveryTypes
} from "../../types/passwordRecoveryTypes";

const initialState: passwordRecoveryState = {
    email: null,
    error: null,
    checked: false,
    password: null
}

export const passwordRecoveryReducer = (state: passwordRecoveryState = initialState, action: passwordRecoveryActionsTypes) => {
    switch (action.type) {
        case passwordRecoveryTypes.PASSWORD_RECOVERY: {
            return {...state, email: action.payload, error:null}
        }
        case passwordRecoveryTypes.CHECK_CODE: {
            return {...state, checked: action.payload, error:null}
        }
        case passwordRecoveryTypes.CHECK_PASSWORDS: {
            return {...state, password: action.payload, error:null}
        }
        case passwordRecoveryTypes.ERROR: {
            return {...state, error: action.payload}
        }
        default: return state
    }
}