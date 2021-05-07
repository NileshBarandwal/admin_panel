import React from 'react'
// import CustomerOnboarding from "./CustomerOnboarding";
import PageHeader from "../../components/PageHeader";
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import { Paper, makeStyles } from '@material-ui/core';

import Form from './tabs/Form';

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    searchInput: {
        width: '75%'
    },
    newButton: {
        position: 'relative',
        left: '-25px',
    },
    customeronboardingbtn: {
        position: 'relative',
        display: 'flex',
    },
    secondnewButton: {
        position: 'relative',
        left: '-25px',
    }
}))

export default function AdminMain() {

    const classes = useStyles();
    
    return (
        <>
            <PageHeader
                title="SUPPLIER MANAGEMENT"
                subTitle="CUSTOMER ADMIN DASHBOARDs"
                icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
            />
            <Paper className={classes.pageContent}>

                <Form />

            </Paper>
        </>
    )
}
