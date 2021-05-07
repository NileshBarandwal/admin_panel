import React, { useState } from 'react'
import { Paper, Grid } from '@material-ui/core';
import Controls from "../../../components/controls/Controls";
import * as vendorService from "../../../services/vendorService";

//Table
import useTable from "../../../components/useTable";
import { TableBody, TableRow, TableCell } from '@material-ui/core';

/* Table Const */
const headCells = [
    { id: 'invoicenumber', label: 'Invoice Number' },
    { id: 'invoicedate', label: 'Invoice Date' },
    { id: 'invoiceamount', label: 'Invoice Amount' },
    { id: 'duedate', label: 'Due Date' },
    { id: 'clearancedate', label: 'Payment Date' },
    { id: 'paidamt', label: 'Paid Amount' },
    { id: 'remark', label: 'Remarks' },
    // { id: 'actions', label: 'Authorized For', disableSorting: true }
  ]
  /* /Table Const */

function Section4() {

    const [records] = useState(vendorService.getAllVendors())
    const [filterFn] = useState({ fn: items => { return items; } })

    const {
        TblContainer,
        TblHead,
        // TblPagination,
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
                                        <TableCell>{item.invoicenumber}</TableCell>
                                        <TableCell>{item.invoicedate}</TableCell>
                                        <TableCell>{item.invoiceamount}</TableCell>
                                        <TableCell>{item.duedate}</TableCell>
                                        <TableCell>{item.clearancedate}</TableCell>
                                        <TableCell>{item.paidamt}</TableCell>
                                        <TableCell>{item.remark}</TableCell>  
                                        {/* <TableCell>
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
                                        </TableCell> */}
                                    </TableRow>)
                                )
                            }
                        </TableBody>
                    </TblContainer>
                </Paper>
                    {/* <Controls.Button
                        text="Add New Product"
                        variant="outlined"
                        startIcon={<AddIcon />}
                        className={classes.newButton}
                        onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
                     /> */}
                {/* <Popup
                    title="ADD NEW PRODUCT"
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup}
                >
                    <AddNewVendor
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
                /> */}
                </Grid>
                <Grid item xs={12}>
                    <div>
                        <Controls.Button
                            type="submit"
                            text="SAVE" />
                    </div>
                </Grid>
            </Grid>
    )
}

export default Section4