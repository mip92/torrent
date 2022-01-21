import {Dispatch} from "react";
import {TorrentActionsTypes, TorrentTypes} from "../../types/torrentTypes";
import axios from "axios";
import {authActionsTypes} from "../../types/authTypes";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {wrapper} from "../index";
import {store} from "next/dist/build/output/store";


export const fetchTorrent = (offset: string, limit: string, ganre?:string| null) => {
    return async (dispatch: Dispatch<TorrentTypes>) => {
        try {
            const response = await axios.get(`http://localhost:5000/torrent?offset=${offset}&limit=${limit}&ganre=${ganre}`)
            dispatch({
                type: TorrentActionsTypes.FETCH_TORRENTS,
                torrents: response.data.torrents,
                fullLength: response.data.torrentsLength,
            })
        } catch (e) {
            dispatch({
                type: TorrentActionsTypes.FETCH_TORRENTS_ERROR,
                payload: "Произошла ощибка при загрузки списка торрентов"
            })
        }
    }
}
/*
export const getPaginationLength=(ganre?:number)=>{
    return async (dispatch: Dispatch<TorrentTypes>) => {
        try {
            const response = await axios.post(`http://localhost:5000/torrent/length/?ganre=${ganre}`)
            console.log(response.data)
            dispatch({
                type: TorrentActionsTypes.FETCH_TORRENTS_LENGTH,
                payload: response.data
            })
        } catch (e) {
            dispatch({
                type: TorrentActionsTypes.FETCH_TORRENTS_ERROR,
                payload: "Не могу узнать колличество торрентов"
            })
        }
    }
}
*/
