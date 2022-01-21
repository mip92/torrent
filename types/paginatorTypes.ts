import {string} from "prop-types";

export enum paginatorActionsTypes {
    SET_OFFSET = "SET_OFFSET",
    SET_LIMIT = "SET_LIMIT",
    SET_GANRE = "SET_GANRE",
    SET_OFFSET_LIMIT_GANRE="SET_OFFSET_LIMIT_GANRE"
}


interface setOffsetAction {
    type: paginatorActionsTypes.SET_OFFSET,
    payload: string
}

interface setlimitAction {
    type: paginatorActionsTypes.SET_LIMIT,
    payload: string
}

interface setGanreAction {
    type: paginatorActionsTypes.SET_GANRE,
    payload: string
}
interface setOffsetLimitGanreAction {
    type: paginatorActionsTypes.SET_OFFSET_LIMIT_GANRE,
    offset: string,
    limit: string,
    ganre: string
}

export interface paginatorState {
    offset: number,
    limit: number,
    ganre: number,
}

export type paginatorTypes = setOffsetLimitGanreAction | setGanreAction | setlimitAction | setOffsetAction