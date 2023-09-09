import { useNavigate } from "react-router-dom";
import Homepage from "../Homepage";
import useAuth from "../db/useServer";
import { IS_USER_LOGEDIN_API } from '../config';
import { useEffect } from "react";
import { toast } from "react-toastify";
import LoadingGIF from "../images/loading-main.svg";
import classes from './Dashboard.module.css';

const LoadingPage = () => {
  return (
    <div className={classes.loadingContainer}>
      <img className={classes.loadingGIF} src={LoadingGIF} alt="Loading..." />
      <p className={classes.p}>Loading...</p>
    </div>
  );
};

const Dashboard = () => {
  const { handleAPICall, error, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    handleAPICall(IS_USER_LOGEDIN_API)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error)
      navigate('/auth')
    }
  }, [error, navigate])

  // Once authentication status has been checked, render the homepage.
  return (
    <>
      {isLoading && <LoadingPage />}
      {!isLoading && <Homepage />}
    </>
  )
};

export default Dashboard;
