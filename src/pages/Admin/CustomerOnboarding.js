import React from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/useForm';
import * as vendorService from "../../services/vendorService";

const initialFValues = {
    id: 0,
    orgname: '',
    addressline1: '',
    addressline2: '',
    city: '',
    postcode: '',
    state: '',
    telephone: '',
    companywebsite: '',
    contactperson: '',
    contactnumber: '',
    email: '',
    designation: '',
    industrytype: '',
    annualrevenue: '',
    numofemployee: '',
    gstnum: '',
    panNum: '',
}

export default function CustomerOnboarding(props) {
    const { addOrEdit } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('orgname' in fieldValues)
            temp.orgname = fieldValues.orgname ? "" : "This field is required."
        if ('addressline1' in fieldValues)
            temp.addressline1 = fieldValues.addressline1 ? "" : "This field is required."
        if ('addressline2' in fieldValues)
            temp.addressline2 = fieldValues.addressline2 ? "" : "This field is required."
        if ('city' in fieldValues)
            temp.city = fieldValues.city ? "" : "This field is required."
        if ('telephone' in fieldValues)
            temp.telephone = fieldValues.telephone > 9 ? "" : "Minimum 10 numbers required."
        if ('companywebsite' in fieldValues)
            temp.companywebsite = fieldValues.companywebsite ? "" : "This field is required."
        if ('contactperson' in fieldValues)
            temp.contactperson = fieldValues.contactperson ? "" : "This field is required."    
        if ('email' in fieldValues)
            temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
        if ('contactnumber' in fieldValues)
            temp.contactnumber = fieldValues.contactnumber.length > 9 ? "" : "Minimum 10 numbers required."
        if ('industrytype' in fieldValues)
            temp.industrytype = fieldValues.industrytype.length !== 0 ? "" : "This field is required."
        if ('designation' in fieldValues)
            temp.designation = fieldValues.designation.length !== 0 ? "" : "This field is required."
        if ('annualrevenue' in fieldValues)
            temp.annualrevenue = fieldValues.annualrevenue ? "" : "This field is required."
        if ('numofemployee' in fieldValues)
            temp.numofemployee = fieldValues.numofemployee ? "" : "This field is required."
        if ('gstnum' in fieldValues)
            temp.gstnum = fieldValues.gstnum ? "" : "This field is required."
        if ('gstnum' in fieldValues)
            temp.gstnum = fieldValues.gstnum ? "" : "This field is required."
        if ('panNum' in fieldValues)
            temp.panNum = fieldValues.panNum ? "" : "This field is required."
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

    // useEffect(() => {
    //     if (recordForEdit != null)
    //         setValues({
    //             ...recordForEdit
    //         })
    // }, [recordForEdit])

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Controls.Input
                        name="orgname"
                        label="Organization Name"
                        value={values.orgname}
                        onChange={handleInputChange}
                        error={errors.orgname}
                    />
                    <Controls.Input
                        name="addressline1"
                        label="Address Line 1"
                        value={values.addressline1}
                        onChange={handleInputChange}
                        error={errors.addressline1}
                    />
                    <Controls.Input
                        name="addressline2"
                        label="Address Line 2"
                        value={values.addressline2}
                        onChange={handleInputChange}
                        error={errors.addressline2}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Controls.Input
                        name="city"
                        label="City"
                        value={values.city}
                        onChange={handleInputChange}
                        error={errors.city}
                    />
                    <Controls.Select
                        name="state"
                        label="State"
                        value={values.state}
                        onChange={handleInputChange}
                        options={vendorService.getStateCollection()}
                        error={errors.city}
                    />
                    <Controls.Input
                        name="contactperson"
                        label="Conact Person Name"
                        value={values.contactperson}
                        onChange={handleInputChange}
                        error={errors.contactperson}
                    />
                    <Controls.Input
                        name="designation"
                        label="Designation"
                        value={values.designation}
                        onChange={handleInputChange}
                        error={errors.designation}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Controls.Input
                        label="Postal Code"
                        name="postcode"
                        value={values.postcode}
                        onChange={handleInputChange}
                        error={errors.postcode}
                    />
                    <Controls.Input
                        name="telephone"
                        label="Telephone"
                        value={values.telephone}
                        onChange={handleInputChange}
                        error={errors.telephone}
                    />
                    <Controls.Input
                        label="Contact Number"
                        name="contactnumber"
                        value={values.contactnumber}
                        onChange={handleInputChange}
                        error={errors.contactnumber}
                    />
                    <Controls.Input
                        label="Email"
                        name="email"
                        value={values.email}
                        onChange={handleInputChange}
                        error={errors.email}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Controls.Input
                        label="Company Website"
                        name="companywebsite"
                        value={values.companywebsite}
                        onChange={handleInputChange}
                        error={errors.companywebsite}
                    />
                    <Controls.Select
                        name="industrytype"
                        label="Industry Type"
                        value={values.industrytype}
                        onChange={handleInputChange}
                        options={vendorService.getTypeOfSupplierCollection()}
                        error={errors.industrytype}
                    />
                    <Controls.Input
                        label="Annual Revenu"
                        name="annualrevenue"
                        value={values.annualrevenue}
                        onChange={handleInputChange}
                        error={errors.annualrevenue}
                    />
                    <Controls.Input
                        label="Number Of Employee"
                        name="numofemployee"
                        value={values.numofemployee}
                        onChange={handleInputChange}
                        error={errors.numofemployee}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Controls.Input
                        name="gstnum"
                        label="GST Number"
                        value={values.gstnum}
                        onChange={handleInputChange}
                        error={errors.gstnum}
                    />
                    <Controls.Input
                        name="panNum"
                        label="PAN Number"
                        value={values.panNum}
                        onChange={handleInputChange}
                        error={errors.panNum}
                    />
                    <div>
                        <Controls.Button
                            type="submit"
                            text="SEND" />
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
