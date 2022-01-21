import {GetServerSideProps} from "next";
import axios from "axios";
import {theme} from "../index";
import React from "react";
import {Button, Card, List, ThemeProvider} from "@material-ui/core";
import MainLayout from "../../layout/Main.layout";
import s from "../../styles/OneTorrent.module.css";
import Link from "@material-ui/core/Link";
import {useRouter} from "next/router";
import Screens from "../../components/Screens";
import {fetchTorrent} from "../../store/actions-creators/torrentAC";
import {useDispatch} from "react-redux";
import VideogameAssetIcon from '@material-ui/icons/VideogameAsset';
import WorkIcon from '@material-ui/icons/Work';
import AndroidIcon from '@material-ui/icons/Android';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import {menuItems} from "../../components/Sidebar/SideBarMenu";
import {NextThunkDispatch} from "../../store";


interface Ganres {
    GanreLogo: string
    TorrentGanres: any
    createdAt: string
    description: string
    id: number
    updatedAt: string
    value: string
}
interface TorrentProps {
    comments: Array<any> //допилить
    commentsId?: null //удалить эту хрень
    description: string
    id: number
    name: string
    picture: Array<string>
    torrentDoc: string
    createdAt: string
    updatedAt: string
    view: number
    mainPicture: string
    ganres: Array<Ganres>
}


const TorrentPage= ({serverTorrent}) => {
    const router = useRouter()
    const dispatch = useDispatch() as NextThunkDispatch
    let server:TorrentProps = serverTorrent
    let day = server.createdAt.slice(0, 10)
    let time = server.createdAt.slice(11, 16)
    const findGanre= async(ganre)=>{
       // dispatch(await fetchTorrent(0, 10, ganre))
        router.push(`http://localhost:3000/games?offset=${0}&limit=${10}&ganre=${ganre}`, undefined, { shallow: true })
    }
    if(!serverTorrent) return <div>Загрузка</div>
    else return (
        <div>
            <ThemeProvider theme={theme}>
                <MainLayout
                    title={`Torrpeda | ${server.name}`}
                    description={`${server.description}`}
                    keywords={`Игра, ${server.name},${server.ganres.map(g=>' '+g.value)}`}
                >
                    <Card className={s.root} variant="outlined">
                        <List>
                            <div className={s.wrapper}>
                                <div className={s.icon}>{menuItems.map((m, key) => (m.mainUrl == router.route.slice(0, -6) &&
                                    <div key={key}>{m.icon}</div>))}</div>
                                <div className={s.ganre} color="secondary">
                                    {server.ganres.map((g, key)=>
                                        <Button variant="outlined"
                                                key={`z`+key}
                                                size="small"
                                                onClick={()=>findGanre(g.id)}>
                                            {g.value}
                                        </Button>
                                    )}
                                </div>
                                <div className={s.name} color="secondary">
                                    <h2>{server.name}</h2>
                                </div>
                                <div className={s.data}>{`Дата добавления: ${day} ${time}`}</div>
                                <div className={s.view}>{`Просмотров: ${server.view}`}</div>
                                <div className={s.picture}>
                                    <img alt='главная картинка' className={s.img} src={`http://localhost:5000/${server.mainPicture}`}/>
                                </div>
                                <div className={s.description}>{server.description}</div>
                            </div>
                            <Screens picture={server.picture}/>
                            <Button variant="contained"
                                    color="secondary"
                                    onClick={() => router.push(`http://localhost:5000/${server.torrentDoc}`)}>
                                {`Скачать ${server.name}`}
                            </Button>

                        </List>
                    </Card>
                </MainLayout>
            </ThemeProvider>
        </div>
    )
}
export const getServerSideProps: GetServerSideProps = async ({params}) => {
    const response = await axios.get(`http://localhost:5000/torrent/${params._id}`)

    return {
        props: {
            serverTorrent: response.data
        }
    }
}
export default TorrentPage