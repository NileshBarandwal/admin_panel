import React from 'react'
import { Grid } from '@material-ui/core';
import Controls from '../../../components/controls/Controls'

//Table
import Table1 from './section6tab/table1';
import Table2 from './section6tab/table2';

function Section6() {

    return (
        <Grid container spacing={3}>
            <Grid item xs={6}>
                <Table1 />
            </Grid>
            <Grid item xs={6}>
                <Table2 />
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

export default Section6