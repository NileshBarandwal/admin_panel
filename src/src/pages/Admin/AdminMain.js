import React, { useState } from 'react'
import CustomerOnboarding from "./CustomerOnboarding";
import PageHeader from "../../components/PageHeader";
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import useTable from "../../components/useTable";
import * as vendorService from "../../services/vendorService";
import Controls from "../../components/controls/Controls";
import Popup from "../../components/Popup";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import Notification from "../../components/Notification";
import ConfirmDialog from "../../components/ConfirmDialog";
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    searchInput: {
        width: '75%'
    },
    newButton: {
        position: 'relative',
        left: '-25px',
    },
    customeronboardingbtn: {
        position: 'relative',
        display: 'flex',
    },
    secondnewButton: {
        position: 'relative',
        left: '-25px',
    }
}))


const headCells = [
    { id: 'customercode', label: 'Customer Code' },
    { id: 'orgname', label: 'Customer Organization Name' },
    { id: 'orgaddress', label: 'Location' },
    { id: 'onboarding', label: 'Onboarding Date' },
    { id: 'bdtd', label: 'Business Done Till Date'},
    { id: 'pendingpayment', label: 'Pending Payment'},
    { id: 'actions', label: 'Actions', disableSorting: true }
]

export default function AdminMain() {

    const classes = useStyles();
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [records, setRecords] = useState(vendorService.getAllVendors())
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })

    const {
        TblContainer,
        TblHead,
        recordsAfterPagingAndSorting
    } = useTable(records, headCells, filterFn);

    const addOrEdit = (customeronboarding, resetForm) => {
        if (customeronboarding.id == 0)
            vendorService.insertVendor(customeronboarding)
        else
            vendorService.updateVendor(customeronboarding)
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
        <>
            <PageHeader
                title="SUPPLIER MANAGEMENT"
                subTitle="ADMIN HOME PAGE"
                icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
            />
            <Paper className={classes.pageContent}>

                <Toolbar>
                    <Controls.Button
                        text="Home"
                        variant="outlined"
                        className={classes.newButton}
                     />
                    <Controls.Button
                        text="Manage Customer"
                        variant="outlined"
                        // startIcon={<AddIcon />}
                        className={classes.newButton}
                        // onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
                     />
                    <Controls.Button
                        text="Bill Center"
                        variant="outlined"
                        //startIcon={<AddIcon />}
                        className={classes.secondnewButton}
                        // onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
                    />
                </Toolbar>
                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting().map(item =>
                                (<TableRow key={item.id}>
                                    <TableCell>{item.customercode}</TableCell>
                                    <TableCell>{item.orgname}</TableCell>
                                    <TableCell>{item.orgaddress}</TableCell>
                                    <TableCell>{item.onboarding}</TableCell>
                                    <TableCell>{item.bdtd}</TableCell>
                                    <TableCell>{item.enrollstatus}</TableCell>
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
                <Controls.Button
                        text="Customer Onboarding"
                        variant="outlined"
                        startIcon={<AddIcon />}
                        className={classes.customeronboardingbtn}
                        onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
                />
            </Paper>
            <Popup
                title="CUSTOMER ONBOARDING"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <CustomerOnboarding
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
        </>
    )
}
