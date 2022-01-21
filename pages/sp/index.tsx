import React from 'react';
import {NextThunkDispatch, wrapper} from "../../store";
import {fetchGanre} from "../../store/actions-creators/ganreAC";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import CreateTorrentSecondStep from "../../components/CreateTorrent/CreateTorrentSecondStep";

const Index = () => {

    return (
        <CreateTorrentSecondStep/>
    );
};

export default Index;
export const getServerSideProps = wrapper.getServerSideProps(
    async ({store}) => {
        const dispatch = store.dispatch as NextThunkDispatch
        await dispatch(await fetchGanre())
    }
)