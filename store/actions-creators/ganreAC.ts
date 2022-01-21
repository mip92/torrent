import {Dispatch} from "react";
import axios from "axios";
import {GanreActionsTypes, GanreTypes} from "../../types/ganreTypes";

export const fetchGanre = () => {

    return async (dispatch: Dispatch<GanreTypes>) => {
        try {
            const response = await axios.get(`http://localhost:5000/ganres`)
            dispatch({
                type: GanreActionsTypes.FETCH_GANRES,
                payload: response.data
            })
        } catch (e) {
            dispatch({
                type: GanreActionsTypes.FETCH_GANRES_ERROR,
                payload: "Произошла ошибка при загрузки списка жанров"
            })
        }
    }
}


export const fetchLogo = () => {
    return async (dispatch: Dispatch<GanreTypes>) => {
        try {
            const response = await axios.get(`http://localhost:5000/ganres`)
            dispatch({
                type: GanreActionsTypes.FETCH_GANRES,
                payload: response.data
            })
        } catch (e) {
            console.log(e)
            dispatch({
                type: GanreActionsTypes.FETCH_GANRES_ERROR,
                payload: "Произошла ощибка при загрузки списка жанров"
            })
        }
    }
}
