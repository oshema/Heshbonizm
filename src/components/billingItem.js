import React, { useState, useEffect } from "react"
import './billingItem.css'
import DateRangeIcon from '@material-ui/icons/DateRange';
import UpdateIcon from '@material-ui/icons/Update';
import CategoryIcon from '@material-ui/icons/Category';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Input from '@material-ui/core/Input';
import { DatePicker } from "@material-ui/pickers";
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from '@material-ui/core/IconButton';


function BillingItem(props) {

    const { billingName, serviceInfo, avgPayment, fixedPayment, minPayment, maxPayment, paymentDueDate, paymentPeriodSelection, categorySelection, numbering, billingId, onDelete, onEdit } = props

    const [openDelete, setOpenDelete] = useState(false);
    const [openEdit, setOpenEdit] = useState(false)
    const [editedName, setEditedName] = useState(billingName)
    const [editedServiceInfo, setEditedServiceInfo] = useState('')
    const [maxDate, setMaxDate] = useState(new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()))
    const [disabledDate, setDisabledDate] = useState(false)
    const [editedPaymentDueDate, handleDateChange] = useState(paymentDueDate);
    const [editedPaymentPeriodSelection, setEditedPaymentPeriodSelection] = useState(paymentPeriodSelection)
    const [periodSelectionHighlight, setPeriodSelectionHighlight] = useState([""])
    const [editedCategorySelection, setEditedCategorySelection] = useState(categorySelection)
    const [categorySelectionHighlight, setCategorySelectionHighlight] = useState([""])
    const [autoBillingSwitch, setAutoBillingSwitch] = useState(false);
    const [editedFixedPayment, setEditedFixedPayment] = useState(fixedPayment)
    const [editedMinPayment, setEditedMinPayment] = useState(minPayment)
    const [editedMaxPayment, setEditedMaxPayment] = useState(maxPayment)
    const [minMaxError, setMinMaxError] = useState(false)


    useEffect(() => {
        const now = new Date()
        if (editedPaymentPeriodSelection === 'יומי') {
            setDisabledDate(true)
            handleDateChange(new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1))
        }
        else {
            setDisabledDate(false)
            if (editedPaymentPeriodSelection === 'שנתי')
                setMaxDate(new Date(now.getFullYear() + 1, now.getMonth(), now.getDate()))
            else
                setMaxDate(new Date(now.getFullYear(), now.getMonth() + 1, now.getDate()))
        }

    }, [editedPaymentPeriodSelection])

    useEffect(() => {
        if (editedPaymentPeriodSelection === "חודשי")
            setPeriodSelectionHighlight(["contained", "outlined", "outlined"])
        else if (editedPaymentPeriodSelection === "שנתי")
            setPeriodSelectionHighlight(["outlined", "contained", "outlined"])
        else
            setPeriodSelectionHighlight(["outlined", "outlined", "contained"])

    }, [editedPaymentPeriodSelection])

    useEffect(() => {
        if (editedCategorySelection === "אינטרנט")
            setCategorySelectionHighlight(["contained", "outlined", "outlined", "outlined", "outlined", "outlined", "outlined", "outlined"])
        else if (editedCategorySelection === "דירה")
            setCategorySelectionHighlight(["outlined", "contained", "outlined", "outlined", "outlined", "outlined", "outlined", "outlined"])
        else if (editedCategorySelection === "רכב")
            setCategorySelectionHighlight(["outlined", "outlined", "contained", "outlined", "outlined", "outlined", "outlined", "outlined"])
        else if (editedCategorySelection === "ביטוח")
            setCategorySelectionHighlight(["outlined", "outlined", "outlined", "contained", "outlined", "outlined", "outlined", "outlined"])
        else if (editedCategorySelection === "פלאפון")
            setCategorySelectionHighlight(["outlined", "outlined", "outlined", "outlined", "contained", "outlined", "outlined", "outlined"])
        else if (editedCategorySelection === "לימודים")
            setCategorySelectionHighlight(["outlined", "outlined", "outlined", "outlined", "outlined", "contained", "outlined", "outlined"])
        else if (editedCategorySelection === "משפחה")
            setCategorySelectionHighlight(["outlined", "outlined", "outlined", "outlined", "outlined", "outlined", "contained", "outlined"])
        else
            setCategorySelectionHighlight(["outlined", "outlined", "outlined", "outlined", "outlined", "outlined", "outlined", "contained"])

    }, [editedCategorySelection])


    const handleClickOpenDelete = () => {
        setOpenDelete(true);
    };

    const handleCloseDelete = () => {
        setOpenDelete(false);
    };

    const handleDelete = (callback) => {
        callback(billingId);
        handleCloseDelete();
    }

    const handleClickOpenEdit = () => {
        if (minPayment || maxPayment)
            setAutoBillingSwitch(true)
        setOpenEdit(true);
    };

    const handleCloseEdit = () => {
        setOpenEdit(false)
        handleDateChange(paymentDueDate)
        setEditedPaymentPeriodSelection(paymentPeriodSelection)
        setEditedCategorySelection(categorySelection)
        setEditedFixedPayment(fixedPayment)
        setEditedMinPayment(minPayment)
        setEditedMaxPayment(maxPayment)
        setMinMaxError(false)
    }

    const handleEdit = (callback) => {
        if (+editedMinPayment > +editedMaxPayment)
            setMinMaxError(true)
        else {
            setOpenEdit(false)
            let editedPayment
            if (autoBillingSwitch) {
                editedPayment = (+editedMinPayment + +editedMaxPayment) / 2;
                if (editedPayment == '0')
                    editedPayment = ''
            }
            else {
                editedPayment = editedFixedPayment
            }

            const editProperties = { editedName, editedServiceInfo, editedPaymentDueDate, editedPaymentPeriodSelection, editedCategorySelection, editedPayment, editedMinPayment, editedMaxPayment }
            callback(billingId, editProperties)
        }
    }

    const handleEditName = (event) => {
        setEditedName(event.target.value)

    }

    const handleServiceInfo = (event) => {
        setEditedServiceInfo(event.target.value)
    }

    const handlePeriodSelection = (event) => {
        setEditedPaymentPeriodSelection(event.currentTarget.value)
    }

    const handleCategorySelection = (event) => {
        setEditedCategorySelection(event.currentTarget.value)
    }

    const toggleSwitch = () => {
        setAutoBillingSwitch((prev) => !prev);
    };

    const handlePaymentInput = (event) => {
        if (!isNaN(event.target.value)) {
            if (autoBillingSwitch) {
                if (event.target.name === 'min')
                    setEditedMinPayment(event.target.value)
                else
                    setEditedMaxPayment(event.target.value)
            }
            else {
                setEditedFixedPayment(event.target.value)
            }
        }
    }

    let dateFormat = ''
    if (paymentDueDate) {
        dateFormat = ("0" + paymentDueDate.getDate()).slice(-2) + "/" + ("0" + (paymentDueDate.getMonth() + 1)).slice(-2);
    }

    const useStyles = makeStyles({
        root: {
            width: "70%",
        },
        confirmButtons: {
            width: "100%",
            backgroundColor: "white",
            border: "solid 1px rgba(0, 0, 0, 0.1)",
            boxSizing: "border-box",
            fontSize: "22px",
            '&:hover': {
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                color: "white"
            }
        }


    })

    const classes = useStyles();

    const billingBox = {
        width: "100%",
        height: "75px",
        display: "flex",
        boxSizing: "border-box",
        backgroundImage: "url(/images/coupon.png)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
        webkitBoxShadow: "-11px 13px 14px -10px rgba(0,0,0,0.2)",
        mozBoxShadow: "-11px 13px 14px 10px rgba(0,0,0,0.2)",
        boxShadow: "-11px 13px 14px -10px rgba(0,0,0,0.2)",
        marginTop: "10px"

    }
    const backgroundOverlay = {
        width: "100%",
        height: "100%",
        backgroundColor: "#8bbbe86c",
        display: "flex",
        justifyContent: "space-between"
    }
    const numberCount = {
        width: "6%",
        height: "37px",
        alignText: "center",
        backgroundImage: "url(/images/coupon.png)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
        marginTop: "10px",
        borderRadius: "0px 20px 0px 0px",
        boxSizing: "border-box",
        webkitBoxShadow: "-11px 13px 14px -10px rgba(0,0,0,0.2)",
        mozBoxShadow: "-11px 13px 14px 10px rgba(0,0,0,0.2)",
        boxShadow: "-11px 13px 14px -10px rgba(0,0,0,0.2)",
    }

    const numberCountOverlay = {
        width: "100%",
        height: "100%",
        backgroundColor: "#8bbbe86c",
        borderRadius: "0px 20px 0px 0px",
    }

    return (
        <>
            <div style={{ display: "flex", textAlign: "center" }}>
                <div style={numberCount}>
                    <div style={numberCountOverlay}>
                        <span style={{ display: "inline-block", fontSize: "23px", marginTop: "5px" }}>{numbering}</span>
                    </div>
                </div>
                <div dir="rtl" style={billingBox}>
                    <div style={backgroundOverlay}>
                        <div className="detailsBox">
                            <div className="nameTag" >{billingName}</div>
                            <hr className="billTitleLine" />
                            <div className="bottomInfo">
                                <span><span >{dateFormat}</span><span className="displayIcons"><DateRangeIcon /></span></span>
                                <span><span >{paymentPeriodSelection}</span><span className="displayIcons"><UpdateIcon /></span></span>
                                <span><span >{categorySelection}</span ><span className="displayIcons"><CategoryIcon /></span></span>
                            </div>
                        </div>
                        <div className="priceDisplay">
                            <span className="price">{fixedPayment ? (fixedPayment) : (avgPayment)} ₪</span>
                        </div>
                        <div className="actionIcons" >

                            <div className="actionIconsBack"><DeleteIcon
                                className={classes.root}
                                onClick={handleClickOpenDelete}
                            />
                            </div>
                            <Dialog
                                dir="rtl"
                                open={openDelete}
                                onClose={handleCloseDelete}
                            >
                                <div style={{ textAlign: "center" }}>
                                    <div>
                                        <h1>האם אתה בטוח שאתה רוצה למחוק חשבון זה?</h1>
                                    </div>
                                    <div className="confirmDeleteBG">
                                        <Button className={classes.confirmButtons} onClick={() => handleDelete(onDelete)}>מחק</Button>
                                        <Button className={classes.confirmButtons} onClick={handleCloseDelete}>ביטול</Button>
                                    </div>
                                </div>
                            </Dialog>

                            <div className="actionIconsBack"><EditIcon
                                className={classes.root}
                                onClick={handleClickOpenEdit}
                            />
                            </div>
                            <Dialog
                                dir="rtl"
                                open={openEdit}
                                onClose={handleCloseEdit}
                            >
                                <div className="editWindow">
                                    <div>
                                        <h1 className="editTitle">עריכת חשבון</h1>
                                    </div>
                                    <div >
                                        <span className="editedNameInfo"> שם חשבון</span><Input
                                            placeholder={billingName}
                                            onChange={handleEditName}
                                        />
                                    </div>
                                    <div>
                                        <span className="editedNameInfo"> תיאור חשבון</span>
                                        <Input
                                            placeholder={serviceInfo}
                                            onChange={handleServiceInfo}
                                        />
                                    </div>
                                    <hr className="editBillLine" />
                                    <DatePicker
                                        minDate={new Date()}
                                        maxDate={maxDate}
                                        disabled={disabledDate}

                                        inputVariant="outlined"
                                        autoOk
                                        format="dd/MM"
                                        variant="inline"
                                        label="תאריך של חיוב קרוב"
                                        value={editedPaymentDueDate}
                                        onChange={handleDateChange}
                                    />
                                    <hr className="editBillLine" />
                                    <div style={{ marginBottom: "10px" }}>
                                        <ButtonGroup
                                            orientation="horizental"
                                            color="primary"
                                            aria-label="horizental contained primary button group"
                                            fullWidth
                                            variant="text"
                                        >
                                            <Button variant={periodSelectionHighlight[0]} value="חודשי" onClick={handlePeriodSelection}>חודשי</Button>
                                            <Button variant={periodSelectionHighlight[1]} value="שנתי" onClick={handlePeriodSelection}>שנתי</Button>
                                            <Button variant={periodSelectionHighlight[2]} value="יומי" onClick={handlePeriodSelection}>יומי</Button>
                                        </ButtonGroup>
                                    </div>
                                    <div style={{ marginBottom: "10px" }}>
                                        <ButtonGroup
                                            orientation="horizental"
                                            color="secondary"
                                            aria-label="horizental contained secondary button group"
                                            fullWidth
                                            variant="text"
                                        >
                                            <Button variant={categorySelectionHighlight[0]} value="אינטרנט" onClick={handleCategorySelection}>אינטרנט</Button>
                                            <Button variant={categorySelectionHighlight[1]} value="דירה" onClick={handleCategorySelection}>דירה</Button>
                                            <Button variant={categorySelectionHighlight[2]} value="רכב" onClick={handleCategorySelection}>רכב</Button>
                                            <Button variant={categorySelectionHighlight[3]} value="ביטוח" onClick={handleCategorySelection}>ביטוח</Button>
                                            <Button variant={categorySelectionHighlight[4]} value="פלאפון" onClick={handleCategorySelection}>פלאפון</Button>
                                            <Button variant={categorySelectionHighlight[5]} value="לימודים" onClick={handleCategorySelection}>לימודים</Button>
                                            <Button variant={categorySelectionHighlight[6]} value="משפחה" onClick={handleCategorySelection}>משפחה</Button>
                                            <Button variant={categorySelectionHighlight[7]} value="אחר" onClick={handleCategorySelection}>אחר</Button>
                                        </ButtonGroup>
                                    </div>
                                    <hr className="editBillLine" />
                                    <div>
                                        <span >מחיר משתנה</span>
                                        <IconButton >
                                            <FormControlLabel
                                                control={<Switch size="small" fontSize="small" checked={autoBillingSwitch} onChange={toggleSwitch} />}
                                            />
                                        </IconButton>
                                    </div >
                                    <div style={{ marginBottom: "15px" }}>
                                        {autoBillingSwitch ?
                                            <div className="minMaxPayment">
                                                <TextField
                                                    label=
                                                    {
                                                        <Typography variant="subtitle2">מקסימום</Typography>
                                                    }
                                                    fullWidth
                                                    error={minMaxError}
                                                    name="max"
                                                    value={editedMaxPayment}
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
                                                    fullWidth
                                                    error={minMaxError}
                                                    name="min"
                                                    value={editedMinPayment}
                                                    onChange={handlePaymentInput}
                                                    id="standard-number"
                                                    variant="outlined"
                                                    inputProps={{ min: 0, style: { textAlign: 'center', fontSize: '19px' } }}
                                                />


                                            </div>
                                            :
                                            <div>
                                                < TextField
                                                    label=
                                                    {
                                                        <Typography variant="h5"> ₪</Typography>
                                                    }

                                                    variant="outlined"
                                                    id="standard-number"
                                                    value={editedFixedPayment}
                                                    onChange={handlePaymentInput}
                                                    inputProps={{ min: 0, style: { textAlign: 'center', fontSize: '22px' } }}
                                                >
                                                </TextField>
                                            </div>
                                        }
                                    </div>
                                    <div className="confirmDeleteBG">
                                        <Button className={classes.confirmButtons} onClick={() => handleEdit(onEdit)}>אישור</Button>
                                        <Button className={classes.confirmButtons} onClick={handleCloseEdit}>ביטול</Button>
                                    </div>

                                </div>
                            </Dialog>

                            <div className="actionIconsBack"><ExpandMoreIcon
                                className={classes.root}
                            />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default BillingItem