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
    remark: '',
  } 

export default function Section7() {

    const {
        values,
        // setValues,
        handleInputChange
      } = useForm(initialFValues);
    
      /*Table*/
      const classes = useStyles();
      
    return (
    <Paper className={classes.pageContent}>
        <h1 style={styles.center}>Supplier Code of Conduct</h1>
        <Form>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="subtitle1" gutterBottom align="justify">Vendor who wish to do business with ____________ are required to comply with the our Supplier Code of Conduct. Please download and read the ____________Supplier Code of Conduct.</Typography>
                </Grid>
                <Grid item xs={1}>
                    <Controls.Checkbox
                        name="isAccept"
                        label=""
                        value={values.isAccept}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={11} style={{ margin: "15px 0 0 0"}}>
                <Typography variant="subtitle1" gutterBottom align="justify">I accept the conditions specified under Supplier Code of Conduct.</Typography>
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
