import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid } from '@material-ui/core';
import Controls from "../../../../components/controls/Controls";
import { useForm, Form } from '../../../../components/useForm';
import * as vendorService from "../../../../services/vendorService";
import styles from './styles'

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    backButton: {
      marginRight: theme.spacing(1),
    },
    pageContent: {
      margin: theme.spacing(2),
      padding: theme.spacing(3)
  },
  buttoncontainer: {
    textAlign: 'center',
  },
  newButton: {
      position: 'relative',
      display: 'flex',
  },
  }));

  const initialFValues = {
    id: 0,
    companyname: '',
    addressline1: '',
    addressline2: '',
    city: '',
    state: '',
    postalcode: '',
    country: '',
    telephone: '',
    fax: '',
    companywebsite: '',
    contactpersondesig: '',
    designation: '',
    email: '',
  }

export default function Section1() {

    const classes = useStyles();

    const {
        values,
        // setValues,
        handleInputChange
      } = useForm(initialFValues);

    return (
        <>
        <Paper className={classes.pageContent}>
        <h1 style={styles.center}>Company & Contact Details</h1>
          <Form>
            <Grid container spacing={3}>
                  <Grid item xs={12}>
                      <Controls.Input
                          name="companyname"
                          label="Company Name"
                          value={values.companyname}
                          onChange={handleInputChange}
                      />
                  </Grid>
                  <Grid item xs={6}>
                      <Controls.Input
                          name="addressline1"
                          label="Address Line 1"
                          value={values.addressline1}
                          onChange={handleInputChange}
                      />
                      <Controls.Input
                          name="city"
                          label="City"
                          value={values.city}
                          onChange={handleInputChange}
                      />
                      <Controls.Input
                          name="postalcode"
                          label="Postal Code"
                          value={values.postalcode}
                          onChange={handleInputChange}
                      />
                      <Controls.Input
                          label="Telephone"
                          name="telephone"
                          value={values.telephone}
                          onChange={handleInputChange}
                      />
                      <Controls.Select
                          name="contactpersondesig"
                          label="Contact Person Designation"
                          value={values.contactpersondesig}
                          onChange={handleInputChange}
                          options={vendorService.getTypeOfSupplierCollection()}
                      />
                      <Controls.Input
                          name="companywebsite"
                          label="Company Website"
                          value={values.companywebsite}
                          onChange={handleInputChange}
                      />
                  </Grid>
                  <Grid item xs={6}>
                      <Controls.Input
                          name="addressline2"
                          label="Address Line 2"
                          value={values.addressline2}
                          onChange={handleInputChange}
                      />
                      <Controls.Select
                          name="state"
                          label="State"
                          value={values.state}
                          onChange={handleInputChange}
                          options={vendorService.getStateCollection()}
                      />
                      <Controls.Input
                          name="country"
                          label="Country"
                          value={values.country}
                          onChange={handleInputChange}
                      />
                      <Controls.Input
                          label="fax"
                          name="fax"
                          value={values.fax}
                          onChange={handleInputChange}
                      />
                      <Controls.Select
                          name="designation"
                          label="Designation"
                          value={values.designation}
                          onChange={handleInputChange}
                          options={vendorService.getProdSegNameCollection()}
                      />
                      <Controls.Input
                          label="Email"
                          name="email"
                          value={values.email}
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
      </>
    )
}
