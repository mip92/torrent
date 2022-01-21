import React from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import {List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import router from 'next/dist/client/router';
import VideogameAssetIcon from '@material-ui/icons/VideogameAsset';
import WorkIcon from '@material-ui/icons/Work';
import AndroidIcon from '@material-ui/icons/Android';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import s from "../../styles/SideBarMenu.module.css"

import LinkComponent from "../LinkComponent";


export const menuItems = [
    {
        text: 'Игры',
        href: '/games?offset=0&limit=10&ganre=10000',
        icon: <VideogameAssetIcon/>,
        mainUrl: '/games'
    },
    {text: 'Программы', href: '/program', icon: <WorkIcon/>, mainUrl: '/program'},
    {text: 'Android', href: '/android', icon: <AndroidIcon/>, mainUrl: '/android'},
    {text: 'iOs', href: '/ios', icon: <PhoneIphoneIcon/>, mainUrl: '/ios'},
]
const SideBarMenu = () => {
    return (
        <Card className={s.root} variant="outlined">
            <List>
                <Typography variant="h6" color={'secondary'} className={s.typography}>Меню</Typography>
                {menuItems.map(({text, href, icon}, key, index) => (
                    <div key={key+"sd"}>
                        <LinkComponent href={href}>
                            <ListItem button>
                                <ListItemIcon>
                                    {icon}
                                </ListItemIcon>
                                <ListItemText primary={text}/>
                            </ListItem>
                        </LinkComponent>
                    </div>
                ))}
            </List>
        </Card>
    );
}


export default SideBarMenu;
