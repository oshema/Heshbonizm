import React, { useState, useEffect } from 'react';
import './App.css';
import NewBillForm from './components/NewBillForm';
import BillingItem from './components/billingItem'

function App() {

  const [apear, setApear] = useState(false);
  const [hidden, setHidden] = useState(false)
  const [formData, setFormData] = useState([])
  const [billingId, setBillingId] = useState(1)

  const handleScroll = () => {
    const top = window.pageYOffset
    setApear(top !== 0);
    if (top > 720)
      setHidden(true)
    else
      setHidden(false)

  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const onSubmit = (form) => {
    form.billingId = billingId
    setBillingId(prevState => prevState + 1)
    setFormData(prevArray => [...prevArray, form])
  }

  const onDelete = (_id) => {
    let newBillingList = formData.filter(billing => billing.billingId !== _id);
    newBillingList.forEach(billing => {
      if (billing.billingId > _id) {
        billing.billingId -= 1;
      }
    })
    setFormData(newBillingList)
    setBillingId(prevState => prevState - 1)
  }

  const onEdit = (_id, editProperties) => {
    console.log("a", formData)
    let billings = formData.filter(billing => billing.billingId !== _id);
    if (editProperties.editedMinPayment || editProperties.editedMaxPayment) {
      setFormData([...billings, { billingName: editProperties.editedName, serviceInfo: editProperties.editedServiceInfo, paymentDueDate: editProperties.editedPaymentDueDate, paymentPeriodSelection: editProperties.editedPaymentPeriodSelection, categorySelection: editProperties.editedCategorySelection, avgPayment: editProperties.editedPayment, minPayment: editProperties.editedMinPayment, maxPayment: editProperties.editedMaxPayment }])
    }
    else {
      setFormData([...billings, { billingId: _id, billingName: editProperties.editedName, serviceInfo: editProperties.editedServiceInfo, paymentDueDate: editProperties.editedPaymentDueDate, paymentPeriodSelection: editProperties.editedPaymentPeriodSelection, categorySelection: editProperties.editedCategorySelection, fixedPayment: editProperties.editedPayment, minPayment: editProperties.editedMinPayment, maxPayment: editProperties.editedMaxPayment }])
    }

  }





  return (
    < >
      <div className={hidden ? "navBox-hidden" : "navBox"}>
        <div className="navTopMargin">
        </div>
        <div className={apear ? "navbar" : "navbar-trans"}>
          <ul >
            <li className="manu-items">
              משתמש
            </li>
            <li className="manu-items">
              הסבר שימוש
            </li>
            <li className="manu-items">
              צפה בהיסטוריה
            </li>
            <li className="manu-items">
              סטטיסטיקה
            </li>
          </ul>
        </div>
      </div>
      <div className="page-header">
        <div className="logo">
        </div>
      </div>
      <div className="hero-con" dir="rtl">
        <div className="billsAreaContainer">
          <div>
            <NewBillForm onSubmit={onSubmit} />
          </div>
          <div >
            {formData &&
              formData.map((item) => (
                <BillingItem
                  key={item.billingId}
                  numbering={item.billingId}
                  billingId={item.billingId}
                  billingName={item.billingName}
                  serviceInfo={item.serviceInfo}
                  avgPayment={item.avgPayment}
                  fixedPayment={item.fixedPayment}
                  paymentDueDate={item.paymentDueDate}
                  paymentPeriodSelection={item.paymentPeriodSelection}
                  categorySelection={item.categorySelection}
                  onDelete={onDelete}
                  onEdit={onEdit}
                  minPayment={item.minPayment}
                  maxPayment={item.maxPayment}
                />
              )
              )}
          </div>
        </div>
        <div className="billsStatsContainer">
          <div className="coinsImg">

          </div>
        </div>
      </div>

    </>
  );
}

export default App;
