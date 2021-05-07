import React, { useState } from 'react'
import { Paper, Grid } from '@material-ui/core';
import * as vendorService from "../../../services/vendorService";

//Table
import useTable from "../../../components/useTable";
import { TableBody, TableRow, TableCell } from '@material-ui/core';

/* Table Const */
const headCells = [
    { id: 'custorgname', label: 'Customer Organiz Name' },
    { id: 'aucteventname', label: 'Auction Event Name' },
    { id: 'auctcode', label: 'Auction Code' },
    { id: 'auctdate', label: 'Auction Date' },
    { id: 'auctionvalue', label: 'Auction Value' },
    // { id: 'actions', label: 'Authorized For', disableSorting: true }
  ]
  /* /Table Const */

function Section5() {

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
                                        <TableCell>{item.custorgname}</TableCell>
                                        <TableCell>{item.aucteventname}</TableCell>
                                        <TableCell>{item.auctcode}</TableCell>
                                        <TableCell>{item.auctdate}</TableCell>
                                        <TableCell>{item.auctionvalue}</TableCell>
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

export default Section5