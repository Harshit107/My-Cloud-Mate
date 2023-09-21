import Circle from '../../Util/Circle';
import classes from './ProfileBasic.module.css'
import defaultImg from '../../images/user.png'
import editImage from '../../images/pen.png'
import { PROFILE_API } from '../../config'
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import useServer from '../../db/useServer'
import TopLoading from '../../Util/TopLoading'


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
                setProfileData(data.message)
            }
            else
                toast.success(data.message)
            reset();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, reset, error])




    return (
        <>
            {isLoading && <TopLoading />}
            <div className={classes.container}>

                <div className={classes.content}>
                    <Circle >
                        <img src={defaultImg} alt='user' className={classes.img} />
                    </Circle>
                    <Circle className={classes.circle}>
                        <img src={editImage} alt='user' className={classes.editImage} />
                    </Circle>
                    <div className={classes.main}>
                        <div className={classes.name}>Name : <span className='mate'>{profileData.name}</span></div>
                        <div className={classes.email}>Email :  {profileData.email}</div>
                        <div className={classes.userName}>User Id : {profileData?._id?.substring(10)}</div>
                    </div>
                </div>

            </div>
        </>
    )

}
export default ProfileBasic;