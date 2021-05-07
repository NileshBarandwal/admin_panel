import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/useForm';
import * as vendorService from "../../services/vendorService";

const initialFValues = {
    id: 0,
    orgname: '',
    orgaddress: '',
    contactperson: '',
    contactnumber: '',
    email: '',
    industrytype: '',
}

export default function CustomerOnboarding(props) {
    const { addOrEdit, recordForEdit } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('orgname' in fieldValues)
            temp.orgname = fieldValues.orgname ? "" : "This field is required."
        if ('orgaddress' in fieldValues)
            temp.orgaddress = fieldValues.orgaddress ? "" : "This field is required."
        if ('contactperson' in fieldValues)
            temp.contactperson = fieldValues.contactperson ? "" : "This field is required."    
        if ('email' in fieldValues)
            temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
        if ('contactnumber' in fieldValues)
            temp.contactnumber = fieldValues.contactnumber.length > 9 ? "" : "Minimum 10 numbers required."
        if ('industrytype' in fieldValues)
            temp.industrytype = fieldValues.industrytype.length != 0 ? "" : "This field is required."
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        setValues,
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

    useEffect(() => {
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <Controls.Input
                        name="orgname"
                        label="Organization Name"
                        value={values.orgname}
                        onChange={handleInputChange}
                        error={errors.orgname}
                    />
                    <Controls.Input
                        name="contactperson"
                        label="Conact Person Name"
                        value={values.contactperson}
                        onChange={handleInputChange}
                        error={errors.contactperson}
                    />
                    <Controls.Input
                        label="Email"
                        name="email"
                        value={values.email}
                        onChange={handleInputChange}
                        error={errors.email}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Controls.Input
                        name="orgaddress"
                        label="Organization Address"
                        value={values.orgaddress}
                        onChange={handleInputChange}
                        error={errors.orgaddress}
                    />
                    <Controls.Input
                        label="Contact Number"
                        name="contactnumber"
                        value={values.contactnumber}
                        onChange={handleInputChange}
                        error={errors.contactnumber}
                    />
                    <Controls.Select
                        name="industrytype"
                        label="Industry Type"
                        value={values.industrytype}
                        onChange={handleInputChange}
                        options={vendorService.getStateCollection()}
                        error={errors.industrytype}
                    />
                    <div>
                        <Controls.Button
                            type="submit"
                            text="Submit" />
                        <Controls.Button
                            text="Reset"
                            color="default"
                            onClick={resetForm} />
                    </div>
                </Grid>
            </Grid>
        </Form>
    )
}
