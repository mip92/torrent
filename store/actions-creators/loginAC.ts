import {Dispatch} from "react";
import axios from "axios";

import {loginActionsTypes, loginTypes, userType} from "../../types/loginTypes";
import $api from "../../http";


export const loginUser = (email: string, password: string)=> {
    return async (dispatch: Dispatch<loginTypes>) => {
        try {
            const response = await $api.post<userType>('auth/login', {
                    email,
                    password,
                }
            )
            dispatch({
                type: loginActionsTypes.LOGIN,
                payload: response.data
            })
            localStorage.setItem('token', response.data.accessToken)
        } catch (e) {
            const error = JSON.parse(e.request.responseText).message[0]
            dispatch({
                type: loginActionsTypes.ERROR,
                payload: error
            })
            console.log(error)
        }
    }
}
export const logoutUser = ()=> {
    return async (dispatch: Dispatch<loginTypes>) => {
        try {
            await $api.post<userType>('/auth/logout')
            dispatch({
                type: loginActionsTypes.LOGOUT,
            })
            localStorage.removeItem('token')
        } catch (e) {
            const error = JSON.parse(e.request.responseText).message[0]
            dispatch({
                type: loginActionsTypes.ERROR,
                payload: error
            })
            console.log(error)
        }
    }
}

