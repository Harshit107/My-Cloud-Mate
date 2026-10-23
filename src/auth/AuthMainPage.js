import React, { useState } from "react";
import classes from "./AuthMainPage.module.css";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { RiArrowLeftLine } from "react-icons/ri";

const AuthMainPage = () => {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className={classes.authContainer}>
      <div className={classes.wrapper}>
        {/* Left Side: Auth Card with Framer Motion Switch */}
        <main className={classes.main}>
          <div className={classes.authCard}>
            <AnimatePresence mode="wait">
              {activeTab === "login" ? (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.25 }}
                >
                  <LoginPage onStartAnimation={() => setActiveTab("signup")} />
                </motion.div>
              ) : (
                <motion.div
                  key="signup"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                >
                  <SignupPage onStartAnimation={() => setActiveTab("login")} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>

        {/* Right Side: Welcome Message */}
        <div className={classes.welcomeMessage}>
          <div className={classes.badgePill}>
            <span>🔒 Secure Cloud Storage & Sharing</span>
          </div>

          <h1 className={classes.title}>
            Welcome to <br />
            MyCloud<span className={classes.mate}>Mate</span>
          </h1>

          <p className={classes.p}>
            A modern, lightning-fast cloud workspace. Upload, organize, stream, and collaborate on your files from anywhere in the world.
          </p>

          <div>
            <Link to="/home" className={classes.backHomeLink}>
              <RiArrowLeftLine size={16} /> Back to Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthMainPage;
