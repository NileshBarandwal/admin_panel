import React, { useState } from 'react'
import { Paper, Grid, makeStyles } from '@material-ui/core';
import Controls from "../../../components/controls/Controls";
import * as vendorService from "../../../services/vendorService";

//Table
import useTable from "../../../components/useTable";
import Popup from "../../../components/Popup";
import AddNewProduct from "./AddNewVendor";
import { TableBody, TableRow, TableCell } from '@material-ui/core';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import Notification from "../../../components/Notification";
import ConfirmDialog from "../../../components/ConfirmDialog";
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    }
}))

/* Table Const */
const headCells = [
    { id: 'name', label: 'Name' },
    { id: 'number', label: 'Mobile Number' },
    { id: 'email', label: 'Email ID' },
    { id: 'locaccessto', label: 'Location access to' },
    { id: 'role', label: 'Roles' },
    { id: 'actions', label: 'Authorized For', disableSorting: true }
  ]
  /* /Table Const */

function Section3() {

    const classes = useStyles();
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [records, setRecords] = useState(vendorService.getAllVendors())
    const [filterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })

    const {
        TblContainer,
        TblHead,
        // TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, headCells, filterFn);

    // const handleSearch = e => {
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

    const addOrEdit = (employee, resetForm) => {
        if (employee.id === 0)
            vendorService.insertVendor(employee)
        else
            vendorService.updateVendor(employee)
        resetForm()
        setRecordForEdit(null)
        setOpenPopup(false)
        setRecords(vendorService.getAllVendors())
        setNotify({
            isOpen: true,
            message: 'Submitted Successfully',
            type: 'success'
        })
    }

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

    return (
            <Grid container spacing={3}>
                <Grid item xs={12}>
                <Paper>
                    <TblContainer>
                        <TblHead />
                        <TableBody>
                            {
                                recordsAfterPagingAndSorting().map(item =>
                                    (<TableRow key={item.id}>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>{item.number}</TableCell>
                                        <TableCell>{item.email}</TableCell>
                                        <TableCell>{item.locaccessto}</TableCell>
                                        <TableCell>{item.role}</TableCell>
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
                    <Controls.Button
                        text="Add New Product"
                        variant="outlined"
                        startIcon={<AddIcon />}
                        className={classes.newButton}
                        onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
                     />
                <Popup
                    title="ADD NEW PRODUCT"
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup}
                >
                    <AddNewProduct
                        recordForEdit={recordForEdit}
                        addOrEdit={addOrEdit} />
                </Popup>
                <Notification
                    notify={notify}
                    setNotify={setNotify}
                />
                <ConfirmDialog
                    confirmDialog={confirmDialog}
                    setConfirmDialog={setConfirmDialog}
                />
                </Grid>
                <Grid item xs={12}>
                    <div>
                        <Controls.Button
                            type="submit"
                            text="SAVE" />
                    </div>
                </Grid>
            </Grid>
    )
}

export default Section3