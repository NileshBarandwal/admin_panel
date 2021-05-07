import React from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../../components/controls/Controls";
import { useForm, Form } from '../../../components/useForm';
import * as CustomerApproverService from "../../../services/CustomerApproverService";


// const genderItems = [
//     { id: 'trader', title: 'Trader' },
//     { id: 'manufacturer', title: 'Manufacturer' },
//     { id: 'serviceprovider', title: 'Service Provider' },
// ]

const initialFValues = {
    id: 0,
    vendorcode: '',
    vendorName: '',
    officeaddress: '',
    officetype: '',
    conactperson: '',
    contactnumber: '',
    email: '',
    // hireDate: new Date(),
    // isPermanent: false,
}

export default function EmployeeForm(props) {
    const { addOrEdit } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('vendorcode' in fieldValues)
            temp.vendorcode = fieldValues.vendorcode.length > 5 ? "" : "Minimum 6 numbers required."
        if ('vendorName' in fieldValues)
            temp.vendorName = fieldValues.vendorName ? "" : "This field is required."
        if ('conactperson' in fieldValues)
            temp.conactperson = fieldValues.conactperson ? "" : "This field is required."
        if ('email' in fieldValues)
            temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
        if ('contactnumber' in fieldValues)
            temp.contactnumber = fieldValues.contactnumber.length > 9 ? "" : "Minimum 10 numbers required."
        if ('officetype' in fieldValues)
            temp.officetype = fieldValues.officetype.length !== 0 ? "" : "This field is required."
        if ('officeaddress' in fieldValues)
            temp.officeaddress = fieldValues.officeaddress.length ? "" : "Minimum 10 numbers required."    
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
                        name="vendorcode"
                        label="Vendor Code"
                        value={values.vendorcode}
                        onChange={handleInputChange}
                        error={errors.vendorcode}
                    />
                    <Controls.Input
                        name="vendorName"
                        label="Vendor Name"
                        value={values.vendorName}
                        onChange={handleInputChange}
                        error={errors.vendorName}
                    />
                    <Controls.Input
                        name="officeaddress"
                        label="Office Address"
                        value={values.officeaddress}
                        onChange={handleInputChange}
                        error={errors.officeaddress}
                    />
                    <Controls.Select
                        name="officetype"
                        label="Type Of Supplier"
                        value={values.typeofsupplier}
                        onChange={handleInputChange}
                        options={CustomerApproverService.getofficetypeCollection()}
                        error={errors.typeofsupplier}
                    />
                </Grid>
                <Grid item xs={6}>
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
