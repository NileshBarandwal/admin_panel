import React, { useState } from 'react'
import PageHeader from "../../../components/PageHeader";
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import useTable from "../../../components/useTable";
import * as vendorService from "../../../services/vendorService";
import Controls from "../../../components/controls/Controls";
import { Search } from "@material-ui/icons";
import AddIcon from '@material-ui/icons/Add';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';

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
    { id: 'vendorName', label: 'Vendor Code' },
    { id: 'conactperson', label: 'Vendor Name' },
    { id: 'contactnumber', label: 'Office Address' },
    { id: 'email', label: 'Office Type' },
    { id: 'state', label: 'Supplier Categort'},
    { id: 'typeofsupplier', label: 'Client'},
    { id: 'prodsegname', label: 'Supplier'},
    { id: 'vendorcode', label: 'Business Till Date(in Mn)'},
    { id: 'selectapprover', label: 'Emrollment Status'},
    { id: 'actions', label: 'Actions', disableSorting: true }
]

export default function ApproverHomeTable() {

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
                if (target.value == "")
                    return items;
                else
                    return items.filter(x => x.fullName.toLowerCase().includes(target.value))
            }
        })
    }

    return (
        <>
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
                    {/* <Controls.Button
                        text="Enroll Vendor"
                        variant="outlined"
                        startIcon={<AddIcon />}
                        className={classes.newButton}
                     />
                    <Controls.Button
                        text="eVA"
                        variant="outlined"
                        //startIcon={<AddIcon />}
                        className={classes.secondnewButton}
                    /> */}
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
                                            color="primary">
                                            <EditOutlinedIcon fontSize="small" />
                                        </Controls.ActionButton>
                                        <Controls.ActionButton
                                            color="secondary">
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
        </>
    )
}
