import React from 'react';
import { makeStyles, CssBaseline, createMuiTheme, ThemeProvider } from '@material-ui/core';
import Header from "../Header";
import SideMenu from "../SideMenu";

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
      paddingLeft: '320px',
      width: '100%'
    }
  })

export default function BaseStructure() {

    const classes = useStyles();

    return (
        <ThemeProvider theme={theme}>
      <SideMenu />
      <div className={classes.appMain}>
        <Header />
        <section className="App">
    </section>
      </div>
      <CssBaseline />
    </ThemeProvider>
    );
}
