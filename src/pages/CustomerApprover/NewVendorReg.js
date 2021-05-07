// New Vendor Reg Form Confirmation

import React from 'react';
import { makeStyles, CssBaseline, createMuiTheme, ThemeProvider } from '@material-ui/core';
import Header from "../../components/Header";
import SideMenu from "../../components/SideMenu";

import PageHeader from "../../components/PageHeader";
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';

import NewVendorRegForm from './NewVendorRegForm';

/* Theme */
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
    }
  })
/* /Theme */

export default function NewVendorReg() {

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
                title="SUPPLIER MANAGEMENT"
                subTitle="NEW VENDOR REGISTRATION"
                icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
            />
            {/* Reg Form */}
                <NewVendorRegForm />
            {/* /Reg Form */}
        {/* /Body */}
      </div>
      <CssBaseline />
    </ThemeProvider>
    );
}
