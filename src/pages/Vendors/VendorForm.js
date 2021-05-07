import React from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/useForm';
import * as vendorService from "../../services/vendorService";


// const genderItems = [
//     { id: 'trader', title: 'Trader' },
//     { id: 'manufacturer', title: 'Manufacturer' },
//     { id: 'serviceprovider', title: 'Service Provider' },
// ]

const initialFValues = {
    id: 0,
    vendorName: '',
    conactperson: '',
    contactnumber: '',
    email: '',
    state: '',
    typeofsupplier: '',
    prodsegname: '',
    vendorcode: '',
    selectapprover: '',
    // hireDate: new Date(),
    // isPermanent: false,
}

export default function EmployeeForm(props) {
    const { addOrEdit } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('vendorName' in fieldValues)
            temp.vendorName = fieldValues.vendorName ? "" : "This field is required."
        if ('conactperson' in fieldValues)
            temp.conactperson = fieldValues.conactperson ? "" : "This field is required."
        if ('email' in fieldValues)
            temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
        if ('contactnumber' in fieldValues)
            temp.contactnumber = fieldValues.contactnumber.length > 9 ? "" : "Minimum 10 numbers required."
        if ('state' in fieldValues)
            temp.state = fieldValues.state.length !== 0 ? "" : "This field is required."
        if ('typeofsupplier' in fieldValues)
            temp.typeofsupplier = fieldValues.typeofsupplier.length !== 0 ? "" : "This field is required."
        if ('prodsegname' in fieldValues)
            temp.prodsegname = fieldValues.prodsegname.length !== 0 ? "" : "This field is required."
        if ('vendorcode' in fieldValues)
            temp.vendorcode = fieldValues.vendorcode.length > 5 ? "" : "Minimum 10 numbers required."
        if ('selectapprover' in fieldValues)
            temp.selectapprover = fieldValues.selectapprover.length !== 0 ? "" : "This field is required."
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
                <Grid item xs={6}>
                    <Controls.Input
                        name="vendorName"
                        label="Vendor Name"
                        value={values.vendorName}
                        onChange={handleInputChange}
                        error={errors.vendorName}
                    />
                    <Controls.Input
                        name="conactperson"
                        label="Conact Person"
                        value={values.conactperson}
                        onChange={handleInputChange}
                        error={errors.conactperson}
                    />
                    <Controls.Input
                        label="Email"
                        name="email"
                        value={values.email}
                        onChange={handleInputChange}
                        error={errors.email}
                    />
                    <Controls.Input
                        label="Contact Number"
                        name="contactnumber"
                        value={values.contactnumber}
                        onChange={handleInputChange}
                        error={errors.contactnumber}
                    />
                    {/* <Controls.Input
                        label="State"
                        name="state"
                        value={values.state}
                        onChange={handleInputChange}
                    /> */}
                    <Controls.Select
                        name="state"
                        label="State"
                        value={values.state}
                        onChange={handleInputChange}
                        options={vendorService.getStateCollection()}
                        error={errors.state}
                    />
                </Grid>
                <Grid item xs={6}>
                    {/* <Controls.RadioGroup
                        name="gender"
                        label="Type Of Supplier"
                        value={values.gender}
                        onChange={handleInputChange}
                        items={genderItems}
                    /> */}
                    <Controls.Select
                        name="typeofsupplier"
                        label="Type Of Supplier"
                        value={values.typeofsupplier}
                        onChange={handleInputChange}
                        options={vendorService.getTypeOfSupplierCollection()}
                        error={errors.typeofsupplier}
                    />
                     <Controls.Select
                        name="prodsegname"
                        label="Product segment Name"
                        value={values.prodsegname}
                        onChange={handleInputChange}
                        options={vendorService.getProdSegNameCollection()}
                        error={errors.prodsegname}
                    />
                    <Controls.Input
                        name="vendorcode"
                        label="Vendor Code"
                        value={values.vendorcode}
                        onChange={handleInputChange}
                        error={errors.vendorcode}
                    />
                     <Controls.Select
                        name="selectapprover"
                        label="Select Approver"
                        value={values.selectapprover}
                        onChange={handleInputChange}
                        options={vendorService.getStateCollection()}
                        error={errors.selectapprover}
                    />
                    {/* <Controls.DatePicker
                        name="hireDate"
                        label="Hire Date"
                        value={values.hireDate}
                        onChange={handleInputChange}
                    /> */}
                    {/* <Controls.Checkbox
                        name="isPermanent"
                        label="Permanent Employee"
                        value={values.isPermanent}
                        onChange={handleInputChange}
                    /> */}

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
