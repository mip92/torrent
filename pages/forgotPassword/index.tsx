import React, {useState} from "react";
import {theme} from "../index";
import s from "../../styles/RegistrationPage.module.css";
import {Button, Card, Grid, Input, List, ListItemIcon} from "@material-ui/core";
import MainLayout from "../../layout/Main.layout";
import {ThemeProvider} from '@material-ui/core';
import Typography from "@material-ui/core/Typography";
import EmailIcon from "@material-ui/icons/Email";
import ContactMailIcon from '@material-ui/icons/ContactMail';
import StepWrapper from "../../components/StepWrapper";
import {authActionsTypes} from "../../types/authTypes";
import {useDispatch} from "react-redux";
import {checkCode, newPassword, passwordRecovery} from "../../store/actions-creators/passwordRecovery";
import {clearTimeout} from "timers";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import {useInput} from "../../hooks/useInput";
import {matchPasswords} from "../../store/actions-creators/authAC";
import {passwordRecoveryTypes} from "../../types/passwordRecoveryTypes";
import {useRouter} from "next/router";

const Index = () => {
    const {error}= useTypedSelector(state => state.passwordRecoveryReducer)
    const dispatch =useDispatch();
    const router= useRouter()
    const [activeStep, setActiveStep] = useState(0)
    const [emailText, setEmailText] = useState<string>('')
    const [codeText, setCodeText] = useState<string>('')
    const [timer, setTimer] = useState(null)
    const password1 = useInput('')
    const password2 = useInput('')
    const setEmail=(e)=>{
        setEmailText(e.target.value)
    }
    const setCode=(e)=>{
        setCodeText(e.target.value)
    }
    const next = () => {
        if (activeStep == 0) {
            if (timer) {
                clearTimeout(timer)
            }
            setTimeout(async () => {
                await dispatch(passwordRecovery(emailText, setActiveStep));
            }, 500)
        }
        else if (activeStep == 1) {
            if (timer) {
                clearTimeout(timer)
            }
            setTimeout(async () => {
                await dispatch(checkCode(emailText, codeText, setActiveStep));
            }, 500)
        }
        else if (activeStep == 2) {
                if (timer) {
                    clearTimeout(timer)
                }
                setTimeout(async () => {
                    await dispatch(newPassword(
                        String(password1.value),
                        String(password2.value),
                        emailText,
                        codeText,
                        router
                    ))
                }, 500)
        } else setActiveStep(prev => prev + 1)
    }
    const back = () => {
        dispatch({
            type: passwordRecoveryTypes.ERROR,
            payload: null
        });
        setCodeText('')
        setActiveStep(prev => prev - 1)
        if (activeStep <= 0) setActiveStep(0)
    }
    const steps = ["Почта", "Подтверждение", "Пароль"]
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
                            <Typography variant="h6" color={'secondary'} className={s.typography}>Восстановление
                                пароля</Typography>
                            <StepWrapper activeStep={activeStep} steps={steps}>
                                {activeStep === 0 &&
                                <div>
                                    <Typography variant="h6" color={'inherit'} className={s.typography}>
                                        Введите свою почту
                                    </Typography>
                                    <ListItemIcon>
                                        <EmailIcon/>
                                    </ListItemIcon>
                                    <Input
                                        value={emailText}
                                        onChange={setEmail}
                                        placeholder="Email"
                                        color='primary'
                                        inputProps={{'aria-label': 'description'}}/>
                                    <div style={{fontSize: '15px', marginTop: "5px", color: "#ff5047"}}>{error}</div>
                                </div>
                                }
                                {activeStep === 1 &&
                                <div>
                                    <Typography variant="h6" color={'inherit'} className={s.typography}>
                                        На Вашу почту отправлен код, введите его в это поле
                                    </Typography>
                                    <ListItemIcon>
                                        <ContactMailIcon/>
                                    </ListItemIcon>
                                    <Input
                                        value={codeText}
                                        onChange={setCode}
                                        placeholder="Code"
                                        color='primary'
                                        inputProps={{'aria-label': 'description'}}/>
                                    <div style={{fontSize: '15px', marginTop: "5px", color: "#ff5047"}}>{error}</div>
                                </div>
                                }
                                {activeStep === 2 &&
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
                                        onClick={next}
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
