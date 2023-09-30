import Circle from '../../Util/Circle';
import classes from './ProfileBasic.module.css'

import { PROFILE_API } from '../../config'
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import useServer from '../../db/useServer'
import TopLoading from '../../Util/TopLoading'
import catImage from '../../images/cat.png'


const ProfileBasic = () => {
    const [profileData, setProfileData] = useState({})

    const {
        error,
        handleAPICall,
        data,
        reset, isLoading } = useServer();

    useEffect(() => {
        toast.info("Fetching profile...");
        handleAPICall(PROFILE_API)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    useEffect(() => {
        if (error) {
            toast.error(error);
            reset();
        }
        if (data) {
            if (typeof data.message === 'object') {
                setProfileData(data.message)            }
            else
                toast.success(data.message)
            reset();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, reset, error])


    // function handleEditClicked() {

    // }



    return (
      <>
        {isLoading && <TopLoading />}
        <div className={classes.container}>
          <div className={classes.content}>
            <Circle className={classes.profileCircle}>
              <img src={catImage} alt="user" className={classes.img} />
            </Circle>
            {/* <Circle className={classes.circle}>
                        <img src={editImage} alt='user' className={classes.editImage} onClick={handleEditClicked}/>
                    </Circle> */}
            <div className={classes.main}>
              <div className={classes.name}>
                Name : <span className="mate">{profileData.name}</span>
              </div>
              <div className={classes.email}>{profileData.email}</div>
              <div className={classes.userName}>
                User Id : {profileData?._id?.substring(10)}
              </div>
            </div>
          </div>
        </div>
      </>
    );

}
export default ProfileBasic;