import {loginActionsTypes, loginState, loginTypes} from "../../types/loginTypes";


const initialState: loginState = {
    user: null,
    error: null
}

export const loginReducer = (state: loginState = initialState, action: loginTypes) => {
    switch (action.type) {
        case loginActionsTypes.LOGIN: {
            return {...state, user: action.payload, error:null}
        }
        case loginActionsTypes.LOGOUT: {
            console.log(1111111111)
            return {...state, user: null, error:null}
        }
        case loginActionsTypes.ERROR: {
            return {...state, error: action.payload}
        }

        default: return state
    }
}