import React, { useState, useEffect } from "react"
import './NewBillForm.css'
import Info from './info'
import Dialog from '@material-ui/core/Dialog';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { DatePicker } from "@material-ui/pickers";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CancelIcon from '@material-ui/icons/Cancel';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from '@material-ui/core/IconButton';


function NewBillForm(props) {

    const useStyles = makeStyles({
        root: {
            backgroundColor: '#F4D06F',
            webkitBoxShadow: '0px 6px 4px 5px rgb(0,0,0)',
            mozBoxShadow: '0px 6px 4px 5px rgb(0,0,0)',
            boxShadow: '0px 6px 4px 5px rgb(0,0,0)',
            padding: '20px 0px 20px 0px',
            fontSize: '18px',
            '&:hover': {
                backgroundColor: 'rgb(230, 199, 114)',
                webkitBoxShadow: '0px 6px 5px 5px rgb(0,0,0)',
                mozBoxShadow: '0px 6px 5px 5px rgb(0,0,0)',
                boxShadow: '0px 6px 5px 5px rgb(0,0,0)',
                transition: '0.2s ease-in',
            },
        },
        cancleButton: {
            color: 'rgb(255, 255, 255)',
            '&:hover': {
                color: 'rgba(255, 255, 255, 0.90)',
                cursor: 'pointer'
            }
        },
        fab: {
            width: "80px",
            height: "80px",
            marginTop: "11px",
            marginLeft: "11px",
            backgroundColor: "rgba(200, 200, 200, 0.5)",
            webkitBoxShadow: 'none',
            mozBoxShadow: 'none',
            boxShadow: 'none',
            color: "black",
            '&:hover': {
                backgroundColor: "rgb(255, 255, 255)",
                border: "solid 10px #9dcdb5",
                color: "rgba(0, 0, 0)",
                boxSizing: "border-box"

            }
        },
        fab2: {
            width: "50px",
            height: "50px",
            backgroundColor: "rgba(200, 200, 200, 0.5)",
            webkitBoxShadow: 'none',
            mozBoxShadow: 'none',
            boxShadow: 'none',
            color: "black",
            '&:hover': {
                backgroundColor: "rgb(255, 255, 255)",
                border: "solid 10px #9dcdb5",
                color: "rgba(0, 0, 0)",
                boxSizing: "border-box"

            },
        }
    });

    const classes = useStyles();

    const [openForm, setOpenForm] = useState(false);
    const [autoBillingSwitch, setAutoBillingSwitch] = useState(false);
    const [maxDate, setMaxDate] = useState(new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()));
    const [disabledDate, setDisabledDate] = useState(false)
    const [smallAddButton, setSmallAddButton] = useState(false)

    const [billingName, setBillingName] = useState('')
    const [serviceInfo, setServiceInfo] = useState('')
    const [fixedPayment, setFixedPayment] = useState('');
    const [minPayment, setMinPayment] = useState('')
    const [maxPayment, setMaxPayment] = useState('')
    const [paymentDueDate, handleDateChange] = useState(new Date());
    const [paymentPeriodSelection, setPaymentPeriodSelection] = useState('')
    const [categorySelection, setCategorySelection] = useState('')
    const [minMaxError, setMinMaxError] = useState(false)

    useEffect(() => {
        const now = new Date()
        if (paymentPeriodSelection === 'יומי') {
            setDisabledDate(true)
            handleDateChange(new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1))
        }
        else {
            setDisabledDate(false)
            if (paymentPeriodSelection === 'שנתי')
                setMaxDate(new Date(now.getFullYear() + 1, now.getMonth(), now.getDate()))
            else
                setMaxDate(new Date(now.getFullYear(), now.getMonth() + 1, now.getDate()))
        }

    }, [paymentPeriodSelection])

    const handleClickOpen = () => {
        if (minMaxError)
            setMinMaxError(false)
        setOpenForm(true);
    };

    const handleClose = () => {
        setOpenForm(false);
    };

    const toggleSwitch = () => {
        setAutoBillingSwitch((prev) => !prev);
    };

    const handleBillingName = (event) => {
        setBillingName(event.target.value)
    }

    const handleServiceInfo = (event) => {
        setServiceInfo(event.target.value)
    }

    const handlePaymentInput = (event) => {

        if (!isNaN(event.target.value)) {
            if (autoBillingSwitch) {
                if (event.target.name === 'min')
                    setMinPayment(event.target.value)
                else
                    setMaxPayment(event.target.value)
            }
            else {
                setFixedPayment(event.target.value)
            }
        }
    }

    const handlePeriodSelection = (event) => {
        setPaymentPeriodSelection(event.target.value)
    }

    const handleCategorySelection = (event) => {
        setCategorySelection(event.target.value)
    }

    const handleSubmitForm = (callback) => {
        if (+minPayment > +maxPayment) {
            setMinMaxError(true)
        }
        else {

            setOpenForm(false);
            setSmallAddButton(true)
            let period = ''
            let category = ''
            if (paymentPeriodSelection)
                period = paymentPeriodSelection;
            else
                period = 'חודשי'
            if (categorySelection)
                category = categorySelection
            else
                category = 'אחר'

            if (autoBillingSwitch) {
                let avg = (+minPayment + +maxPayment) / 2;
                if (avg == '0')
                    avg = ''
                callback({ billingName, serviceInfo, avgPayment: avg, paymentDueDate, paymentPeriodSelection: period, categorySelection: category, minPayment, maxPayment })
            }
            else

                callback({ billingName, serviceInfo, fixedPayment, paymentDueDate, paymentPeriodSelection: period, categorySelection: category })

            setBillingName('');
            setServiceInfo('');
            setFixedPayment('');
            setMinPayment('');
            setMaxPayment('');
            handleDateChange(new Date());
            setPaymentPeriodSelection('');
            setCategorySelection('');
        }
    }

    return (
        <>
            <div className="actionButtonsBar">
                <span className="barTitle">החשבונות שלי</span>
                <div style={{ float: "left" }}>
                    <Fab className={smallAddButton ? classes.fab2 : classes.fab} size={"large"} color="primary" aria-label="add">
                        <AddIcon onClick={handleClickOpen} />
                    </Fab>
                </div>
            </div>

            <Dialog dir="rtl" open={openForm} onClose={handleClose}>
                <div className="form">

                    <div className="cancelButton">
                        <CancelIcon
                            className={classes.cancleButton}
                            fontSize="large"
                            onClick={handleClose}
                        />
                    </div>

                    <div className="formTitle">
                        חשבונות קבועים
                    </div>

                    <div className="initialDetailsContainer">
                        <div className="headerContainer">
                            <div className="headerTitleName">
                                <span> מלא פרטים</span>
                            </div>
                            <div>
                                <Info info="aaa" />
                            </div>
                        </div>

                        <form className="formSidesMargin" dir="rtl" noValidate autoComplete="off">
                            <div className="headerContainer">
                                <Input
                                    className="fillNameWidth"
                                    placeholder="מלא שם"
                                    value={billingName}
                                    onChange={handleBillingName}
                                />
                                <Input
                                    className="FullWidth"
                                    placeholder="תיאור שירות"
                                    value={serviceInfo}
                                    onChange={handleServiceInfo}
                                />
                            </div>
                        </form>

                    </div>

                    <div className="dueDateContainer">

                        <div className="headerContainer">
                            <div className="headerTitleDueDate">
                                פירוט חיוב
                            </div>
                            <div>
                                <Info info="bbb" />
                            </div>
                        </div>

                        <div className="formSidesMargin">
                            <DatePicker
                                minDate={new Date()}
                                maxDate={maxDate}
                                disabled={disabledDate}


                                className="fullWidth"
                                inputVariant="outlined"
                                autoOk
                                format="dd/MM"
                                variant="inline"
                                label="תאריך של חיוב קרוב"
                                value={paymentDueDate}
                                onChange={handleDateChange}
                            />
                            <br />
                            <br />
                            <Select
                                className="fullWidth"
                                style={{ marginBottom: "10px" }}
                                labelId="תקופת תשלום"
                                displayEmpty
                                value={paymentPeriodSelection}
                                onChange={handlePeriodSelection}
                            >
                                <MenuItem value="" disabled>
                                    תקופת תשלום
                                </MenuItem>
                                <MenuItem value={"חודשי"}>חודשי</MenuItem>
                                <MenuItem value={"שנתי"}>שנתי</MenuItem>
                                <MenuItem value={"יומי"}>יומי</MenuItem>
                            </Select>
                            <Select
                                className="fullWidth"
                                labelId="סוג חשבון"
                                displayEmpty
                                value={categorySelection}
                                onChange={handleCategorySelection}
                            >
                                <MenuItem value="" disabled>
                                    סוג חשבון
                                </MenuItem>
                                <MenuItem value={"אינטרנט"}>אינטרנט</MenuItem>
                                <MenuItem value={"דירה"}>דירה</MenuItem>
                                <MenuItem value={"רכב"}>רכב</MenuItem>
                                <MenuItem value={"ביטוח"}>ביטוח</MenuItem>
                                <MenuItem value={"פלאפון"}>פלאפון</MenuItem>
                                <MenuItem value={"לימודים"}>לימודים</MenuItem>
                                <MenuItem value={"משפחה"}>משפחה</MenuItem>
                                <MenuItem value={"אחר"}>אחר</MenuItem>
                            </Select>
                        </div>
                    </div>

                    <div className="paymentPriceContainer">

                        <div className="headerContainerWithSwitch">
                            <div className="headerContainerPrice">
                                <div className="headerTitlePrice">
                                    מלא מחיר
                                </div>
                                <div>
                                    <Info info="ccc" />
                                </div>
                            </div>
                            <div className="switchBox">
                                <span className="switchLabel">מחיר משתנה</span>
                                <IconButton >
                                    <FormControlLabel
                                        control={<Switch size="small" fontSize="small" checked={autoBillingSwitch} onChange={toggleSwitch} />}
                                    />
                                </IconButton>
                            </div>
                        </div>
                        {autoBillingSwitch ?
                            <div className="rangePriceBox">
                                <TextField
                                    label=
                                    {
                                        <Typography variant="subtitle2">מקסימום</Typography>
                                    }
                                    error={minMaxError}
                                    className="outlineWidth"
                                    name="max"
                                    value={maxPayment}
                                    onChange={handlePaymentInput}
                                    id="standard-number"
                                    variant="outlined"
                                    inputProps={{ min: 0, style: { textAlign: 'center', fontSize: '19px' } }}
                                />
                                <div style={{ fontSize: "55px", color: "rgb(54, 54, 54)", lineHeight: "53px" }}>-</div>
                                <TextField
                                    label=
                                    {
                                        <Typography variant="subtitle2">מינימום</Typography>
                                    }
                                    error={minMaxError}
                                    className="outlineWidth"
                                    name="min"
                                    value={minPayment}
                                    onChange={handlePaymentInput}
                                    id="standard-number"
                                    variant="outlined"
                                    inputProps={{ min: 0, style: { textAlign: 'center', fontSize: '19px' } }}
                                />
                            </div>
                            :
                            <div className="formSidesMargin">
                                < TextField
                                    label=
                                    {
                                        <Typography variant="h5"> ₪</Typography>
                                    }
                                    className="fullWidth"
                                    variant="outlined"
                                    id="standard-number"
                                    value={fixedPayment}
                                    onChange={handlePaymentInput}
                                    inputProps={{ min: 0, style: { textAlign: 'center', fontSize: '22px' } }}
                                >
                                </TextField>
                            </div>
                        }
                    </div>
                    <div className="sendButton">
                        <Button
                            fullWidth={true}
                            className={classes.root}
                            onClick={() => handleSubmitForm(props.onSubmit)}
                        >
                            הוסף חשבון
                        </Button>
                    </div>
                </div>
            </Dialog>

        </>
    )
}

export default NewBillForm