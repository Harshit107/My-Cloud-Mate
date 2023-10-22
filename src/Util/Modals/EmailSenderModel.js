import Modal from "./Modal";
import classes from "./ModalCommonStyling.module.css";
import Input from "../Input";
import Button from "../Button";
import { useState } from "react";
// import { toast } from 'react-toastify';

import { APP_EMAIL, APP_NAME, REPLY_TO, SEMD_EMAIL } from "../../config";
import { getFileSharingTemplate } from "../../template/FileShare";
import useServer from "../../db/useServer";
import { toast } from "react-toastify";

const EmailSenderModal = (props) => {
  const [email, setEmail] = useState("");
  const {handleAPICall, isLoading, error} = useServer()

  function handleValueChange(e) {
    setEmail(e.target.value);
  }

  async function handleSendEmail() {
    try {
      const msg = {
        sender: APP_EMAIL,
        replyTo: REPLY_TO,
        recipient: email,
        app: APP_NAME,
        subject: `File shared : ${props.name}`,
        message: `A File has been shared with you : Name :  ${props.name} </br> Size : ${props.size} `,
        HTMLfile: getFileSharingTemplate(props.name, props.type, props.size, props.link),
      };
      const data = await handleAPICall(SEMD_EMAIL,'POST',msg)
      if(data) {
        toast.success("Email sent successfully");
        props.removeBackdrop();
      }

    } catch (error) {
      console.log(error);
    }
  }

  const inputData = {
    input: {
      name: "Email Address",
      type: "email",
      placeholder: " ",
      value: email,
      onChange: handleValueChange,
    },
  };

  return (
    <Modal removeBackdrop={props.removeBackdrop} title="Send Email">
      <p className={classes.p}>
        Enter your Email id to receive your download url
      </p>
      <Input input={inputData.input} />
      {error && <p className={classes.error}>{error}</p>}
      {isLoading && (
        <p className={classes.info}>Sending Email, please wait...</p>
      )}
      <div className={classes.btnDiv}>
        <Button
          onClick={() => {
            props.removeBackdrop();
          }}
          disabled={isLoading}
          className={`${classes.btn} ${classes.cancelBtn}`}
        >
          {" "}
          Cancel
        </Button>
        <Button
          onClick={handleSendEmail}
          disabled={isLoading}
          className={classes.btn}
        >
          Send
        </Button>
      </div>
    </Modal>
  );
};

export default EmailSenderModal;
