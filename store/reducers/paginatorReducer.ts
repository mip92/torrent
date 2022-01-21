import {paginatorActionsTypes, paginatorState, paginatorTypes} from "../../types/paginatorTypes";

const initialState: paginatorState = {
    offset: 0,
    limit: 10,
    ganre: 10000,
}

export const paginatorReducer = (state: paginatorState = initialState, action: paginatorTypes) => {
    switch (action.type) {
        case paginatorActionsTypes.SET_OFFSET: {
            return {...state, offset: action.payload}
        }
        case paginatorActionsTypes.SET_LIMIT: {
            return {...state, limit: action.payload}
        }
        case paginatorActionsTypes.SET_GANRE: {
            return {...state, ganre: action.payload}
        }
        case paginatorActionsTypes.SET_OFFSET_LIMIT_GANRE: {
            return {...state,offset: action.offset, limit:action.limit, ganre: action.ganre}
        }
        default: return state
    }
}