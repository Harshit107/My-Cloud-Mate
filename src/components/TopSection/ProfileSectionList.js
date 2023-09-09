import classes from '../LeftSection/ProjectList.module.css'
import useServer from '../../db/useServer'
import { LOGOUT_API } from '../../config'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'

const ProfileSectionList = () => {
    const navigate = useNavigate();
    const {
        data, handleAPICall, isLoading
    } = useServer()

    function handleLogoutClick() {
        handleAPICall(LOGOUT_API, "POST")
    }

    useEffect(() => {
        if(isLoading){
            toast.info("Logging out")
        }
        if(data) {
            toast.info(data.message)
            navigate('/auth')
        }
    },[navigate,data, isLoading])


    return (
        <div className={classes['profile-section-list']}>
            <ul className={classes['ul']}>
                {/* {availableFilterOption.map((project, index) => (
                    <li key={index}
                        className={index === activeFilter ? classes['active'] : ''}
                        onClick={handleFilterOptionClicked.bind(null, index)}
                    >{project}</li>
                ))} */}
                <li key={"profile"}>
                    Profile
                </li>
               
                <li key={"logout"} onClick={handleLogoutClick}>
                    Logout
                </li>
               
            </ul>
        </div>
    )
}

export default ProfileSectionList;