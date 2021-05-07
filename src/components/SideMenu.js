import React from 'react'
import { withStyles } from "@material-ui/core";

// withStyles & makeStyles

const style = {
    sideMenu: {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        left: '0px',
        width: '280px',
        height: '200%',
        backgroundColor: '#253053',
        boxShadow: '-3px 9px 9px 5px'
    }
}

const SideMenu = (props) => {
    const { classes } = props;
    return (
        <div className={classes.sideMenu}>

        </div>
    )
}

export default withStyles(style)(SideMenu);
