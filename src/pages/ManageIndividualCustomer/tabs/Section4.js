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
    label: {
        fontSize: 'medium',
        fontWeight: 'bold',
        padding: '10px 10px 10px 10px',
        margin: '24px 0 0 0'
    },
}))

const initialFValues = {
    id: 0,
    month: '',
    daily: '',
    creditperiod: '',
}

    // const handleSubmit = e => {
    //     e.preventDefault()
    //     if (validate()) {
    //         addOrEdit(values, resetForm);
    //     }
    // }

function Section4() {

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
                    <label className={classes.label}>
                    Customer Account to be blocked for Vendor Management :
                    <Controls.Select
                        name="month"
                        label="Select"
                        value={values.month}
                        onChange={handleInputChange}
                        options={vendorService.getTypeOfSupplierCollection()}
                    />
                    </label>
                    <label className={classes.label}>
                    Customer Account to block for other events :
                    <Controls.Select
                        name="daily"
                        label="Select"
                        value={values.daily}
                        onChange={handleInputChange}
                        options={vendorService.getTypeOfSupplierCollection()}
                    />
                    </label>
                    <label className={classes.label}>
                    Customer Account to Released Automatically :
                    <Controls.Input
                        name="creditperiod"
                        label=""
                        placeholder = "When Outstanding Amount is Nill"
                        value={values.creditperiod}
                        onChange={handleInputChange}
                    />
                    </label>
                </Grid>
                <Grid item xs={12}>
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

export default Section4