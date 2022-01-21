import {GanreActionsTypes, GanreState, GanreTypes} from "../../types/ganreTypes";

const initialState: GanreState = {
    ganres: null,
    error: '',
}
export const ganreReducer = (state: GanreState = initialState, action: GanreTypes) => {
    switch (action.type) {
        case GanreActionsTypes.FETCH_GANRES: {
            return {...state, ganres: action.payload, error:null}
        }
        case GanreActionsTypes.FETCH_GANRES_ERROR: {
            return {...state, error: action.payload, ganres:null}
        }
        default: return state
    }
}