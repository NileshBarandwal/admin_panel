import React from 'react'
import { Paper, Grid, makeStyles } from '@material-ui/core';
import Controls from "../../../components/controls/Controls";
import { useForm, Form } from '../../../components/useForm';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    }
}))

const initialFValues = {
    id: 0,
    orgname: '',
    contactpersoname: '',
    bankaddress: '',
    telephone: '',
    email: '',
    orgregaddress: '',
    boardnumber: '',
}

function Section2(props) {
    const { addOrEdit } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('orgname' in fieldValues)
            temp.orgname = fieldValues.orgname ? "" : "This field is required."
        if ('contactpersoname' in fieldValues)
            temp.contactpersoname = fieldValues.contactpersoname ? "" : "This field is required."
        if ('bankaddress' in fieldValues)
            temp.bankaddress = fieldValues.bankaddress ? "" : "This field is required."
        if ('telephone' in fieldValues)
            temp.telephone = fieldValues.telephone.length > 9 ? "" : "Minimum 10 numbers required."
        if ('boardnumber' in fieldValues)
            temp.boardnumber = fieldValues.boardnumber.length > 9 ? "" : "Minimum 10 numbers required."    
        if ('email' in fieldValues)
            temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."    
        if ('bankaccname' in fieldValues)
            temp.bankaccname = fieldValues.bankaccname ? "" : "This field is required."
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
            <Form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Controls.Input
                        name="orgname"
                        label="Organization Name"
                        value={values.bankname}
                        onChange={handleInputChange}
                        error={errors.bankname}
                    />
                    <Controls.Input
                        name="contactpersoname"
                        label="Contact Person Name"
                        value={values.contactpersoname}
                        onChange={handleInputChange}
                        error={errors.contactpersoname}
                    />
                    <Controls.Input
                        label="Telephone"
                        name="Contact Number"
                        value={values.telephone}
                        onChange={handleInputChange}
                        error={errors.telephone}
                    />
                    <Controls.Input
                        label="Contact Email ID(of Customer Admin)"
                        name="email"
                        value={values.email}
                        onChange={handleInputChange}
                        error={errors.email}
                    />
                    <Controls.Input
                        name="orgregaddress"
                        label="Organization Register Address"
                        value={values.orgregaddress}
                        onChange={handleInputChange}
                        error={errors.orgregaddress}
                    />
                    <Controls.Input
                        name="bankaccname"
                        label="Bank Account Name"
                        value={values.bankaccname}
                        onChange={handleInputChange}
                        error={errors.bankaccname}
                    />
                    <Controls.Input
                        name="boardnumber"
                        label="Board Number"
                        value={values.boardnumber}
                        onChange={handleInputChange}
                        error={errors.boardnumber}
                    />
                    <Grid item xs={3} style={{margin: '1% 0 1% 1%'}}>
                        <Typography variant="subtitle1" gutterBottom align="left">Upload Organization Logo</Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <Grid item xs={12}>
                            <Controls.Input
                                name=""
                                label=""
                                onChange={handleInputChange}
                                style={{width: '75%'}}
                            />
                            <Controls.Button
                                text="Upload File"
                                variant="outlined"
                                //startIcon={<AddIcon />}
                                //className={classes.secondnewButton}
                                style={{ margin: "17px 0 0 0", height:'30%'}}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <div>
                        <Controls.Button
                            type="submit"
                            text="SAVE" />
                    </div>
                </Grid>
            </Grid>
        </Form>
        </Paper>
    )
}

export default Section2