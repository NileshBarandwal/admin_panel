import React from 'react'
import { Grid, makeStyles } from '@material-ui/core';
import Controls from "../../../components/controls/Controls";
import { useForm, Form } from '../../../components/useForm';
import * as vendorService from "../../../services/vendorService";

const useStyles = makeStyles(theme => ({
    // pageContent: {
    //     margin: theme.spacing(5),
    //     padding: theme.spacing(3)
    // },
    center: {
     textAlign: 'center',
    },
    pageContent: {
      margin: '0px',
      padding: '14px 24px 0 0'
    },
}))

const initialFValues = {
    id: 0,
    orgname: '',
    orgaddress: '',
    contactperson: '',
    contactnumber: '',
    mobilenumber: '',
    email: '',
    industrytype: '',
}

    // const handleSubmit = e => {
    //     e.preventDefault()
    //     if (validate()) {
    //         addOrEdit(values, resetForm);
    //     }
    // }

function Section1() {

    const classes = useStyles();

        const {
        values,
        // setValues,
        handleInputChange
      } = useForm(initialFValues);

    return (
            <Form>
            <Grid className={classes.pageContent} container spacing={3}>
                <Grid item xs={12}>
                    <Controls.Input
                        name="orgname"
                        label="Organization Name"
                        value={values.orgname}
                        onChange={handleInputChange}
                    />
                    <Controls.Input
                        name="orgaddress"
                        label="Organization Address"
                        value={values.orgaddress}
                        onChange={handleInputChange}
                    />
                    <Controls.Input
                        name="contactperson"
                        label="Contact Person"
                        value={values.contactperson}
                        onChange={handleInputChange}
                    />
                    <Controls.Input
                        label="Contact Number"
                        name="contactnumber"
                        value={values.contactnumber}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Controls.Input
                        label="Mobile Number"
                        name="mobilenumber"
                        value={values.mobilenumber}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Controls.Input
                        label="Email"
                        name="email"
                        value={values.email}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Controls.Select
                        name="industrytype"
                        label="Industry Type"
                        value={values.industrytype}
                        onChange={handleInputChange}
                        options={vendorService.getTypeOfSupplierCollection()}
                    />
                    <div className={classes.center}>
                        <Controls.Button
                            type="button"
                            text="EDIT" />
                        <Controls.Button
                            type="submit"
                            text="SAVE" />
                    </div> 
                </Grid>
            </Grid>
        </Form>
    )
}

export default Section1