import {
    CreateTorrentActionsTypes,
    CreateTorrentType,
    CreateTorrentTypes
} from "../../types/createTorrentTypes";

const initialState: CreateTorrentType = {
    name: '',
    description: '',
    torrentDoc: null,
    picture: [null],
    mainPicture: null,
    error: null,
    torrent: null,
    addedGanres: null
}

export const createTorrentReducer = (state: CreateTorrentType = initialState, action: CreateTorrentTypes) => {
    switch (action.type) {
        case CreateTorrentActionsTypes.CREATE_TORRENT: {
            return {...state, torrent: action.torrent, error: null}
        }
        case CreateTorrentActionsTypes.CREATE_TORRENT_ERROR: {
            return {...state, error: action.payload}
        }
        case CreateTorrentActionsTypes.REDUCER_FORM: {
            return {
                ...state,
                name: action.name,
                description: action.description,
                torrentDoc: action.torrent,
                mainPicture: action.mainPicture,
                picture: action.picture
            }
        }
        case CreateTorrentActionsTypes.REDUCER_GANRES: {
            return {...state, addedGanres: action.addedGanres}
        }
        default:
            return state
    }
}