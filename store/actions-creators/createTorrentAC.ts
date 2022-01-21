import {Dispatch} from "react";
import axios from "axios";
import {CreateTorrentActionsTypes, CreateTorrentTypes} from "../../types/createTorrentTypes";
import {GanreActionsTypes, GanreTypes} from "../../types/ganreTypes";

export const createTorrent = (name: string, description: string, picture: File[], torrent: File, mainPicture: File, setActiveStep) => {
    return async (dispatch: Dispatch<CreateTorrentTypes>) => {

        try {
            let formData = new FormData;

            if (picture) {
                for (let i = 0; i < picture.length; i++) {
                    formData.append(`picture${i}`, picture[i]);
                }
            }
            formData.append("name", name);
            formData.append("description", description);
            formData.append("torrent", torrent);
            formData.append("mainPicture", mainPicture);
            const response = await axios.post(`http://localhost:5000/torrent`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            dispatch({
                type: CreateTorrentActionsTypes.CREATE_TORRENT,
                torrent: response.data,
            })
            setActiveStep(prev => prev + 1)
        } catch (e) {
            dispatch({
                type: CreateTorrentActionsTypes.CREATE_TORRENT_ERROR,
                payload: e.request ? JSON.parse(e.request.responseText).message[0] : e
            })
            setTimeout(async () => {
                dispatch({
                    type: CreateTorrentActionsTypes.CREATE_TORRENT_ERROR,
                    payload: null
                })
            }, 2000)
        }
    }
}
export const reducerForm = (obj) => {
    let pic = null
    if (obj.picture.length == 4) pic = obj.picture
    return {
        type: CreateTorrentActionsTypes.REDUCER_FORM,
        name: obj.name,
        description: obj.description,
        picture: pic,
        torrent: obj.torrent,
        mainPicture: obj.mainPicture
    }
}
export const reducerGanres = (state) => {
    return {
        type: CreateTorrentActionsTypes.REDUCER_GANRES,
        addedGanres: state
    }
}
export const addSomeGanres = (ganres, torrentId, setActiveStep) => {
    let ganresIds = ''
    for (let key in ganres) {
        if (ganres[key] == true) {
            ganresIds += String(key.slice(7, key.length)) + ','
        }
    }
    ganresIds = ganresIds.slice(0, ganresIds.length - 1)
    return async (dispatch: Dispatch<CreateTorrentTypes>) => {
        if (!ganresIds)  {
            dispatch({
                type: CreateTorrentActionsTypes.CREATE_TORRENT_ERROR,
                payload: "Не выбран ни один жанр"
            })
            return setTimeout(async () => {
                dispatch({
                    type: CreateTorrentActionsTypes.CREATE_TORRENT_ERROR,
                    payload: null
                })
            }, 2000)
        }
        try {
            const response = await axios.post(`http://localhost:5000/ganres/addGanres`, {
                ganresIds,
                torrentId
            })
            console.log(response.data)
            setActiveStep(prev => prev + 1)
        } catch (e) {
            dispatch({
                type: CreateTorrentActionsTypes.CREATE_TORRENT_ERROR,
                payload: "Произошла ошибка при загрузки списка жанров"
            })
        }
    }
}
