import {string} from "prop-types";

export enum loginActionsTypes {
    LOGIN="LOGIN",
    ERROR = "ERROR",
    LOGOUT="LOGOUT"
}

export interface userType {
    accessToken: string | null,
    refreshToken: string | null,
    userId: number | null,
    email: string | null,
    isActivated: boolean,
    userAvatar: string | null,
}

interface LoginAction {
    type: loginActionsTypes.LOGIN,
    payload: {accessToken,
        refreshToken,
        userId,
        email,
        isActivated,
        userAvatar}
}
interface LogoutAction {
    type: loginActionsTypes.LOGOUT,
}

interface Error {
    type: loginActionsTypes.ERROR,
    payload: any
}


export interface loginState {
    user: null | userType,
    error : null | string
}

export type loginTypes =LoginAction| Error | LogoutAction