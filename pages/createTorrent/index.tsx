import React, {useState} from "react";
import {theme} from "../index";
import {Button, Card, Grid, List, ThemeProvider, Typography} from '@material-ui/core';
import MainLayout from "../../layout/Main.layout";
import s from "../../styles/CreateTorrent.module.css";
import StepWrapper from "../../components/StepWrapper";
import CreateTorrentFirstStep from "../../components/CreateTorrent/CreateTorrentFirstStep";

import {useDispatch} from "react-redux";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {addSomeGanres, createTorrent} from "../../store/actions-creators/createTorrentAC";
import CreateTorrentSecondStep from "../../components/CreateTorrent/CreateTorrentSecondStep";
import {NextThunkDispatch, wrapper} from "../../store";
import {fetchGanre} from "../../store/actions-creators/ganreAC";
import {CreateTorrentActionsTypes} from "../../types/createTorrentTypes";
import {useRouter} from "next/router";

const Index = () => {
    const [activeStep, setActiveStep] = useState(0)
    const dispatch = useDispatch() as NextThunkDispatch
    const router = useRouter()
    const {name, description, picture, mainPicture, torrentDoc, error, torrent, addedGanres} = useTypedSelector(state => state.createTorrent)
    const next = () => {
        if (activeStep == 0) {
            dispatch(createTorrent(name, description, picture, torrentDoc, mainPicture, setActiveStep))
        }
        if (activeStep == 1) {
            if ("id" in torrent) {
                dispatch(addSomeGanres(addedGanres, torrent.id, setActiveStep))
            }
        }
        if (activeStep == 2) {
            router.push('/')
        }
    }
    const back = () => {
        dispatch({
            type: CreateTorrentActionsTypes.CREATE_TORRENT_ERROR,
            payload: null
        });
        setActiveStep(prev => prev - 1)
        if (activeStep <= 0) setActiveStep(0)
    }
    const steps = ['Описание', 'Жанры', 'Характеристики', 'Требования']
    return (
        <ThemeProvider theme={theme}>
            <MainLayout
                title={"Torrpeda | Создание торрента"}
                description={"Создание торрента"}
                keywords={"Создание, торрент"}
            >
                <div className={s.root}>
                    <Card className={s.root}>
                        <List className={s.list}>

                            <StepWrapper activeStep={activeStep} steps={steps}>
                                {activeStep === 0 && <CreateTorrentFirstStep/>}
                                {activeStep === 1 && <CreateTorrentSecondStep/>}
                                {activeStep === 2 && <div>asd</div>}
                            </StepWrapper>

                            <div>{error}</div>
                            <Grid className={s.keys}>
                                <Button variant="contained"
                                        color='primary'
                                        disabled={activeStep >= 3 || error !== null}
                                        onClick={next}
                                        className={s.next}>
                                    Далее</Button>
                                <div>{error}</div>
                            </Grid>
                        </List>
                    </Card>
                </div>
            </MainLayout>
        </ThemeProvider>

    );
};
export default Index
export const getServerSideProps = wrapper.getServerSideProps(
    async ({store}) => {

        const dispatch = store.dispatch as NextThunkDispatch
        await  dispatch(await fetchGanre())
    }
)