import React, {FC} from 'react';
import {Card, Container, Grid, Step, StepLabel, Stepper} from "@material-ui/core";
import s from "../styles/RegistrationPage.module.css";

interface IStepWrapperProps {
    activeStep: number
    steps: Array<string>
}

/*const steps = ["Почта", "Пароль", "Аватарка"]*/
const StepWrapper: FC<IStepWrapperProps> = ({steps, activeStep, children}) => {
    return (
        <div className={s.steps}>
            <Stepper activeStep={activeStep} style={{padding: '5px'}}>
                {steps.map((s, index) =>
                    <Step key={s} completed={activeStep > index}>
                        <StepLabel>{s}</StepLabel>
                    </Step>
                )}
            </Stepper>
                <div style={{width: '100%'}}>
                    {children}
                </div>
        </div>
    );
};

export default StepWrapper;