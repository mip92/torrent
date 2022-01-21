import React, {useState} from 'react';
import s from "../styles/Screens.module.css"
import Backdrop from '@material-ui/core/Backdrop';
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff',
        },
    }),
);

interface ScreensProps {
    picture: Array<string>
}


const cssStyle = ['first', 'second', 'third', 'fourth'];
const Screens: React.FC<ScreensProps> = ({picture}) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    let [currentPicture, setCurrentPicture] = useState(1)
    const handleToggle = (key) => {
        setCurrentPicture(key)
        setOpen(!open);
    };
    const [next, setNext] = useState(currentPicture)
    const nextPicture = (evt) => {
        let nextPage = currentPicture + 1
        nextPage > picture.length - 1 ? setCurrentPicture(0) :
            setCurrentPicture(nextPage)
    }
    const prevPicture = () => {
        let prevPage = currentPicture - 1
        prevPage < 0 ? setCurrentPicture(picture.length - 1) :
            setCurrentPicture(prevPage)
    }
    return (
        <div className={s.wrapper} >
            {picture.map((p, key) =>
                <img className={s[cssStyle[key]]} key={key} width='100%' src={`http://localhost:5000/${p}`}
                     onClick={() => handleToggle(key)}/>
            )}
            <Backdrop className={classes.backdrop} open={open}>
                <div className={s.paper} >
                    <div className={s.table}>
                        <div className={s.prev} onClick={nextPicture}><ArrowBackIcon/></div>
                    </div>

                    <img width='100%' style={{cursor:'zoom-out'}} src={`http://localhost:5000/${picture[currentPicture]}`} onClick={handleClose}/>

                    <div className={s.table}>
                        <div className={s.next} onClick={prevPicture}><ArrowForwardIcon/></div>
                    </div>
                </div>
            </Backdrop>
        </div>
    );
}

export default Screens;