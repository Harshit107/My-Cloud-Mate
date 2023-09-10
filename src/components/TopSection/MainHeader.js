import Circle from '../../Util/Circle';
import gifLogo from '../../images/my-cloud-mate-logo.gif'
import userImage from '../../images/user.png';
import classes from './MainHeader.module.css'
import Search from './Search';
import ProfileSectionList from './ProfileSectionList'
import { useState } from 'react';

const MainHeader = (props) => {

  const [displayProfileSection, setDisplayProfileSection] = useState(false);

  return (
    <div className={classes["header-container"]}>
      <Circle>
        <img
          src={gifLogo}
          alt="Website logo"
          className={classes["logo-img"]}
        />
      </Circle>
      <Search />
      <div className={classes.user} >
        <Circle>
          <img
            src={userImage}
            alt="Website logo"
            className={classes["user-img"]}
            onClick={ () => setDisplayProfileSection(!displayProfileSection)}
          />
        </Circle>
        {displayProfileSection && <div className={classes.userContentContainer} >
            <ProfileSectionList />
        </div>}
      </div>

    </div>
  );
}
export default MainHeader;