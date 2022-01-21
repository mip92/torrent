import {Dispatch} from "react";
import axios from "axios";
import {authActionsTypes, authTypes} from "../../types/authTypes";
import {paginatorActionsTypes} from "../../types/paginatorTypes";

export const setOffset = (offset: number) => {
    return {
        type: paginatorActionsTypes.SET_OFFSET,
        payload: offset
    }
}
export const setLimit = (limit: number) => {
    return {
        type: paginatorActionsTypes.SET_LIMIT,
        payload: limit
    }
}
export const setGanre = (ganre: number) => {
    return {
        type: paginatorActionsTypes.SET_GANRE,
        payload: ganre
    }
}
export const setOffsetLimitGanre = ({offset, limit, ganre}) => {
    return {
        type: paginatorActionsTypes.SET_OFFSET_LIMIT_GANRE,
        offset, limit, ganre
    }
}

