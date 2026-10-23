import React, { useState } from "react";
import gifLogo from "../../images/my-cloud-mate-logo.gif";
import userImage from "../../images/user.png";
import classes from "./MainHeader.module.css";
import Search from "./Search";
import ProfileSectionList from "./ProfileSectionList";
import { Link } from "react-router-dom";

const MainHeader = () => {
  const [displayProfileSection, setDisplayProfileSection] = useState(false);

  return (
    <header className={classes["header-container"]}>
      <Link to="/" className={classes.logoGroup}>
        <img
          src={gifLogo}
          alt="MyCloudMate Logo"
          className={classes["logo-img"]}
        />
        <span className={classes.brandText}>
          MyCloud<span className={classes.brandMate}>Mate</span>
        </span>
      </Link>

      <Search />

      <div className={classes.user}>
        <img
          src={userImage}
          alt="User Profile"
          className={classes["user-img"]}
          onClick={() => setDisplayProfileSection(!displayProfileSection)}
        />
        {displayProfileSection && (
          <div className={classes.userContentContainer}>
            <ProfileSectionList />
          </div>
        )}
      </div>
    </header>
  );
};

export default MainHeader;