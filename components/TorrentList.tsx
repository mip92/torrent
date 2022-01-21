import React, {useCallback, useEffect} from 'react';
import {NextThunkDispatch, wrapper} from "../store";
import {fetchTorrent} from "../store/actions-creators/torrentAC";
import {useTypedSelector} from "../hooks/useTypedSelector";
import OneTorrent from "./OneTorrent";
import {torrentType} from "../types/torrentTypes";
import Paginator from "./Paginator/Paginator";
import {useRouter} from "next/router";
import {theme} from "../pages";
import {useDispatch} from "react-redux";
import {setOffsetLimitGanre} from "../store/actions-creators/paginatorAC";

interface TorrentsListProps {
    torrents: Array<torrentType>
}

interface ParsedUrlQuery {
    offset: number,
    limit: number,
    ganre: number
}


export default React.memo<TorrentsListProps>(function TorrentList({torrents}) {
        const {fullLength} = useTypedSelector(state => state.torrent)
        const router = useRouter()
        const findGanre = useCallback((ganre) => {
            router.push(`/games?offset=${0}&limit=${10}&ganre=${ganre}`)
        }, [])
        console.log(111111111111111111111111111)
        {/*@ts-ignore*/}
        let query: ParsedUrlQuery = router.query
        return (
            <div>
                {torrents && torrents.map((torrent, key) => <OneTorrent key={'dfdsdfsd' + key} torrent={torrent}
                                                                        findGanre={findGanre}/>)}
                {/*<Paginator fullLength={fullLength} query={query}/>*/}
            </div>
        );

    }, /*(prevProps,nextProps) =>{
    if(JSON.stringify(prevProps)==JSON.stringify(nextProps)) return true
     else return false;
}*/
)


