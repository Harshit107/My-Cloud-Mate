import Modal from "./Modal";
import classes from "./ModalCommonStyling.module.css";
import Button from "../Button";
import useServer from "../../db/useServer";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Input from "../Input";
import useInput from "../../hooks/useInput";

const ChangePassword = (props) => {
  const { isLoading, handleAPICall, error, data, reset } = useServer();
  function handleBtnClick() {
    reset();
    // handleAPICall(SEND_VERIFICATION_API, 'POST', { email: props.email })
  }

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    } else if (data) {
      props.removeBackdrop();
      toast.info(data.message);
      reset();
    }
  }, [error, data, reset]);

  return <div></div>;
};

export default ChangePassword;
