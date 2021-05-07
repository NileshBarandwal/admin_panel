import React from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../../components/controls/Controls";
import { useForm, Form } from '../../../components/useForm';

const initialFValues = {
    id: 0,
    locname: '',
    address: '',
    contactperson: '',
    contactnum: '',
    email: '',
}

export default function AddNewLocation(props) {
    const { addOrEdit } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('locname' in fieldValues)
            temp.locname = fieldValues.locname.length ? "" : "This field is required."
        if ('address' in fieldValues)
            temp.address = fieldValues.address.length ? "" : "This field is required."
        if ('contactperson' in fieldValues)
            temp.contactperson = fieldValues.contactperson.length ? "" : "This field is required."
        if ('contactnum' in fieldValues)
            temp.contactnum = fieldValues.contactnum.length > 9 ? "" : "Minimum 10 numbers required."
        if ('email' in fieldValues)
            temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
            
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
                        name="locname"
                        label="Location Name"
                        value={values.locname}
                        onChange={handleInputChange}
                        error={errors.locname}
                    />
                    <Controls.Input
                        name="address"
                        label="Address"
                        value={values.address}
                        onChange={handleInputChange}
                        error={errors.address}
                    />
                    <Controls.Input
                        name="contactperson"
                        label="Contact Person"
                        value={values.contactperson}
                        onChange={handleInputChange}
                        error={errors.contactperson}
                    />
                    <Controls.Input
                        name="contactnum"
                        label="Contact Number"
                        value={values.contactnum}
                        onChange={handleInputChange}
                        error={errors.contactnum}
                    />
                    <Controls.Input
                        name="email"
                        label="Email"
                        value={values.email}
                        onChange={handleInputChange}
                        error={errors.email}
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
