import React, { useState } from 'react'
import { makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import useTable from "../../components/useTable";
import * as vendorService from "../../services/vendorService";
import Controls from "../../components/controls/Controls";
import { Search } from "@material-ui/icons";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import styles from './tabs/styles';

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
    { id: 'supplierName', label: 'Supplier Code' },
    { id: 'suppliername', label: 'Supplier Name' },
    { id: 'officeaddress', label: 'Office Address' },
    { id: 'officetype', label: 'Office Type' },
    { id: 'suppliercategory', label: 'Supplier Categort'},
    { id: 'client', label: 'Client'},
    { id: 'supplier', label: 'Supplier'},
    { id: 'btdmn', label: 'Business Till Date(in Mn)'},
    { id: 'enrollstatus', label: 'Emrollment Status'},
    { id: 'actions', label: 'Actions', disableSorting: true }
]

export default function HomeTable() {

    const classes = useStyles();
    const [records] = useState(vendorService.getAllVendors())
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })

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

    return (
        <>
        <div style={styles.container}>
                <Toolbar>
                    <Controls.Input
                        label="Search Supplier"
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
                                    <TableCell>{item.suppliercode}</TableCell>
                                    <TableCell>{item.supplername}</TableCell>
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
            </div>
        </>
    )
}
