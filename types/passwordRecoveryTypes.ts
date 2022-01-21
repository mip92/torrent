import {string} from "prop-types";

export enum passwordRecoveryTypes {
    PASSWORD_RECOVERY = "PASSWORD_RECOVERY",
    ERROR="ERROR",
    CHECK_CODE="CHECK_CODE",
    CHECK_PASSWORDS="CHECK_PASSWORDS"
}


interface passwordRecoveryAction {
    type: passwordRecoveryTypes.PASSWORD_RECOVERY ,
    payload: { email, password }
}
interface checkCodeRecoveryAction {
    type: passwordRecoveryTypes.CHECK_CODE,
    payload: boolean
}
interface checkPasswordRecoveryAction {
    type: passwordRecoveryTypes.CHECK_PASSWORDS,
    payload: string
}
interface Error {
    type: passwordRecoveryTypes.ERROR,
    payload: string
}
export interface passwordRecoveryState {
    email: string | null,
    error: string | null,
    checked : boolean,
    password: string | null
}

export type passwordRecoveryActionsTypes = passwordRecoveryAction | checkCodeRecoveryAction | checkPasswordRecoveryAction | Error