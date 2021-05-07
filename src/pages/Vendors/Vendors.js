import React, { useState } from 'react'
import VendorForm from "./VendorForm";
import PageHeader from "../../components/PageHeader";
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import useTable from "../../components/useTable";
import * as vendorService from "../../services/vendorService";
import Controls from "../../components/controls/Controls";
import { Search } from "@material-ui/icons";
import AddIcon from '@material-ui/icons/Add';
import Popup from "../../components/Popup";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import Notification from "../../components/Notification";
import ConfirmDialog from "../../components/ConfirmDialog";

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    searchInput: {
        width: '75%'
    },
    newButton: {
        position: 'absolute',
        right: '8%'
    },
    secondnewButton: {
        position: 'absolute',
        right: '10px'
    }
}))


const headCells = [
    { id: 'vendorcode', label: 'Vendor Code' },
    { id: 'vendorname', label: 'Vendor Name' },
    { id: 'officeaddress', label: 'Office Address' },
    { id: 'officetype', label: 'Office Type' },
    { id: 'suppliercategory', label: 'Supplier Category'},
    { id: 'client', label: 'Client'},
    { id: 'supplier', label: 'Supplier'},
    { id: 'btdmn', label: 'Business Till Date(in Mn)'},
    { id: 'enrollstatus', label: 'Emrollment Status'},
    { id: 'actions', label: 'Actions', disableSorting: true }
]

export default function Vendors() {

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
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, headCells, filterFn);

    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value === "")
                    return items;
                else
                    return items.filter(x => x.fullName.toLowerCase().includes(target.value))
            }
        })
    }

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
        <>
            <PageHeader
                title="SUPPLIER MANAGEMENT"
                subTitle="Customer User"
                icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
            />
            <Paper className={classes.pageContent}>

                <Toolbar>
                    <Controls.Input
                        label="Search Vendors"
                        className={classes.searchInput}
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <Search />
                            </InputAdornment>)
                        }}
                        onChange={handleSearch}
                    />
                    <Controls.Button
                        text="Enroll Vendor"
                        variant="outlined"
                        startIcon={<AddIcon />}
                        className={classes.newButton}
                        onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
                     />
                    <Controls.Button
                        text="eVA"
                        variant="outlined"
                        //startIcon={<AddIcon />}
                        className={classes.secondnewButton}
                        onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
                    />
                </Toolbar>
                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting().map(item =>
                                (<TableRow key={item.id}>
                                    <TableCell>{item.vendorcode}</TableCell>
                                    <TableCell>{item.vendorname}</TableCell>
                                    <TableCell>{item.officeaddress}</TableCell>
                                    <TableCell>{item.officetype}</TableCell>
                                    <TableCell>{item.suppliercategory}</TableCell>
                                    <TableCell>{item.client}</TableCell>
                                    <TableCell>{item.supplier}</TableCell>
                                    <TableCell>{item.btdmn}</TableCell>
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
                <TblPagination />
            </Paper>
            <Popup
                title="SUPPLIER MANAGEMENTN - NEW VENDOR REGISTRATION"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <VendorForm
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
