import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu, {MenuProps} from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import {Avatar} from "@material-ui/core";
import {useDispatch} from "react-redux";
import {logoutUser} from "../../store/actions-creators/loginAC";
import {useTypedSelector} from "../../hooks/useTypedSelector";

const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})((props: MenuProps) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles((theme) => ({
    root: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);

export default function NavbarMenu({userAvatar}) {

    const dispatch = useDispatch()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const logoutEvent= ()=>{
        dispatch(logoutUser())
    }
    return (
        <div>
            <Avatar alt="Аватарка" src={`http://localhost:5000/${userAvatar}`}
                    aria-controls="customized-menu"
                    aria-haspopup="true"
                    color="primary"
                    onClick={handleClick}/>
            <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <StyledMenuItem onClick={()=>logoutEvent()}>
                    <ListItemIcon>
                        <PowerSettingsNewIcon fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText primary="Выйти"/>
                </StyledMenuItem>
                <StyledMenuItem>
                    <ListItemIcon>
                        <DraftsIcon fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText primary="Drafts"/>
                </StyledMenuItem>
                <StyledMenuItem>
                    <ListItemIcon>
                        <InboxIcon fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText primary="Inbox"/>
                </StyledMenuItem>
            </StyledMenu>
        </div>
    );
}