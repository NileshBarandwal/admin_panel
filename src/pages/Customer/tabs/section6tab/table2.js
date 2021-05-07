import React, { useState } from 'react'
import { Paper } from '@material-ui/core';
import * as vendorService from "../../../../services/vendorService";

//Table
import useTable from "../../../../components/useTable";
import { TableBody, TableRow, TableCell } from '@material-ui/core';

/* Table Const */
const headCells = [
    { id: 'aucamtrange', label: 'Number of Vendors' },
    { id: 'charge', label: 'Charges' },
    // { id: 'actions', label: 'Authorized For', disableSorting: true }
  ]
  /* /Table Const */

function Table2() {

    const [records] = useState(vendorService.getAllVendors())
    const [filterFn] = useState({ fn: items => { return items; } })

    const {
        TblContainer,
        TblHead,
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
          <Paper>
                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting().map(item =>
                                (<TableRow key={item.id}>
                                    <TableCell>{item.aucamtrange}</TableCell>
                                    <TableCell>{item.charge}</TableCell>
                                </TableRow>)
                            )
                        }
                    </TableBody>
                </TblContainer>
            </Paper>
    )
}

export default Table2
