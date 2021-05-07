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

const section4 = [
  { id: 'yes', title: 'Yes' },
  { id: 'no', title: 'No' },
]

const initialFValues = {
  id: 0,
  section4item: '',
  remark: '',
}  

export default function Section4() {
  
  const {
    values,
    // setValues,
    handleInputChange
  } = useForm(initialFValues);

  /*Table*/
  const classes = useStyles();

  return (
    <Paper className={classes.pageContent}>
      <h1 style={styles.center}>Technical Capabilities and Information on Goods / Services Offered</h1>
      <Form>
        <Grid container spacing={3}>
          <Grid item xs={8} style={{ margin: "17px 0 0 0"}}>
              <Typography variant="subtitle1" gutterBottom align="justify">For Goods only, do those offered for supply confirm to National/International Quality Standards?</Typography>
          </Grid>
          <Grid item xs={2}>
              <Controls.RadioGroup
                  name="section4item"
                  label=""
                  value={values.section4item}
                  onChange={handleInputChange}
                  items={section4}
              />
          </Grid>
          <Grid item xs={2}>
          </Grid>
          <Grid item xs={3} style={{margin: '9% 0 0 0'}}>
              <Typography variant="subtitle1" gutterBottom align="left">List at least five (5) achievements your organization has achieved in past</Typography>
          </Grid>
          <Grid item xs={9}>
            <Grid item xs={12} style={{display: 'flex'}}>
                <Controls.Input
                    name=""
                    label=""
                    onChange={handleInputChange}
                    style={{width: '75%'}}
                />
                <Controls.Button
                    text="Upload File"
                    variant="outlined"
                    style={{ margin: "17px 0 0 0", height:'30%'}}
                />
            </Grid>
            <Grid item xs={12} style={{display: 'flex'}}>
                <Controls.Input
                    name=""
                    label=""
                    onChange={handleInputChange}
                    style={{width: '75%'}}
                />
                <Controls.Button
                    text="Upload File"
                    variant="outlined"
                    style={{ margin: "17px 0 0 0", height:'30%'}}
                />
            </Grid>       
            <Grid item xs={12} style={{display: 'flex'}}>
                <Controls.Input
                    name=""
                    label=""
                    onChange={handleInputChange}
                    style={{width: '75%'}}
                />
                <Controls.Button
                    text="Upload File"
                    variant="outlined"
                    style={{ margin: "17px 0 0 0", height:'30%'}}
                />
            </Grid>
            <Grid item xs={12} style={{display: 'flex'}}>
                <Controls.Input
                    name=""
                    label=""
                    onChange={handleInputChange}
                    style={{width: '75%'}}
                />
                <Controls.Button
                    text="Upload File"
                    variant="outlined"
                    //startIcon={<AddIcon />}
                    //className={classes.secondnewButton}
                    style={{ margin: "17px 0 0 0", height:'30%'}}
                />
            </Grid>
            <Grid item xs={12} style={{display: 'flex'}}>
                <Controls.Input
                    name=""
                    label=""
                    onChange={handleInputChange}
                    style={{width: '75%'}}
                />
                <Controls.Button
                    text="Upload File"
                    variant="outlined"
                    style={{ margin: "17px 0 0 0", height:'30%'}}
                />
            </Grid>
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
