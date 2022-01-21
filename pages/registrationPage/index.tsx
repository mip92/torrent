import {Avatar, Button, Card, Grid, Input, List, ThemeProvider} from '@material-ui/core';
import {useTypedSelector} from "../../hooks/useTypedSelector";
import MainLayout from "../../layout/Main.layout";
import {theme} from "../index";
import {useInput} from "../../hooks/useInput";
import {useRouter} from "next/router";
import s from "../../styles/RegistrationPage.module.css";
import Typography from "@material-ui/core/Typography";
import EmailIcon from "@material-ui/icons/Email";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import React, {useState} from "react";
import StepWrapper from "../../components/StepWrapper";
import FileUpload from "../../components/FileUpload";
import {clearTimeout} from "timers";
import {useDispatch} from "react-redux";
import {NextThunkDispatch} from "../../store";
import {findEmail, isAvatarAPicture, matchPasswords} from "../../store/actions-creators/authAC";
import {authActionsTypes} from "../../types/authTypes";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        small: {
            width: theme.spacing(3),
            height: theme.spacing(3),
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        large: {
            width: theme.spacing(7),
            height: theme.spacing(7),
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    }),
);
const Index = () => {
    const router = useRouter()
    const {error} = useTypedSelector(state => state.auth)
    const password1 = useInput('')
    const password2 = useInput('')
    const [activeStep, setActiveStep] = useState(0)
    const [picture, setPicture] = useState(null)
    const [emailText, setEmail] = useState<string>('')
    const [timer, setTimer] = useState(null)
    const [img, setImg] = useState(null)
    const dispatch = useDispatch() as NextThunkDispatch
    const classes = useStyles();
    const search = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
        if (timer) {
            clearTimeout(timer)
        }
        setTimeout(async () => {
            await dispatch(await findEmail(e.target.value));
        }, 500)
    }
    const validatePassword = async () => {
        await dispatch(matchPasswords(String(password1.value), String(password2.value), setActiveStep))
    }
    const validateAvatar = async () => {
        await dispatch(isAvatarAPicture(picture, emailText, password1, router))
    }

    const next = () => {
        if (activeStep == 2) {
            validateAvatar()
        } else setActiveStep(prev => prev + 1)
    }
    const back = () => {
        dispatch({
            type: authActionsTypes.FIND_EMAIL_ERROR,
            payload: null
        });
        setActiveStep(prev => prev - 1)
        if (activeStep <= 0) setActiveStep(0)
    }
    const steps = ["Почта", "Пароль", "Аватарка"]

    return (
        <div>
            <ThemeProvider theme={theme}>
                <MainLayout
                    title={"Torrpeda | Регистрация"}
                    description={"Регистрация на сайте"}
                    keywords={"Регистрация, регистрация"}
                >
                    <Card className={s.root}>
                        <List className={s.list}>
                            <Typography variant="h6" color={'secondary'}
                                        className={s.typography}>Регистрация</Typography>
                            <StepWrapper activeStep={activeStep} steps={steps}>
                                {activeStep === 0 &&
                                <div>
                                    <div className={s.email}>
                                        <EmailIcon/>
                                        <Input
                                            value={emailText}
                                            onChange={search}
                                            placeholder="Email"
                                            color='primary'
                                            inputProps={{'aria-label': 'description'}}/>
                                        <div
                                            style={{fontSize: '15px', marginTop: "5px", color: "#ff5047"}}>{error}</div>
                                    </div>
                                </div>
                                }
                                {activeStep === 1 &&
                                <div className={s.passwords}>
                                    <div className={s.password1}>

                                        <LockOpenIcon/>
                                        <Input {...password1}

                                               placeholder="Пароль"
                                               color="primary"
                                               inputProps={{'aria-label': 'description'}}
                                        />
                                    </div>
                                    <div className={s.password2}>
                                        <LockOpenIcon/>
                                        <Input {...password2}
                                               placeholder="Повторите пароль"
                                               color="primary"
                                               inputProps={{'aria-label': 'description'}}
                                        />
                                    </div>
                                    <div style={{fontSize: '15px', marginTop: "5px", color: "#ff5047"}}>{error}</div>
                                </div>
                                }
                                {activeStep === 2 && <div>
                                    <FileUpload accept="image/*" setFile={setPicture} setImg={setImg}>
                                        <div className={s.button}>
                                            <Button>Загрузить аватарку</Button>
                                            {img && <Avatar alt="Аватарка" src={img} className={classes.large}/>}
                                        </div>
                                    </FileUpload>

                                    <div style={{fontSize: '15px', marginTop: "5px", color: "#ff5047"}}>{error}</div>
                                </div>}

                            </StepWrapper>
                            <Grid className={s.keys}>
                                <Button variant="contained"
                                        color='primary'
                                        disabled={activeStep == 0}
                                        onClick={back}
                                        className={s.prev}>
                                    Назад</Button>
                                <Button variant="contained"
                                        color='primary'
                                        disabled={activeStep >= 3 || error !== null}
                                        onClick={activeStep == 1 ? validatePassword : next}
                                        className={s.next}>
                                    Далее</Button>
                            </Grid>
                        </List>
                    </Card>
                </MainLayout>
            </ThemeProvider>
        </div>
    );
};
export default Index
