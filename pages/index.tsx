import React from 'react';
import MainLayout from "../layout/Main.layout";
import { createMuiTheme, ThemeProvider, Button } from '@material-ui/core';
import {NextThunkDispatch, wrapper} from "../store";
import GanreList from "../components/GanreList";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {fetchGanre} from "../store/actions-creators/ganreAC";

export const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#ffe0b2',
        },
        secondary: {
            main: '#f57c00',
        },

    },

});

const Index: React.FC = () => {
    const {error, ganres} = useTypedSelector(state => state.ganre)
    return (
        <ThemeProvider theme={theme}>
            <MainLayout
                title={"Torrpeda | Лучшие торренты"}
                description={"Главная страница"}
                keywords={"игры"}
            >
                <GanreList ganres={ganres}/>
            </MainLayout>
        </ThemeProvider>
    );
};

export default Index;
export const getServerSideProps = wrapper.getServerSideProps(
    async ({store}) => {
        const dispatch = store.dispatch as NextThunkDispatch
        await dispatch(await fetchGanre())
    })