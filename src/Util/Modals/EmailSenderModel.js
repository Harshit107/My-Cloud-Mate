import Modal from "./Modal";
import classes from "./ModalCommonStyling.module.css";
import Input from "../Input";
import Button from "../Button";
import { useState } from "react";
import { SHARE_FILE_API } from "../../config";
import useServer from "../../db/useServer";
import { toast } from "react-toastify";

const EmailSenderModal = (props) => {
  const [email, setEmail] = useState("");
  const { handleAPICall, isLoading, error } = useServer();

  function handleValueChange(e) {
    setEmail(e.target.value);
  }

  async function handleSendEmail() {
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      toast.error("Please enter a valid recipient email address");
      return;
    }

    try {
      const payload = {
        recipient: trimmedEmail,
        fileId: props.id,
        fileName: props.name,
        fileType: props.type,
        fileSize: props.size,
        link: props.link,
      };

      const data = await handleAPICall(SHARE_FILE_API, "POST", payload);
      if (data) {
        toast.success("File shared successfully via email");
        props.removeBackdrop();
      }
    } catch (err) {
      console.error("Failed to share file via email:", err);
    }
  }

  const inputData = {
    input: {
      name: "Recipient Email Address",
      type: "email",
      placeholder: "user@example.com",
      value: email,
      onChange: handleValueChange,
      autoFocus: true,
    },
  };

  return (
    <Modal removeBackdrop={props.removeBackdrop} title="Share File via Email">
      <p className={classes.p}>
        Enter the recipient&apos;s email address to send a secure download link for{" "}
        <strong style={{ color: "#38bdf8" }}>{props.name || "this file"}</strong>.
      </p>
      <Input input={inputData.input} />
      {error && <p className={classes.error}>{error}</p>}
      {isLoading && (
        <p className={classes.info}>Sending email via FreelyEmail, please wait...</p>
      )}
      <div className={classes.btnDiv}>
        <Button
          onClick={() => {
            props.removeBackdrop();
          }}
          disabled={isLoading}
          className={`${classes.btn} ${classes.cancelBtn}`}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSendEmail}
          disabled={isLoading}
          className={classes.btn}
        >
          {isLoading ? "Sending..." : "Send Email"}
        </Button>
      </div>
    </Modal>
  );
};

export default EmailSenderModal;
