import React from 'react';
import SideMenu from "../../components/SideMenu";
import { Paper, makeStyles, CssBaseline, createMuiTheme, ThemeProvider } from '@material-ui/core';
import Header from "../../components/Header";
import Form from './tabs/Form';
import PageHeader from "../../components/PageHeader";
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';

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

function AdminApp() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <SideMenu />
      <div className={classes.appMain}>
        <Header />
        <section className="App">
    </section>
            <PageHeader
                title="SUPPLIER MANAGEMENT"
                subTitle="ADMIN HOME PAGE"
                icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
            />
            <Paper className={classes.pageContent}>
        {/* <Vendors /> */}
        <Form />
        </Paper>
      </div>
      <CssBaseline />
    </ThemeProvider>
  );
}

export default AdminApp;