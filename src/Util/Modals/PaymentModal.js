import Modal from "./Modal";
import classes from "./ModalCommonStyling.module.css";
import Button from "../Button";
import { useEffect } from "react";
// import { loadStripe } from "@stripe/stripe-js";
import useServer from "../../db/useServer";
import { PAYMENT_UNDER_DEVELOPEMENT, PURCHASE_SESSION } from "../../config";
import { toast } from "react-toastify";

const PaymentModal = (props) => {
  const { handleAPICall, error, isLoading: serverLoading, reset } = useServer();

  useEffect(() => {
    if (error) {
      toast.error("Something went wrong : ", error);
      reset();
    }    
  }, [error, reset]);

  async function handlePaymentStart() {
    
    const body = {
      items: [
        {
          name: "linkShort",
          id: "ls1",
          amount: 1,
          quantity: 1,
        },
        {
          name: "ads free",
          id: "ls2",
          amount: 1,
          quantity: 2,
        },
      ],
    };

    const data = await handleAPICall(PURCHASE_SESSION, "POST", body);
    if (data) {
      window.location = data.url
    }
  }

  return (
    <Modal removeBackdrop={props.removeBackdrop} title="Payment">
      <p className={classes.purchase}>Purchase detail</p>
      <p className={classes.detail}>* Ads free exprience</p>
      <p className={classes.detail}>* Unlimited Url Shorten</p>
      <p className={classes.detail}>* Upload large files</p>
      {serverLoading && (
        <p className={classes.info}>Sending Payment Request, please wait...</p>
      )}
      {PAYMENT_UNDER_DEVELOPEMENT && (
        <p className={classes.info}>Payment section is under developement</p>
      )}
      <div className={classes.btnDiv}>
        <Button
          onClick={() => {
            props.removeBackdrop();
          }}
          disabled={serverLoading}
          className={`${classes.btn} ${classes.cancelBtn}`}
        >
          Cancel
        </Button>
        <Button
          onClick={handlePaymentStart}
          disabled={serverLoading || PAYMENT_UNDER_DEVELOPEMENT}
          className={classes.btn}
        >
          Pay
        </Button>
      </div>
    </Modal>
  );
};

export default PaymentModal;
