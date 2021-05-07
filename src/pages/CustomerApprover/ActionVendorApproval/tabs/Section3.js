import React from 'react'
import { Paper, Grid, makeStyles } from '@material-ui/core';
import Controls from "../../../../components/controls/Controls";
import { useForm, Form } from '../../../../components/useForm';
import styles from './styles'

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    }
}))

// const genderItems = [
//     { id: 'trader', title: 'Trader' },
//     { id: 'manufacturer', title: 'Manufacturer' },
//     { id: 'serviceprovider', title: 'Service Provider' },
// ]

const initialFValues = {
    id: 0,
    bankname: '',
    bankaddress: '',
    bankaccname: '',
    swift: '',
    branchname: '',
    telephone: '',
    fax: '',
    bankaccnumber: '',
    currency: '',
    remark: '',
    // hireDate: new Date(),
    // isPermanent: false,
}

export default function Section3(props) {
    const { addOrEdit } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('bankname' in fieldValues)
            temp.bankname = fieldValues.bankname ? "" : "This field is required."
        if ('bankaddress' in fieldValues)
            temp.bankaddress = fieldValues.bankaddress ? "" : "This field is required."
        if ('bankaccname' in fieldValues)
            temp.bankaccname = fieldValues.bankaccname ? "" : "This field is required."
        if ('swift' in fieldValues)
            temp.swift = fieldValues.swift ? "" : "This field is required."
        if ('branchname' in fieldValues)
            temp.branchname = fieldValues.branchname ? "" : "This field is required."
        if ('telephone' in fieldValues)
            temp.telephone = fieldValues.telephone.length > 9 ? "" : "Minimum 10 numbers required."
        if ('fax' in fieldValues)
            temp.fax = fieldValues.fax.length > 5 ? "" : "Minimum 6 numbers required."
        if ('bankaccnumber' in fieldValues)
            temp.bankaccnumber = fieldValues.bankaccnumber ? "" : "This field is required."
        if ('currency' in fieldValues)
            temp.currency = fieldValues.currency ? "" : "This field is required."
        if ('remark' in fieldValues)
            temp.remark = fieldValues.remark ? "" : "This field is required."
        
        setErrors({
            ...temp
        })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }

    const {
        values,
        // setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            addOrEdit(values, resetForm);
        }
    }

    //

    // useEffect(() => {
    //     if (recordForEdit != null)
    //         setValues({
    //             ...recordForEdit
    //         })
    // }, [recordForEdit])

    const classes = useStyles();

    return (
        <Paper className={classes.pageContent}>
            <h1 style={styles.center}>Banking Details</h1>
            <Form onSubmit={handleSubmit}>
              
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <Controls.Input
                        name="bankname"
                        label="Bank Name"
                        value={values.bankname}
                        onChange={handleInputChange}
                    />
                    <Controls.Input
                        name="bankaddress"
                        label="Bank Address"
                        value={values.bankaddress}
                        onChange={handleInputChange}
                    />
                    <Controls.Input
                        name="bankaccname"
                        label="Bank Account Name"
                        value={values.bankaccname}
                        onChange={handleInputChange}
                    />
                    <Controls.Input
                        name="swift"
                        label="Swift/Bank Identifier Code"
                        value={values.swift}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Controls.Input
                        name="branchname"
                        label="Branch Name"
                        value={values.branchname}
                        onChange={handleInputChange}
                    />
                    <Controls.Input
                        label="Telephone"
                        name="telephone"
                        value={values.telephone}
                        onChange={handleInputChange}
                    />
                    <Controls.Input
                        label="fax"
                        name="fax"
                        value={values.fax}
                        onChange={handleInputChange}
                    />
                    <Controls.Input
                        name="bankaccnumber"
                        label="Bank Account Number"
                        value={values.bankaccnumber}
                        onChange={handleInputChange}
                    />
                    <Controls.Input
                        name="currency"
                        label="Currency"
                        value={values.currency}
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
