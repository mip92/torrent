import {torrentType} from "./torrentTypes";

export enum CreateTorrentActionsTypes{
    CREATE_TORRENT="CREATE_TORRENT",
    CREATE_TORRENT_ERROR="CREATE_TORRENT_ERROR",
    REDUCER_FORM="REDUCER_FORM",
    REDUCER_GANRES='REDUCER_GANRES'
}

export interface CreateTorrentType{
    name: string,
    description: string,
    torrentDoc: File | null,
    picture: Array<File> | null,
    mainPicture: File | null,
    error: null | string,
    torrent: torrentType | null
    addedGanres: Object | null
}


interface FetchCreateTorrentAction{
    type: CreateTorrentActionsTypes.CREATE_TORRENT,
    torrent: CreateTorrentType,
}

interface FetchCreateTorrentError{
    type:CreateTorrentActionsTypes.CREATE_TORRENT_ERROR
    payload:string
}
interface ReduceFormAction{
    type:CreateTorrentActionsTypes.REDUCER_FORM
    name:string,
    description:string,
    picture:Array<File>,
    torrent:File,
    mainPicture: File
}
interface ReduceGanres{
    type:CreateTorrentActionsTypes.REDUCER_GANRES
    addedGanres: Object
}


export type CreateTorrentTypes = FetchCreateTorrentAction | FetchCreateTorrentError | ReduceFormAction | ReduceGanres