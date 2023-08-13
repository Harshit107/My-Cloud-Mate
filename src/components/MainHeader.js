import Circle from '../Util/Circle';
import gifLogo from '../images/my-cloud-mate-logo.gif'
import userImage from '../images/user.png';
import classes from './MainHeader.module.css'
import Search from './Search';

const MainHeader = (props) => { 

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
       <Circle>
         <img
           src={userImage}
           alt="Website logo"
           className={classes["user-img"] }
         />
       </Circle>
     </div>
   );
}
export default MainHeader;