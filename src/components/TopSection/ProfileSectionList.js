import classes from '../LeftSection/ProjectList.module.css'
import useServer from '../../db/useServer'
import { LOGOUT_ALL_API, LOGOUT_ALL_EXCEPT_API, LOGOUT_API } from '../../config'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'

let ACTION_PERFORMED = null;
const ProfileSectionList = () => {

    const [logoutShouldDisplay, setLogoutShouldDisplay] = useState(false)

    const navigate = useNavigate();
    const {
        data, handleAPICall, isLoading, reset
    } = useServer()

    function handleLogoutClick() {
        setLogoutShouldDisplay(!logoutShouldDisplay)
    }

    function handleLogout() {
        ACTION_PERFORMED = "LOGOUT";
        handleAPICall(LOGOUT_API, "POST")
    }

    function handleLogoutAll() {
        ACTION_PERFORMED = "LOGOUT_ALL";
        handleAPICall(LOGOUT_ALL_API, "POST")
    }


    function handleLogoutAllExceptCurrent() {
        handleAPICall(LOGOUT_ALL_EXCEPT_API, "POST")
    }


    useEffect(() => {
        if (isLoading) {
            toast.info("Logging out, please wait...")
        }
        if (data) {
            toast.info(data.message)
            if (ACTION_PERFORMED === "LOGOUT" || ACTION_PERFORMED === "LOGOUT_ALL")
                navigate('/auth')
            reset();
        }

    }, [navigate, data, isLoading, reset])


    return (
        <>
            <div className={classes['profile-section-list']}>
                <ul className={classes['ul']}>
                    <li key={"profile"} onClick={() => navigate('/profile')}>
                        Profile
                    </li>

                    <li key={"logout"} onClick={handleLogoutClick}>
                        Logout
                    </li>
                </ul>
            </div>
            {logoutShouldDisplay && <div className={`${classes['profile-section-list']} ${classes.logoutList}`}>
                <ul className={classes['ul']}>
                    <li key={"logout-current"} onClick={handleLogout}>
                        Logout Current Device
                    </li>
                    <li key={"logout-all"} onClick={handleLogoutAll}>
                        Logout From All Device
                    </li>
                    <li key={"logout-except"} onClick={handleLogoutAllExceptCurrent}>
                        Logout From All Except Current
                    </li>
                </ul>
            </div>}
        </>
    )
}

export default ProfileSectionList;