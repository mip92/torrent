import s from "../../styles/CreateTorrent.module.css";
import {Card, Checkbox, FormControlLabel, List, Typography} from "@material-ui/core";
import React, {useEffect} from "react";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {NextThunkDispatch} from "../../store";
import {useDispatch} from "react-redux";
import {reducerGanres} from "../../store/actions-creators/createTorrentAC";

const CreateTorrentSecondStep: React.FC = () => {
    const {ganres} = useTypedSelector(state => state.ganre)
    const {torrent} = useTypedSelector(state => state.createTorrent)
    const dispatch = useDispatch() as NextThunkDispatch
    let initialState = {}
    for (let i = 0; i < ganres.length; i++) {
        initialState= {
            ...initialState,
            [`ganreId${[ganres[i].id]}`] : false
        }
        //initialState.[`ganreId${[ganres[i].id]}`] = false
    }
    const [state, setState] = React.useState(initialState);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState(prev => ({...prev, [event.target.name]: event.target.checked}));
    };
    useEffect(() => {
        dispatch(reducerGanres(state))

    }, [state])
    return (
        <form className={s.wrapper}>
            <Typography variant="h6" color={'secondary'}
                        className={s.typography}>Добавление жанра к торренту {torrent.name}</Typography>
            <Card className={s.card} variant="outlined">
                <List>
                    <div>
                        {ganres && ganres.map((g, key) =>
                            <FormControlLabel
                                key={key}
                                control={<Checkbox
                                    checked={state[`ganreId${g.id}`]}
                                    onChange={handleChange}
                                    name={`ganreId${g.id}`}/>}
                                label={g.value}
                            />)}
                    </div>
                </List>
            </Card>
        </form>
    )

}
export default CreateTorrentSecondStep

