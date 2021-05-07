import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Controls from "../../../../components/controls/Controls";
import Typography from '@material-ui/core/Typography';
import styles from './styles'
import * as vendorService from "../../../../services/vendorService";

// Table
import { Paper, Grid } from '@material-ui/core';
import { useForm, Form } from '../../../../components/useForm';
import useTable from "../../../../components/useTable";
import { TableBody, TableRow, TableCell } from '@material-ui/core';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    backButton: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      /* marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      */
     textAlign: 'center',
    },
    pageContent: {
      margin: theme.spacing(2),
      padding: theme.spacing(3)
  },
  buttoncontainer: {
    textAlign: 'center',
  },
  flexContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
  },
  newButton: {
      position: 'relative',
      display: 'flex',
  },
  }));
  
  const section2 = [
    { id: 'corporate', title: 'Corporate / Limited' },
    { id: 'partnership', title: 'Partnership' },
    { id: 'proprietrory', title: 'Proprietrory' },
    { id: 'other', title: 'Others(Specify)' },
  ]
  
const initialFValues = {
    id: 0,
    natureOfBusiness: '',
    yearOfEstablishment: '',
    gstnumber: '',
    numOfFullTimeEmp: '',
    pan: '',
    registrationnumber: '',
    remark: '',
  }  

/* Table Const */
const headCells = [
    { id: 'segcode', label: 'Segment Code' },
    { id: 'prodbrandname', label: 'Product Brand Name' },
    { id: 'actions', label: 'Actions', disableSorting: true }
  ]

export default function Section2() {

    const {
        values,
        // setValues,
        handleInputChange
      } = useForm(initialFValues);

    const classes = useStyles();
    const [ setRecordForEdit] = useState(null)
    const [records, setRecords] = useState(vendorService.getAllVendors())
    const [filterFn] = useState({ fn: items => { return items; } })
    const [ setOpenPopup] = useState(false)
    const [ setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    
    const {
        TblContainer,
        TblHead,
        // TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, headCells, filterFn);
  
//   const handleSearch = e => {
//     let target = e.target;
//     setFilterFn({
//         fn: items => {
//             if (target.value === "")
//                 return items;
//             else
//                 return items.filter(x => x.fullName.toLowerCase().includes(target.value))
//         }
//     })
// }

// const addOrEdit = (employee, resetForm) => {
//     if (employee.id === 0)
//         vendorService.insertVendor(employee)
//     else
//         vendorService.updateVendor(employee)
//     resetForm()
//     setRecordForEdit(null)
//     setOpenPopup(false)
//     setRecords(vendorService.getAllVendors())
//     setNotify({
//         isOpen: true,
//         message: 'Submitted Successfully',
//         type: 'success'
//     })
// }

const openInPopup = item => {
    setRecordForEdit(item)
    setOpenPopup(true)
}

const onDelete = id => {
    setConfirmDialog({
        ...confirmDialog,
        isOpen: false
    })
    vendorService.deleteEmployee(id);
    setRecords(vendorService.getAllVendors())
    setNotify({
        isOpen: true,
        message: 'Deleted Successfully',
        type: 'error'
    })
}
/*/Table*/

    return (
        <div>
        <Paper className={classes.pageContent}>
          <h1 style={styles.center}>General Information</h1>
            <Form>
              <Grid container spacing={3}>
                <Grid item xs={2} style={{ margin: "17px 0 0 0"}}>
                    <Typography variant="subtitle1" gutterBottom align="justify">Type of Business</Typography>
                </Grid>
                <Grid item xs={10}>
                    <Controls.RadioGroup
                        name="typeOfBusiness"
                        label=""
                        value={values.typeOfBusiness}
                        onChange={handleInputChange}
                        items={section2}
                    />
                </Grid>
                <Grid item xs={12}>
                <Paper>
                    <TblContainer>
                        <TblHead />
                        <TableBody>
                            {
                                recordsAfterPagingAndSorting().map(item =>
                                    (<TableRow key={item.id}>
                                        <TableCell>{item.segcode}</TableCell>
                                        <TableCell>{item.prodbrandname}</TableCell>
                                        <TableCell>
                                            <Controls.ActionButton
                                                color="primary"
                                                onClick={() => { openInPopup(item) }}>
                                                <EditOutlinedIcon fontSize="small" />
                                            </Controls.ActionButton>
                                            <Controls.ActionButton
                                                color="secondary"
                                                onClick={() => {
                                                    setConfirmDialog({
                                                        isOpen: true,
                                                        title: 'Are you sure to delete this record?',
                                                        subTitle: "You can't undo this operation",
                                                        onConfirm: () => { onDelete(item.id) }
                                                    })
                                                }}>
                                                <CloseIcon fontSize="small" />
                                            </Controls.ActionButton>
                                        </TableCell>
                                    </TableRow>)
                                )
                            }
                        </TableBody>
                    </TblContainer>
                </Paper>
                </Grid>
                <Grid item xs={6}>
                     <Controls.Select
                        name="natureOfBusiness"
                        label="Nature Of Business"
                        value={values.natureOfBusiness}
                        onChange={handleInputChange}
                        options={vendorService.getProdSegNameCollection()}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Controls.Input
                        name="yearOfEstablishment"
                        label="Year of Establishment"
                        value={values.yearOfEstablishment}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Controls.Input
                        name="gstnumber"
                        label="GST Number"
                        value={values.gstnumber}
                        onChange={handleInputChange}
                    />
                    <Controls.Input
                        name="pan"
                        label="PAN"
                        value={values.pan}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Controls.Input
                        name="numOfFullTimeEmp"
                        label="Number of Full Time Employees"
                        value={values.numOfFullTimeEmp}
                        onChange={handleInputChange}
                    />
                    <Controls.Input
                        name="registrationnumber"
                        label="Registration Number"
                        value={values.registrationnumber}
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
        </div>
    )
}
