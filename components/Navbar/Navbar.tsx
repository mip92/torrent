import React from 'react';
import {AppBar, Avatar, Button, IconButton, makeStyles, Toolbar, Typography} from "@material-ui/core";

import LinkComponent from "../LinkComponent";
import Link from "@material-ui/core/Link";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {createStyles, Theme} from "@material-ui/core/styles";
import NavbarMenu from "./NavbarMenu";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1
        },
        menuButton: {
            marginRight: theme.spacing(2)
        },
        title: {
            flexGrow: 1
        }
    })
);
const Navbar = () => {
    const classes = useStyles();
    const {user} = useTypedSelector(state => state.login)
    const state = useTypedSelector(state => state)
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>

                        <img  width='50px' src='http://localhost:5000/logo/torrpeda.svg'/>

                    <Link color="inherit" className={classes.title}>
                        <LinkComponent href={`/`}>
                            <Typography variant="h6">
                                TORRPEDА
                            </Typography>
                        </LinkComponent>
                    </Link>
                    <div>
                        {!user ? <Button  color="inherit">Login</Button> :
                            <NavbarMenu userAvatar={user.userAvatar}/>
                            /*<Avatar alt="Аватарка" src={`http://localhost:5000/${user.userAvatar}`}/>*/}
                    </div>

                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Navbar;