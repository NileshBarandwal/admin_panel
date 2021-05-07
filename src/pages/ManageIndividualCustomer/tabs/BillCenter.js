import React, { useState } from 'react';
import { Paper, Grid, makeStyles, InputAdornment } from '@material-ui/core';
import * as vendorService from "../../../services/vendorService";
import Controls from "../../../components/controls/Controls";
import { Search } from "@material-ui/icons";

//Table
import useTable from "../../../components/useTable";
import { TableBody, TableRow, TableCell, Toolbar } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(2),
        padding: '24px 24px 0 0'
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

/* Table Const */
const headCells = [
    { id: 'invoicenum', label: 'Invoice Number' },
    { id: 'invoicedate', label: 'Invoice Date' },
    { id: 'invoiceamt', label: 'Invoice Amount' },
    { id: 'duedate', label: 'Due Date' },
    { id: 'outstandingamt', label: 'Outstanding Amount' },
    { id: 'amtcollection', label: 'Amount Collected' },
    { id: 'payrefnum', label: 'Payment Ref NO.' },
    { id: 'colldate', label: 'Coll Date' },
    { id: 'paymentstatus', label: 'Payment Status' },
    // { id: 'actions', label: 'Authorized For', disableSorting: true }
  ]
  /* /Table Const */

function BillCenter() {

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
                if (target.value ==="")
                    return items;
                else
                    return items.filter(x => x.fullName.toLowerCase().includes(target.value))
            }
        })
    }

    return (
            <Grid container spacing={3}>
                <Grid item xs={12}>
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
                    </Toolbar>
                    <TblContainer>
                        <TblHead />
                        <TableBody>
                            {
                                recordsAfterPagingAndSorting().map(item =>
                                    (<TableRow key={item.id}>
                                        <TableCell>{item.invoicenum}</TableCell>
                                        <TableCell>{item.invoicedate}</TableCell>
                                        <TableCell>{item.invoiceamt}</TableCell>
                                        <TableCell>{item.duedate}</TableCell>
                                        <TableCell>{item.outstandingamt}</TableCell>
                                        <TableCell>{item.amtcollection}</TableCell>
                                        <TableCell>{item.payrefnum}</TableCell>
                                        <TableCell>{item.colldate}</TableCell>
                                        <TableCell>{item.paymentstatus}</TableCell>
                                    </TableRow>)
                                )
                            }
                        </TableBody>
                    </TblContainer>
                  <TblPagination />
                </Paper>
                </Grid>
            </Grid>
    )
}

export default BillCenter