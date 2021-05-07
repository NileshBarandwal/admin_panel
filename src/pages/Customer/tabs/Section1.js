import React from 'react'
import { Paper, makeStyles } from '@material-ui/core';
import styles from './styles';

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    }
}))

function Section1() {

    const classes = useStyles();

    return (
        <Paper className={classes.pageContent}>
           <div style={styles.container}>
                <h1 style={styles.title}>Section2</h1> 
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p> 
            </div>
        </Paper>
    )
}

export default Section1