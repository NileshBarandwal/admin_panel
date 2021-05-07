import React, { useState } from 'react'
import { Paper, Grid } from '@material-ui/core';
import * as vendorService from "../../../services/vendorService";
import Section2Form from "./Section2Form";

//Table
import useTable from "../../../components/useTable";
import { TableBody, TableRow, TableCell } from '@material-ui/core';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import Notification from "../../../components/Notification";
import ConfirmDialog from "../../../components/ConfirmDialog";
import Controls from "../../../components/controls/Controls";
import Popup from "../../../components/Popup";

/* Table Const */
const headCells = [
    { id: 'vendorcode', label: 'Auction Code' },
    { id: 'vendorName', label: 'Auction Name' },
    { id: 'officeaddress', label: 'Office Address' },
    { id: 'officetype', label: 'Office Type' },
    { id: 'contactperson', label: 'Contact Person' },
    { id: 'contactnumber', label: 'Contact Number' },
    { id: 'email', label: 'Contact Email ID' },
    { id: 'actions', label: 'Action', disableSorting: true }
  ]
  /* /Table Const */

function Section2() {

    const [recordForEdit, setRecordForEdit] = useState(null)
    const [records, setRecords] = useState(vendorService.getAllVendors())
    const [filterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })

    const {
        TblContainer,
        TblHead,
        TblPagination,
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
                                        <TableCell>{item.vendorcode}</TableCell>
                                        <TableCell>{item.vendorName}</TableCell>
                                        <TableCell>{item.officeaddress}</TableCell>
                                        <TableCell>{item.officetype}</TableCell>
                                        <TableCell>{item.contactperson}</TableCell>
                                        <TableCell>{item.contactnumber}</TableCell>
                                        <TableCell>{item.email}</TableCell>
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
                  <TblPagination />
                </Paper>
                <Popup
                    title="SUPPLIER MANAGEMENTN - NEW VENDOR REGISTRATION"
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup}
                >
                    <Section2Form
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
            </Grid>
    )
}

export default Section2