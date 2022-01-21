import React, {useCallback, useEffect} from 'react';
import {torrentType} from "../types/torrentTypes";
import s from "../styles/OneTorrent.module.css"
import {useRouter} from "next/router";

import {Button, Card, List, useEventCallback} from "@material-ui/core";
import Link from '@material-ui/core/Link';
import LinkComponent from "./LinkComponent";
import VideogameAssetIcon from '@material-ui/icons/VideogameAsset';
import WorkIcon from '@material-ui/icons/Work';
import AndroidIcon from '@material-ui/icons/Android';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import {menuItems} from "./Sidebar/SideBarMenu";

interface OneTorrentProps {
    torrent: torrentType,
    findGanre: any
}

export default React.memo<OneTorrentProps>(function OneTorrent({torrent, findGanre}) {
        const router = useRouter()
        let day = torrent.createdAt.slice(0, 10)
        let time = torrent.createdAt.slice(11, 16)

        const click = (g) => {
            findGanre(g.id)
        }
        return (
            <Card className={s.root} variant="outlined">
                <List>
                    <div className={s.wrapper}>
                        <div className={s.icon}>{menuItems.map((m, key) => (m.mainUrl == router.route &&
                            <div key={"sss" + key}>{m.icon}</div>))}</div>
                        <div className={s.ganre} color="secondary">
                            {torrent.ganres.map((g, key) => <div  key={"unic" + key}>

                                <Button variant="outlined"
                                        size="small"
                                        onClick={() => click(g)}>
                                    {g.value}
                                </Button>
                                </div>
                            )}
                        </div>
                        <Link className={s.name} color="secondary">
                            <LinkComponent href={`/games/${torrent.id}`}>
                                <h2>{torrent.name}</h2>
                            </LinkComponent>
                        </Link>
                        <div className={s.data}>{`Дата добавления: ${day} ${time}`}</div>
                        <div className={s.view}>{`Просмотров: ${torrent.view}`}</div>
                        <Link className={s.picture}>
                            <LinkComponent href={`/games/${torrent.id}`}>
                                <img className={s.img} src={`http://localhost:5000/${torrent.mainPicture}`}/>
                            </LinkComponent>
                        </Link>
                        <div className={s.description}>{torrent.description}</div>
                        <Button variant="contained" color="primary" className={s.button}
                                onClick={() => router.push(`/games/${torrent.id}`)}>Подробнее...</Button>
                    </div>
                </List>
            </Card>
        );
    }
)

