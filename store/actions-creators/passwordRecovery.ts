import {Dispatch} from "react";
import axios from "axios";
import {authActionsTypes, authTypes} from "../../types/authTypes";
import {passwordRecoveryActionsTypes, passwordRecoveryTypes} from "../../types/passwordRecoveryTypes";

export const passwordRecovery = (email: string, setActiveStep: (number)=>void) => {

    return async (dispatch: Dispatch<passwordRecoveryActionsTypes>) => {
        try {
            const response = await axios.post(`http://localhost:5000/auth/passwordRecovery`, {email})
            dispatch({
                type: passwordRecoveryTypes.PASSWORD_RECOVERY,
                payload: response.data
            })
            setActiveStep(prev => prev + 1)
        } catch (e) {
            const error = JSON.parse(e.request.responseText).message[0]
            dispatch({
                type: passwordRecoveryTypes.ERROR,
                payload: error
            })
            setTimeout(async () => {
                dispatch({
                    type: passwordRecoveryTypes.ERROR,
                    payload: null
                })
            }, 2000)
        }
    }
}
export const checkCode = (email: string, code: string, setActiveStep: (number)=>void) => {

    return async (dispatch: Dispatch<passwordRecoveryActionsTypes>) => {
        try {
            const response = await axios.post(`http://localhost:5000/auth/checkCode`, {email, code})
            dispatch({
                type: passwordRecoveryTypes.CHECK_CODE,
                payload: true
            })
            setActiveStep(prev => prev + 1)
        } catch (e) {
            const error = JSON.parse(e.request.responseText).message[0]
            dispatch({
                type: passwordRecoveryTypes.ERROR,
                payload: error
            })
            setTimeout(async () => {
                dispatch({
                    type: passwordRecoveryTypes.ERROR,
                    payload: null
                })
            }, 2000)
        }
    }
}
export const newPassword = (password1: string, password2: string, email:string, code: string, router) => {
    return async (dispatch: Dispatch<passwordRecoveryActionsTypes>) => {
        try {
            await axios.put(`http://localhost:5000/auth/newPassword`, {password1, password2, email, code})
            router.push('/')
        } catch (e) {
            const error = JSON.parse(e.request.responseText).message[0]
            dispatch({
                type: passwordRecoveryTypes.ERROR,
                payload: error
            })
            setTimeout(async () => {
                dispatch({
                    type: passwordRecoveryTypes.ERROR,
                    payload: null
                })
            }, 2000)
        }
    }
}

