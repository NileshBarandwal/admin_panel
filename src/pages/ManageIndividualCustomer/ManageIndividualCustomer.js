import React from 'react';
import SideMenu from "../../components/SideMenu";
import { Grid, Paper, makeStyles, Toolbar, CssBaseline, createMuiTheme, ThemeProvider } from '@material-ui/core';
import Header from "../../components/Header";
import Forms from './tabs/Form';
import PageHeader from "../../components/PageHeader";
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import Controls from "../../components/controls/Controls";
import { Form } from '../../components/useForm';

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
  },
    Input: {
        position: 'relative',
        padding: '0px 0 0 -20px',
    },
})

function ManageIndividualCustomer() {
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
                subTitle="Site Admin - Manage Individual Customer"
                icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
            />
            <Paper className={classes.pageContent}>
                    <Form>
                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <Toolbar >
                                <Controls.Input
                                    name="orgname"
                                    label="Customer Name"
                                    className={classes.Input}
                                />
                                <Controls.Input
                                    name="orgname"
                                    label="Customer Code"
                                    className={classes.Input}
                                />
                                <Controls.Input
                                    name="orgname"
                                    label="Account Status"
                                    className={classes.Input}
                                />
                                <Controls.Input
                                    name="orgname"
                                    label="Outstanding INR"
                                    className={classes.Input}
                                />
                          </Toolbar>
                        </Grid>
                      </Grid>
                    </Form>
                    <br />
        {/* <Vendors /> */}
        <Forms />
        </Paper>
      </div>
      <CssBaseline />
    </ThemeProvider>
  );
}

export default ManageIndividualCustomer;