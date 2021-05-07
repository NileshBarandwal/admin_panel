import React, { useState } from 'react'
import { Paper, Grid } from '@material-ui/core';
import * as vendorService from "../../../services/vendorService";

//Table
import useTable from "../../../components/useTable";
import { TableBody, TableRow, TableCell } from '@material-ui/core';

/* Table Const */
const headCells = [
    { id: 'auctioncode', label: 'Auction Code' },
    { id: 'auctioname', label: 'Auction Name' },
    { id: 'custorgname', label: 'Customer Organiz Name' },
    { id: 'buyername', label: 'Buyer Name' },
    { id: 'auctiontype', label: 'Auction Type' },
    { id: 'timetostart', label: 'Time to Start' },
    { id: 'startdate', label: 'Start Date' },
    { id: 'endate', label: 'End Date' },
    { id: 'status', label: 'Status' },
    // { id: 'actions', label: 'Authorized For', disableSorting: true }
  ]
  /* /Table Const */

function Section2() {

    const [records] = useState(vendorService.getAllVendors())
    const [filterFn] = useState({ fn: items => { return items; } })

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
    //             if (target.value == "")
    //                 return items;
    //             else
    //                 return items.filter(x => x.fullName.toLowerCase().includes(target.value))
    //         }
    //     })
    // }

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
                                        <TableCell>{item.auctioncode}</TableCell>
                                        <TableCell>{item.auctioname}</TableCell>
                                        <TableCell>{item.custorgname}</TableCell>
                                        <TableCell>{item.buyername}</TableCell>
                                        <TableCell>{item.auctiontype}</TableCell>
                                        <TableCell>{item.timetostart}</TableCell>
                                        <TableCell>{item.startdate}</TableCell>  
                                        <TableCell>{item.endate}</TableCell>
                                        <TableCell>{item.status}</TableCell>
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

export default Section2