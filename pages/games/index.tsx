import React, {memo, useCallback, useEffect} from 'react';
import {NextThunkDispatch, wrapper} from "../../store";
import {fetchTorrent} from "../../store/actions-creators/torrentAC";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import TorrentList from "../../components/TorrentList";
import MainLayout from "../../layout/Main.layout";
import {ThemeProvider} from '@material-ui/core';
import {theme} from "../index";
import {useDispatch} from "react-redux";
import {useRouter} from "next/router";



export default React.memo(function Index() {
        const router = useRouter()
        const values = useTypedSelector(state => state.torrent)
    console.log(values)
        return (
            <div>
                <ThemeProvider theme={theme}>
                    <MainLayout
                        title={`Torrpeda | Список игр ${(!router.query.ganre || router.query.ganre == '10000') ? '' : " | " + values.torrents[0].ganres[0].value}`}
                        description={`Список доступных игр${(!router.query.ganre || router.query.ganre == '10000') ? '' : " с жанром " + values.torrents[0].ganres[0].value}`}
                        keywords={`игры` + `${(!router.query.ganre || router.query.ganre == '10000') ? '' : ', ' + values.torrents[0].ganres[0].value}`}
                    >
                        {!values? <div>Загрузка</div>:<TorrentList torrents={values.torrents}/>}
                    </MainLayout>
                </ThemeProvider>
            </div>
        );
    }
)

//export default Index;
/*Index.getInitialProps = async ({ query: { offset=0, limit=10, ganre=null} }) => {
    const response = await axios.get(`http://localhost:5000/torrent?offset=${offset}&limit=${limit}&?ganre=${ganre}`)
    console.log(offset,limit,ganre)
    return { torrents: response.data }
}*/

export const getServerSideProps = wrapper.getServerSideProps(
    async ({store, query: {offset, limit, ganre}}) => {
        const dispatch = store.dispatch as NextThunkDispatch
        /*if (!ganre) ganre = '10000'*/
        console.log(111111111111, offset, limit, ganre)
        await dispatch(fetchTorrent(String(offset), String(limit), String(ganre)))
    })
