import React from 'react'
import { Paper, Grid, makeStyles } from '@material-ui/core';
import Controls from "../../../../components/controls/Controls";
import { useForm, Form } from '../../../../components/useForm';
import Typography from '@material-ui/core/Typography';
import styles from './styles'

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    backButton: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      /* marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      */
     textAlign: 'center',
    },
    pageContent: {
      margin: theme.spacing(2),
      padding: theme.spacing(3)
  },
  buttoncontainer: {
    textAlign: 'center',
  },
  flexContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
  },
  newButton: {
      position: 'relative',
      display: 'flex',
  },
  }));
  
  const initialFValues = {
    id: 0,
    isAccept: false,
    isAccept1: false,
    remark: '',
  } 

export default function Section8() {

    const {
        values,
        // setValues,
        handleInputChange
      } = useForm(initialFValues);
    
      /*Table*/
      const classes = useStyles();
      
    return (
    <Paper className={classes.pageContent}>
        <h1 style={styles.center}>Declarations</h1>
        <Form>
            <Grid container spacing={3}>
                <Grid item xs={2}>
                    <Typography variant="subtitle1" gutterBottom align="justify">Certification</Typography>
                </Grid>
                <Grid item xs={9}>
                    <Typography variant="subtitle1" gutterBottom align="justify">I, the undersigned, here by accept the General Conditions, a copy of which has been provided to me, and warrant that the information provided in this form is correct and, in the event of changes, details will be provided as soon as possible.</Typography>
                </Grid>
                <Grid item xs={1}>
                    <Controls.Checkbox
                        name="isAccept"
                        label=""
                        value={values.isAccept}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={2}>
                    <Typography variant="subtitle1" gutterBottom align="justify">Self-Declaration</Typography>
                </Grid>
                <Grid item xs={9}>
                    <Typography variant="subtitle1" gutterBottom align="justify">I, the undersigned, declare that:<br/>(a) Our company is not involved in any fraudulent or corrupt activities and has not been in the past, and is not currently under any investigation for any such activities which would render our company unsuitable for business dealing with your esteemed organization</Typography>
                </Grid>
                <Grid item xs={1}>
                    <Controls.Checkbox
                        name="isAccept1"
                        label=""
                        value={values.isAccept1}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12}>
                        <Controls.Input
                                name="remark"
                                label="Remark"
                                value={values.remark}
                                onChange={handleInputChange}
                            />
                            <div style={styles.center}>
                                <Controls.Button
                                    type="submit"
                                    text="Resend to Vendor with Clarfications" />
                                <Controls.Button
                                    type="submit"
                                    text="Reject"
                                    color="Secondary" />
                                <Controls.Button
                                    type="submit"
                                    text="Approve" />
                            </div>
                </Grid>
            </Grid>
        </Form>
    </Paper>
    )
}
