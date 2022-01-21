import React from 'react';
import {Button, Card, Input, List, ListItemIcon} from "@material-ui/core";
import s from "../../styles/Login.module.css";
import Typography from "@material-ui/core/Typography";
import EmailIcon from '@material-ui/icons/Email';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import {useInput} from "../../hooks/useInput";
import {useRouter} from "next/router";
import {useDispatch} from "react-redux";
import {loginUser} from "../../store/actions-creators/loginAC";
import {NextThunkDispatch} from "../../store";

const Login = () => {
    const login = useInput('')
    const password = useInput('')
    const router = useRouter()
    const dispatch=useDispatch() as NextThunkDispatch
    const enter = async () => {
        await dispatch(loginUser(login.value,password.value))
    }

    return (
        <div>
            <Card className={s.root} variant="outlined">
                <List>
                    <form noValidate className={s.wrapper} autoComplete="off">
                        <Typography variant="h6" color={'secondary'} className={s.typography}>Авторизация</Typography>
                        <ListItemIcon className={s.logoEmail}>
                            <EmailIcon/>
                        </ListItemIcon>
                        <Input {...login} className={s.email} placeholder="Email" color="primary"
                               inputProps={{'aria-label': 'description'}}/>
                        <ListItemIcon className={s.logoPassword}>
                            <LockOpenIcon/>
                        </ListItemIcon>
                        <Input {...password} className={s.password} type="password" placeholder="Пароль" color="primary"
                               inputProps={{'aria-label': 'description'}}/>
                        <Button className={s.login} onClick={enter}
                                color="secondary"><PlayCircleOutlineIcon/>
                            Войти
                        </Button>

                        <Button className={s.forgotPassword}
                                onClick={() => router.push('/forgotPassword')}
                                color="inherit"><AutorenewIcon/>
                            Забыли пароль?
                        </Button>

                        <Button
                            onClick={() => router.push('/registrationPage')}
                            className={s.registration}
                            color="inherit"><AddCircleOutlineIcon/>
                            Регистрация
                        </Button>
                    </form>
                </List>
            </Card>
        </div>
    );
}


export default Login;