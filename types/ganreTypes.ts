import {string} from "prop-types";
export enum GanreActionsTypes{
    FETCH_GANRES="FETCH_GANRES",
    FETCH_GANRES_ERROR="FETCH_GANRES_ERROR"
}

export interface ganreType{
    id: number,
    value: string,
    description: string,
    GanreLogo: string,
}

interface FetchGanreAction{
    type: GanreActionsTypes.FETCH_GANRES,
    payload: ganreType[],
}

interface FetchGanreError{
    type:GanreActionsTypes.FETCH_GANRES_ERROR
    payload:string
}

export interface GanreState{
    ganres: ganreType[] | null,
    error: string,
}

export type GanreTypes = FetchGanreAction | FetchGanreError