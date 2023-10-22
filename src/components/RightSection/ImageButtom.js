import React, { useState } from "react";
import classes from "./ImageButtom.module.css";
import { toast } from "react-toastify";
import EmailSenderModel from "../../Util/Modals/EmailSenderModel";
import PaymentModal from "../../Util/Modals/PaymentModal";

export default function ImageButtom(props) {
  const [isMailModelOpen, setMailModelOpen] = useState(false);
  const [isPaymentMode, setPaymentMode] = useState(false);

  function handleOpenEmailSender() {
    setMailModelOpen(true)
  }

  function handleStartPayment() {
    
    setPaymentMode(true);
  }

  return (
    <div className={classes.actionButton}>
      <img
        className={classes.copy}
        alt="copy"
        onClick={() => {
          navigator.clipboard.writeText(props.downloadUrl);
          toast.info("Download url copied successfully");
        }}
      />
      <img
        className={classes.mail}
        alt="mail"
        onClick={handleOpenEmailSender}
      />
      <img className={classes.rupee} alt="rupee" onClick={handleStartPayment} />
      {isPaymentMode && <PaymentModal removeBackdrop = {() => setPaymentMode(false)} />}
      {isMailModelOpen && (
        <EmailSenderModel
          name={props.name}
          link={props.downloadUrl}
          type={props.type}
          size={props.size}
          removeBackdrop = {() => setMailModelOpen(false)}
        />
      )}
    </div>
  );
}
