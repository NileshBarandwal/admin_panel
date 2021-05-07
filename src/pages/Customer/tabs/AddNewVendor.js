import React from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../../components/controls/Controls";
import { useForm, Form } from '../../../components/useForm';
import * as vendorService from "../../../services/vendorService";

const initialFValues = {
    id: 0,
    rolename: '',
    name: '',
    mobilenumber: '',
    email: '',
}

export default function EmployeeForm(props) {
    const { addOrEdit } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('rolename' in fieldValues)
            temp.rolename = fieldValues.rolename.length !== 0 ? "" : "This field is required."
        if ('name' in fieldValues)
            temp.name = fieldValues.name.length ? "" : "This field is required."
        if ('mobilenumber' in fieldValues)
            temp.mobilenumber = fieldValues.mobilenumber.length > 9 ? "" : "Minimum 10 numbers required."
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
                    <Controls.Select
                        name="rolename"
                        label="Role Name"
                        value={values.rolename}
                        onChange={handleInputChange}
                        options={vendorService.getrolenameCollection()}
                        error={errors.rolename}
                    />
                    <Controls.Input
                        name="name"
                        label="Name"
                        value={values.name}
                        onChange={handleInputChange}
                        error={errors.name}
                    />
                    <Controls.Input
                        name="mobilenumber"
                        label="Mobile Number"
                        value={values.mobilenumber}
                        onChange={handleInputChange}
                        error={errors.mobilenumber}
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
