import React from 'react';
import { Paper, makeStyles, CssBaseline, createMuiTheme, ThemeProvider } from '@material-ui/core';
import Header from "../../components/Header";
import SideMenu from "../../components/SideMenu";

import PageHeader from "../../components/PageHeader";
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';

import Form from "./tabs/Form";
// import HorizontalLabelPositionBelowStepper from "./tabs/stepper";

const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#333996",
        light: '#3c44b126'
      },
      secondary: {
        main: "#f83245",
        light: '#f8324526'
      },
      background: {
        default: "#f4f5fd"
      },
    },
    overrides:{
      MuiAppBar:{
        root:{
          transform:'translateZ(0)'
        }
      }
    },
    props:{
      MuiIconButton:{
        disableRipple:true
      }
    }
  })
  
  
  const useStyles = makeStyles({
    appMain: {
      paddingLeft: '280px',
      width: '100%'
    },
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    }
  })

export default function Main() {

    const classes = useStyles();

    return (
        <ThemeProvider theme={theme}>
      <SideMenu />
      <div className={classes.appMain}>
        <Header />
        <section className="App">
    </section>
    {/* Body */}
        <PageHeader
                title="SUPPLIER MANAGEMENTN"
                subTitle="Profile Man"
                icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
            />
          <Paper className={classes.pageContent}>
              <Form />
          </Paper>
        {/* /Body */}
      </div>
      <CssBaseline />
    </ThemeProvider>
    );
}
