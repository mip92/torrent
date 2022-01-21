import React from 'react';
import Link from 'next/link'
import {AppBar, Avatar, Button, IconButton, makeStyles, Toolbar, Typography} from "@material-ui/core";

const LinkComponent = ({children, href}) => {
    return (
        <Link href={href}>
            {/*<a>*/}
            {children}
            {/*</a>*/}
        </Link>
    );
};

export default LinkComponent;