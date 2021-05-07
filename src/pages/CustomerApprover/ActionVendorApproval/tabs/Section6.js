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

  const section6_1 = [
    { id: 'yes', title: 'Yes' },
    { id: 'no', title: 'No' },
  ]
  
  const section6_2 = [
    { id: 'yes', title: 'Yes' },
    { id: 'no', title: 'No' },
  ]
  
  const initialFValues = {
    id: 0,
    section6item1: '',
    section6item2: '',
    remark: '',
  } 

export default function Section6() {

    const {
        values,
        // setValues,
        handleInputChange
      } = useForm(initialFValues);
    
      /*Table*/
      const classes = useStyles();
      
    return (
    <Paper className={classes.pageContent}>
        <h1 style={styles.center}>Environment</h1>
          <Form>
            <Grid container spacing={3}>
              <Grid item xs={10} style={{ margin: "17px 0 0 0"}}>
                  <Typography variant="subtitle1" gutterBottom align="justify">Does your Company have a written Statement of its Environmental Policy? (If yes, please attach a Copy)</Typography>
              </Grid>
              <Grid item xs={2}>
                  <Controls.RadioGroup
                      name="section6_1"
                      label=""
                      value={values.section6item1}
                      onChange={handleInputChange}
                      items={section6_1}
                  />
              </Grid>
              <Grid item xs={10} style={{ margin: "17px 0 0 0"}}>
                  <Typography variant="subtitle1" gutterBottom align="justify">Does your organisation hold any accreditation such as ISO 14001 related to the environment?</Typography>
              </Grid>
              <Grid item xs={2}>
                  <Controls.RadioGroup
                      name="section6_1"
                      label=""
                      value={values.section6item2}
                      onChange={handleInputChange}
                      items={section6_2}
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
