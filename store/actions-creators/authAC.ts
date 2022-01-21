import {Dispatch} from "react";
import axios from "axios";
import {authActionsTypes, authTypes} from "../../types/authTypes";

export const findEmail = (email: string) => {

    return async (dispatch: Dispatch<authTypes>) => {
        try {
            const response = await axios.post(`http://localhost:5000/auth/findEmail`, {email})
            dispatch({
                type: authActionsTypes.FIND_EMAIL,
                payload: response.data
            })
        } catch (e) {
            const error = JSON.parse(e.request.responseText).message[0]


            dispatch({
                type: authActionsTypes.FIND_EMAIL_ERROR,
                payload: error
            })
        }
    }
}
export const matchPasswords = (password1: string, password2: string, setActiveStep) => {
    return async (dispatch: Dispatch<authTypes>) => {
        try {
            const response = await axios.post(`http://localhost:5000/auth/isPasswordMatch`, {password1, password2})
            dispatch({
                type: authActionsTypes.AVATAR_IS_OK,
                payload: response.data
            })
            setActiveStep(2)
        } catch (e) {
            const error = JSON.parse(e.request.responseText).message[0]
            dispatch({
                type: authActionsTypes.ERROR,
                payload: error
            })
            setTimeout(async () => {
                dispatch({
                    type: authActionsTypes.ERROR,
                    payload: null
                })
            }, 2000)
        }
    }
}
export const isAvatarAPicture = (picture, emailText, password1, router) => {
    return async (dispatch: Dispatch<authTypes>) => {
        try {
            const formData = new FormData();
            formData.append("avatar", picture)
            let response = await axios.post('http://localhost:5000/auth/isAvatarAPicture', formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            )
            try {
                const formData = new FormData();
                formData.append("avatar", picture)
                formData.append("email", String(emailText))
                formData.append("password", String(password1.value))

                let response = axios.post('http://localhost:5000/auth/registration', formData, {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    }
                )

                    .then(response => console.log(response.data))
                router.push('/')
            } catch (e) {
                const error = JSON.parse(e.request.responseText).message[0]
                dispatch({
                    type: authActionsTypes.ERROR,
                    payload: error
                })
                setTimeout(async () => {
                    dispatch({
                        type: authActionsTypes.ERROR,
                        payload: null
                    })
                }, 2000)
            }
        }catch (e) {
            const error = JSON.parse(e.request.responseText).message[0]
            dispatch({
                type: authActionsTypes.ERROR,
                payload: error
            })
            setTimeout(async () => {
                dispatch({
                    type: authActionsTypes.ERROR,
                    payload: null
                })
            }, 2000)
        }
    }
}


