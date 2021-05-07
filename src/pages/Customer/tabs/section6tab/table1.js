import React, { useState } from 'react'
import { Paper } from '@material-ui/core';
import * as vendorService from "../../../../services/vendorService";

//Table
import useTable from "../../../../components/useTable";
import { TableBody, TableRow, TableCell } from '@material-ui/core';

/* Table Const */
const headCells = [
    { id: 'numofvendors', label: 'Number of Vendors' },
    { id: 'charges', label: 'Charges' },
    // { id: 'actions', label: 'Authorized For', disableSorting: true }
  ]
  /* /Table Const */

function Table1() {

    const [records] = useState(vendorService.getAllVendors())
    const [filterFn] = useState({ fn: items => { return items; } })

    const {
        TblContainer,
        TblHead,
        recordsAfterPagingAndSorting
    } = useTable(records, headCells, filterFn);

    return (
          <Paper>
                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting().map(item =>
                                (<TableRow key={item.id}>
                                    <TableCell>{item.numofvendors}</TableCell>
                                    <TableCell>{item.charges}</TableCell>
                                </TableRow>)
                            )
                        }
                    </TableBody>
                </TblContainer>
            </Paper>
    )
}

export default Table1