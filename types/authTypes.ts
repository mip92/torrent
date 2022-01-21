import {string} from "prop-types";

export enum authActionsTypes {
    REGISTRATION = "REGISTRATION",
    FIND_EMAIL = "FIND_EMAIL",
    FIND_EMAIL_ERROR = "FIND_EMAIL_ERROR",
    PASSWORDS_MATCH = "PASSWORDS_MATCH",
    ERROR = "ERROR",
    AVATAR_IS_OK='AVATAR_IS_OK',
}

export interface authType {
    id: number,
    name: string,
    description: string,
    picture: Array<string>,
    mainPicture: string,
    torrentDoc: string,
    view: number,
    updatedAt: string,
    createdAt: string,
    commentsId?: null | Array<string>
}

interface registrationAction {
    type: authActionsTypes.REGISTRATION,
    payload: { email, password }
}

interface findEmail {
    type: authActionsTypes.FIND_EMAIL,
    payload: { email }
}

interface passwordsMatch {
    type: authActionsTypes.PASSWORDS_MATCH,
    payload: string
}

interface avatarIsOK {
    type: authActionsTypes.AVATAR_IS_OK,
    payload: any
}

interface findEmailError {
    type: authActionsTypes.FIND_EMAIL_ERROR,
    payload: any
}

interface Error {
    type: authActionsTypes.ERROR,
    payload: any
}


export interface authState {
    email: string | null,
    error: string | null,
    avatar: any | null,
}

export type authTypes = registrationAction | findEmail | findEmailError | passwordsMatch | Error | avatarIsOK