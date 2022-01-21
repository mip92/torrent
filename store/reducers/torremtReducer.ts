import {TorrentActionsTypes, TorrentState, TorrentTypes} from "../../types/torrentTypes";

const initialState: TorrentState = {
    torrents: null,
    error: '',
    fullLength: 0
}

export const torrentReducer = (state: TorrentState = initialState, action: TorrentTypes) => {
    switch (action.type) {
        case TorrentActionsTypes.FETCH_TORRENTS: {
            return {...state, torrents: action.torrents, fullLength: action.fullLength, error: ''}
        }
        case TorrentActionsTypes.FETCH_TORRENTS_ERROR: {
            return {...state, error: action.payload}
        }
        default: return state
    }
}