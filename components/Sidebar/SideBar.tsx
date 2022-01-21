import React from 'react';
import SideBarMenu from "./SideBarMenu";
import Login from "./Login";
import {useTypedSelector} from "../../hooks/useTypedSelector";


const SideBar = () => {
    const {user}= useTypedSelector(state => state.login)
    return (
        <div>
            <SideBarMenu/>
            {!user && <Login/>}
        </div>
    );
};

export default SideBar;