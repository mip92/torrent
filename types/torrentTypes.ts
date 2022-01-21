import {string} from "prop-types";
export enum TorrentActionsTypes{
    FETCH_TORRENTS="FETCH_TORRENTS",
    FETCH_TORRENTS_ERROR="FETCH_TORRENTS_ERROR",
}

export interface torrentType{
    id: number,
    name: string,
    description: string,
    picture: Array<string>,
    mainPicture: string,
    torrentDoc: string,
    view: number,
    updatedAt: string,
    createdAt: string,
    commentsId?: null | Array<string>
    ganres: any
}

interface FetchTorrentAction{
    type: TorrentActionsTypes.FETCH_TORRENTS,
    torrents: torrentType[],
    fullLength: number,
}

interface FetchTorrentError{
    type:TorrentActionsTypes.FETCH_TORRENTS_ERROR
    payload:string
}

export interface TorrentState{
    torrents: torrentType[] | null,
    error: string,
    fullLength: number
}

export type TorrentTypes = FetchTorrentAction | FetchTorrentError