import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Controls from "../../../../components/controls/Controls";
import * as vendorService from "../../../../services/vendorService";

import { Paper, Grid, TextField } from '@material-ui/core';
import { useForm, Form } from '../../../../components/useForm';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Check from '@material-ui/icons/Check';

//Table
import useTable from "../../../../components/useTable";
import { TableBody, TableRow, TableCell } from '@material-ui/core';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    /* marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    */
   textAlign: 'center',
  },
  pageContent: {
    margin: theme.spacing(2),
    padding: theme.spacing(3)
},
buttoncontainer: {
  textAlign: 'center',
},
flexContainer: {
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'column',
},
newButton: {
    position: 'relative',
    display: 'flex',
},
}));

const section2 = [
  { id: 'corporate', title: 'Corporate / Limited' },
  { id: 'partnership', title: 'Partnership' },
  { id: 'proprietrory', title: 'Proprietrory' },
  { id: 'other', title: 'Others(Specify)' },
]

const section4 = [
  { id: 'yes', title: 'Yes' },
  { id: 'no', title: 'No' },
]

const section6_1 = [
  { id: 'yes', title: 'Yes' },
  { id: 'no', title: 'No' },
]

const section6_2 = [
  { id: 'yes', title: 'Yes' },
  { id: 'no', title: 'No' },
]

const section8item = [
  { id: 'yes', title: 'Yes' },
  { id: 'no', title: 'No' },
]

const initialFValues = {
  id: 0,
  companyname: '',
  addressline1: '',
  addressline2: '',
  city: '',
  state: '',
  postalcode: '',
  country: '',
  telephone: '',
  fax: '',
  companywebsite: '',
  contactpersondesig: '',
  designation: '',
  email: '',
  section8: '',
  section6item1: '',
  section6item2: '',
  isAccept: false,
  natureOfBusiness: '',
  yearOfEstablishment: '',
  gstnumber: '',
  numOfFullTimeEmp: '',
  pan: '',
  registrationnumber: '',
  section4item: '',
  remark: '',
}

/* Table Const */
const headCells = [
  { id: 'segcode', label: 'Segment Code' },
  { id: 'prodbrandname', label: 'Product Brand Name' },
  { id: 'actions', label: 'Actions', disableSorting: true }
]
/* /Table Const */
function getSteps() {
  return ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
}

function HorizontalLabelPositionBelowStepper() {

  const {
    values,
    setValues,
    handleInputChange
  } = useForm(initialFValues);

  /*Table*/
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

  const addOrEdit = (employee, resetForm) => {
      if (employee.id == 0)
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
  /*/Table*/
  
  function getStepContent(stepIndex) {

    switch (stepIndex) {
      case 0:
        return (         
          <>
          <Paper className={classes.pageContent}>
          <h1>Company & Contact Details</h1>
            <Form>
              <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Controls.Input
                            name="companyname"
                            label="Company Name"
                            value={values.companyname}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Controls.Input
                            name="addressline1"
                            label="Address Line 1"
                            value={values.addressline1}
                            onChange={handleInputChange}
                        />
                        <Controls.Input
                            name="city"
                            label="City"
                            value={values.city}
                            onChange={handleInputChange}
                        />
                        <Controls.Input
                            name="postalcode"
                            label="Postal Code"
                            value={values.postalcode}
                            onChange={handleInputChange}
                        />
                        <Controls.Input
                            label="Telephone"
                            name="telephone"
                            value={values.telephone}
                            onChange={handleInputChange}
                        />
                        <Controls.Select
                            name="contactpersondesig"
                            label="Contact Person Designation"
                            value={values.contactpersondesig}
                            onChange={handleInputChange}
                            options={vendorService.getTypeOfSupplierCollection()}
                        />
                        <Controls.Input
                            name="companywebsite"
                            label="Company Website"
                            value={values.companywebsite}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Controls.Input
                            name="addressline2"
                            label="Address Line 2"
                            value={values.addressline2}
                            onChange={handleInputChange}
                        />
                        <Controls.Select
                            name="state"
                            label="State"
                            value={values.state}
                            onChange={handleInputChange}
                            options={vendorService.getStateCollection()}
                        />
                        <Controls.Input
                            name="country"
                            label="Country"
                            value={values.country}
                            onChange={handleInputChange}
                        />
                        <Controls.Input
                            label="fax"
                            name="fax"
                            value={values.fax}
                            onChange={handleInputChange}
                        />
                        <Controls.Select
                            name="designation"
                            label="Designation"
                            value={values.designation}
                            onChange={handleInputChange}
                            options={vendorService.getProdSegNameCollection()}
                        />
                        <Controls.Input
                            label="Email"
                            name="email"
                            value={values.email}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                    <Controls.Input
                            name="remark"
                            label="Remark"
                            value={values.remark}
                            onChange={handleInputChange}
                        />
                        <div>
                            <Controls.Button
                                type="submit"
                                text="Resend to Vendor with Clarfications" />
                            <Controls.Button
                                type="submit"
                                text="Reject"
                                color="Secondary" />
                            <Controls.Button
                                type="submit"
                                text="Approve" />
                        </div>
                    </Grid>
                    </Grid>
            </Form>
          </Paper>
        </>
         );
      case 1:
        return(<>
          <h1>General Information</h1>
            <Form>
              <Grid container spacing={3}>
                <Grid item xs={2} style={{ margin: "17px 0 0 0"}}>
                    <Typography variant="subtitle1" gutterBottom align="justify">Type of Business</Typography>
                </Grid>
                <Grid item xs={10}>
                    <Controls.RadioGroup
                        name="typeOfBusiness"
                        label=""
                        value={values.typeOfBusiness}
                        onChange={handleInputChange}
                        items={section2}
                    />
                </Grid>
                <Grid item xs={12}>
                <Paper>
                    <TblContainer>
                        <TblHead />
                        <TableBody>
                            {
                                recordsAfterPagingAndSorting().map(item =>
                                    (<TableRow key={item.id}>
                                        <TableCell>{item.segcode}</TableCell>
                                        <TableCell>{item.prodbrandname}</TableCell>
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
                </Paper>
                </Grid>
                <Grid item xs={6}>
                     <Controls.Select
                        name="natureOfBusiness"
                        label="Nature Of Business"
                        value={values.natureOfBusiness}
                        onChange={handleInputChange}
                        options={vendorService.getProdSegNameCollection()}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Controls.Input
                        name="yearOfEstablishment"
                        label="Year of Establishment"
                        value={values.yearOfEstablishment}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Controls.Input
                        name="gstnumber"
                        label="GST Number"
                        value={values.gstnumber}
                        onChange={handleInputChange}
                    />
                    <Controls.Input
                        name="pan"
                        label="PAN"
                        value={values.pan}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Controls.Input
                        name="numOfFullTimeEmp"
                        label="Number of Full Time Employees"
                        value={values.numOfFullTimeEmp}
                        onChange={handleInputChange}
                    />
                    <Controls.Input
                        name="registrationnumber"
                        label="Registration Number"
                        value={values.registrationnumber}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Controls.Input
                            name="remark"
                            label="Remark"
                            value={values.remark}
                            onChange={handleInputChange}
                        />
                        <div>
                            <Controls.Button
                                type="submit"
                                text="Resend to Vendor with Clarfications" />
                            <Controls.Button
                                type="submit"
                                text="Reject"
                                color="Secondary" />
                            <Controls.Button
                                type="submit"
                                text="Approve" />
                        </div>
                    </Grid>
              </Grid>
            </Form>
          </>
       );
      case 2:
        return (
          <>
          <h1>Banking Details</h1>
            <Form>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <Controls.Input
                        name="bankname"
                        label="Bank Name"
                        value={values.bankname}
                        onChange={handleInputChange}
                    />
                    <Controls.Input
                        name="bankaddress"
                        label="Bank Address"
                        value={values.bankaddress}
                        onChange={handleInputChange}
                    />
                    <Controls.Input
                        name="bankaccname"
                        label="Bank Account Name"
                        value={values.bankaccname}
                        onChange={handleInputChange}
                    />
                    <Controls.Input
                        name="swift"
                        label="Swift/Bank Identifier Code"
                        value={values.swift}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Controls.Input
                        name="branchname"
                        label="Branch Name"
                        value={values.branchname}
                        onChange={handleInputChange}
                    />
                    <Controls.Input
                        label="Telephone"
                        name="telephone"
                        value={values.telephone}
                        onChange={handleInputChange}
                    />
                    <Controls.Input
                        label="fax"
                        name="fax"
                        value={values.fax}
                        onChange={handleInputChange}
                    />
                    <Controls.Input
                        name="bankaccnumber"
                        label="Bank Account Number"
                        value={values.bankaccnumber}
                        onChange={handleInputChange}
                    />
                    <Controls.Input
                        name="currency"
                        label="Currency"
                        value={values.currency}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Controls.Input
                            name="remark"
                            label="Remark"
                            value={values.remark}
                            onChange={handleInputChange}
                        />
                        <div>
                            <Controls.Button
                                type="submit"
                                text="Resend to Vendor with Clarfications" />
                            <Controls.Button
                                type="submit"
                                text="Reject"
                                color="Secondary" />
                            <Controls.Button
                                type="submit"
                                text="Approve" />
                        </div>
                    </Grid>
            </Grid>
        </Form>
        </>
   
        );
      case 3:
        return(
       <>
       <h1>Technical Capabilities and Information on Goods / Services Offered</h1>
         <Form>
           <Grid container spacing={3}>
             <Grid item xs={8} style={{ margin: "17px 0 0 0"}}>
                 <Typography variant="subtitle1" gutterBottom align="justify">For Goods only, do those offered for supply confirm to National/International Quality Standards?</Typography>
             </Grid>
             <Grid item xs={2}>
                 <Controls.RadioGroup
                     name="section4item"
                     label=""
                     value={values.section4item}
                     onChange={handleInputChange}
                     items={section4}
                 />
             </Grid>
             <Grid item xs={2}>
             </Grid>
             <Grid item xs={3} style={{margin: '9% 0 0 0'}}>
                 <Typography variant="subtitle1" gutterBottom align="left">List at least five (5) achievements your organization has achieved in past</Typography>
             </Grid>
             <Grid item xs={9}>
               <Grid item xs={12} style={{display: 'flex'}}>
                   <Controls.Input
                       name=""
                       label=""
                       onChange={handleInputChange}
                       style={{width: '75%'}}
                   />
                   <Controls.Button
                       text="Upload File"
                       variant="outlined"
                       //startIcon={<AddIcon />}
                       //className={classes.secondnewButton}
                       style={{ margin: "17px 0 0 0", height:'30%'}}
                   />
               </Grid>
               <Grid item xs={12} style={{display: 'flex'}}>
                   <Controls.Input
                       name=""
                       label=""
                       onChange={handleInputChange}
                       style={{width: '75%'}}
                   />
                   <Controls.Button
                       text="Upload File"
                       variant="outlined"
                       //startIcon={<AddIcon />}
                       //className={classes.secondnewButton}
                       style={{ margin: "17px 0 0 0", height:'30%'}}
                   />
               </Grid>       
               <Grid item xs={12} style={{display: 'flex'}}>
                   <Controls.Input
                       name=""
                       label=""
                       onChange={handleInputChange}
                       style={{width: '75%'}}
                   />
                   <Controls.Button
                       text="Upload File"
                       variant="outlined"
                       //startIcon={<AddIcon />}
                       //className={classes.secondnewButton}
                       style={{ margin: "17px 0 0 0", height:'30%'}}
                   />
               </Grid>
               <Grid item xs={12} style={{display: 'flex'}}>
                   <Controls.Input
                       name=""
                       label=""
                       onChange={handleInputChange}
                       style={{width: '75%'}}
                   />
                   <Controls.Button
                       text="Upload File"
                       variant="outlined"
                       //startIcon={<AddIcon />}
                       //className={classes.secondnewButton}
                       style={{ margin: "17px 0 0 0", height:'30%'}}
                   />
               </Grid>
               <Grid item xs={12} style={{display: 'flex'}}>
                   <Controls.Input
                       name=""
                       label=""
                       onChange={handleInputChange}
                       style={{width: '75%'}}
                   />
                   <Controls.Button
                       text="Upload File"
                       variant="outlined"
                       //startIcon={<AddIcon />}
                       //className={classes.secondnewButton}
                       style={{ margin: "17px 0 0 0", height:'30%'}}
                   />
               </Grid>
             </Grid>
             <Grid item xs={12}>
                    <Controls.Input
                            name="remark"
                            label="Remark"
                            value={values.remark}
                            onChange={handleInputChange}
                        />
                        <div>
                            <Controls.Button
                                type="submit"
                                text="Resend to Vendor with Clarfications" />
                            <Controls.Button
                                type="submit"
                                text="Reject"
                                color="Secondary" />
                            <Controls.Button
                                type="submit"
                                text="Approve" />
                        </div>
                    </Grid>
           </Grid>
         </Form>
       </>
       );
      case 4:
        return 'This is the bit I really care about!4';
      case 5:
        return(<>
          <h1>Section 6 : Environment</h1>
            <Form>
              <Grid container spacing={3}>
                <Grid item xs={10} style={{ margin: "17px 0 0 0"}}>
                    <Typography variant="subtitle1" gutterBottom align="justify">Does your Company have a written Statement of its Environmental Policy? (If yes, please attach a Copy)</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Controls.RadioGroup
                        name="section6_1"
                        label=""
                        value={values.section6item1}
                        onChange={handleInputChange}
                        items={section6_1}
                    />
                </Grid>
                <Grid item xs={10} style={{ margin: "17px 0 0 0"}}>
                    <Typography variant="subtitle1" gutterBottom align="justify">Does your organisation hold any accreditation such as ISO 14001 related to the environment?</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Controls.RadioGroup
                        name="section6_1"
                        label=""
                        value={values.section6item2}
                        onChange={handleInputChange}
                        items={section6_2}
                    />
                </Grid>
              </Grid>
            </Form>
          </>
       );
      case 6:
        return(<>
          <h1>Section 7 : ___________ Supplier Code of Conduct</h1>
            <Form>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="subtitle1" gutterBottom align="justify">Vendor who wish to do business with ____________ are required to comply with the our Supplier Code of Conduct. Please download and read the ____________Supplier Code of Conduct.</Typography>
                </Grid>
                <Grid item xs={1}>
                    <Controls.Checkbox
                        name="isAccept"
                        label=""
                        value={values.isAccept}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={11} style={{ margin: "15px 0 0 0"}}>
                <Typography variant="subtitle1" gutterBottom align="justify">I accept the conditions specified under Supplier Code of Conduct.</Typography>
                </Grid>
              </Grid>
            </Form>
          </>
        );
      case 7:
        return(  <>
          <h1>Section 8 : Official not to benefit</h1>
            <Form>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="subtitle1" gutterBottom align="justify">By signing this VRF, potential vendors confirm that they have read, understood and will comply with the _________ policy on the “zero tolerance” that strictly prohibits the acceptance of any type of gift and/or hospitality by ______ staff members participating in the procurement process. Please confirm.</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Controls.RadioGroup
                        name="section8"
                        label=""
                        value={values.section8}
                        onChange={handleInputChange}
                        items={section8item}
                    />
                </Grid>
                <Grid item xs={10}>
                    <Typography variant="subtitle1" gutterBottom align="justify">Any breach of this clause may lead to the termination of all contracts your Company may have with ________ and removal from the approved vendor database.</Typography>
                </Grid>
              </Grid>
            </Form>
          </>
        );
      case 8:
        return (
        <>
          <h1>Section 9 : Declaration</h1>
            <Form>
            <Grid container spacing={3}>
                <Grid item xs={2}>
                    <Typography variant="subtitle1" gutterBottom align="justify">Certification</Typography>
                </Grid>
                <Grid item xs={9}>
                    <Typography variant="subtitle1" gutterBottom align="justify">I, the undersigned, here by accept the General Conditions, a copy of which has been provided to me, and warrant that the information provided in this form is correct and, in the event of changes, details will be provided as soon as possible.</Typography>
                </Grid>
                <Grid item xs={1}>
                    <Controls.Checkbox
                        name="isAccept"
                        label=""
                        value={values.isAccept}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={2}>
                    <Typography variant="subtitle1" gutterBottom align="justify">Self-Declaration</Typography>
                </Grid>
                <Grid item xs={9}>
                    <Typography variant="subtitle1" gutterBottom align="justify">I, the undersigned, declare that:<br/>(a) Our company is not involved in any fraudulent or corrupt activities and has not been in the past, and is not currently under any investigation for any such activities which would render our company unsuitable for business dealing with your esteemed organization</Typography>
                </Grid>
                <Grid item xs={1}>
                    <Controls.Checkbox
                        name="isAccept"
                        label=""
                        value={values.isAccept}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12}>
                        <Controls.Input
                                name="remark"
                                label="Remark"
                                value={values.remark}
                                onChange={handleInputChange}
                            />
                            <div style={styles.center}>
                                <Controls.Button
                                    type="submit"
                                    text="Resend to Vendor with Clarfications" />
                                <Controls.Button
                                    type="submit"
                                    text="Reject"
                                    color="Secondary" />
                                <Controls.Button
                                    type="submit"
                                    text="Approve" />
                            </div>
                    </Grid>
              </Grid>
            </Form>
          </>  
        );
      case 9:
        return(
        <>
          <h1>Section 9 : Declaration</h1>
            <Form>
              <Grid container spacing={3}>
                <Grid item xs={10} style={{ margin: "17px 0 0 0"}}>
                    <Typography variant="subtitle1" gutterBottom align="justify">Does your Company have a written Statement of its Environmental Policy? (If yes, please attach a Copy)</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Controls.RadioGroup
                        name="section6_1"
                        label=""
                        value={values.section6item1}
                        onChange={handleInputChange}
                        items={section6_1}
                    />
                </Grid>
                <Grid item xs={10} style={{ margin: "17px 0 0 0"}}>
                    <Typography variant="subtitle1" gutterBottom align="justify">Does your organisation hold any accreditation such as ISO 14001 related to the environment?</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Controls.RadioGroup
                        name="section6_1"
                        label=""
                        value={values.section6item2}
                        onChange={handleInputChange}
                        items={section6_2}
                    />
                </Grid>
              </Grid>
            </Form>
          </>
       );
      default:
        return 'Unknown stepIndex';
    }
  }
  //const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  /*
  */
  const useQontoStepIconStyles = makeStyles({
    root: {
      color: '#eaeaf0',
      display: 'flex',
      height: 22,
      alignItems: 'center',
    },
    active: {
      color: '#784af4',
    },
    circle: {
      width: 8,
      height: 8,
      borderRadius: '50%',
      backgroundColor: 'currentColor',
    },
    completed: {
      color: '#784af4',
      zIndex: 1,
      fontSize: 18,
    },
  });
  
  function QontoStepIcon(props) {
    const classes = useQontoStepIconStyles();
    const { active, completed } = props;
  
    return (
      <div
        className={clsx(classes.root, {
          [classes.active]: active,
        })}
      >
        {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
      </div>
    );
  }
  
  QontoStepIcon.propTypes = {
    /**
     * Whether this step is active.
     */
    active: PropTypes.bool,
    /**
     * Mark the step as completed. Is passed to child components.
     */
    completed: PropTypes.bool,
  };  

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
            <Paper className={classes.pageContent}>
          <div>
            <Typography className={classes.instructions}>All steps completed</Typography>
            <Button className={classes.buttoncontainer} onClick={handleReset}>Reset</Button>
          </div>
          </Paper>
        ) : (
          <div>
            <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
            <div className={classes.buttoncontainer}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Back
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default HorizontalLabelPositionBelowStepper