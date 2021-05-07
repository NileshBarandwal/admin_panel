import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../../components/controls/Controls";
import { useForm, Form } from '../../../components/useForm';
import * as vendorService from "../../../services/vendorService";

const initialFValues = {
    id: 0,
    segcode: '',
    familycode: '',
    classcode: '',
    prodbrandname: '',
}

export default function EmployeeForm(props) {
    const { addOrEdit, recordForEdit } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('segcode' in fieldValues)
            temp.segcode = fieldValues.segcode ? "" : "This field is required."
        if ('familycode' in fieldValues)
            temp.familycode = fieldValues.familycode.length != 0 ? "" : "This field is required."
        if ('classcode' in fieldValues)
            temp.classcode = fieldValues.classcode.length != 0 ? "" : "This field is required."
        if ('prodbrandname' in fieldValues)
            temp.prodbrandname = fieldValues.prodbrandname ? "" : "This field is required."
            
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
                <Grid item xs={12}>
                    <Controls.Input
                        name="segcode"
                        label="Segment Code"
                        value={values.segcode}
                        onChange={handleInputChange}
                        error={errors.segcode}
                    />
                    <Controls.Select
                        name="familycode"
                        label="Family Code"
                        value={values.familycode}
                        onChange={handleInputChange}
                        options={vendorService.getStateCollection()}
                        error={errors.familycode}
                    />
                    <Controls.Select
                        name="classcode"
                        label="Class Code"
                        value={values.classcode}
                        onChange={handleInputChange}
                        options={vendorService.getStateCollection()}
                        error={errors.classcode}
                    />
                    <Controls.Input
                        name="prodbrandname"
                        label="Product Brand Name"
                        value={values.prodbrandname}
                        onChange={handleInputChange}
                        error={errors.prodbrandname}
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
