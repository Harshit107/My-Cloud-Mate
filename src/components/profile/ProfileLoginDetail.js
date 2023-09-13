
import classes from './ProfileLoginDetail.module.css'
import Button from '../../Util/Button'
import useServer from '../../db/useServer'
import { useEffect, useState } from 'react'
import { LOGOUT_ALL_FROM, PROFILE_TOKEN_API } from '../../config'
import { toast } from 'react-toastify'
import { getTokenFromLocalStorage } from '../../Helper/LocalStorage'

const loginBar = {
    IP: 'Login IP',
    lastIP: 'Last Used IP',
    'Login_date': "Login Date",
    "Last_used": "Last Used Date",
    token: "1.2aa3",

}

const ProfileLoginDetail = () => {

    function getTokenDetail() {
        handleAPICall(PROFILE_TOKEN_API);
    }

    const [loginDevices, setLoginDevices] = useState([]);

    const {
        isLoading,
        error,
        handleAPICall,
        data,
        reset } = useServer();

    useEffect(() => {
        getTokenDetail()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function handleLogout(token) {
        toast.info("Logging out, Please wait...")
        handleAPICall(LOGOUT_ALL_FROM, "POST", { token })
    }

    useEffect(() => {
        if (error) {
            toast.error(error);
            reset();
        }
        if (data) {
            if (typeof data.message === 'object') {
                const loginData = data.message;
                loginData.unshift(loginBar)
                setLoginDevices(loginData)
            }
            else {
                toast.success(data.message);
                getTokenDetail()
            }
            reset();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, reset, error])



    return <div className={classes.container}>
        <div className={classes.login}>Login details</div>
        <p className={classes.loginDevice}>Total login device : {loginDevices.length - 1 === -1 ? 0 : loginDevices.length - 1}</p>
        <ul className={classes.devices} >
            {loginDevices.map((loginDetail, index) => (

                <li className={`${classes.oneDevice} ${index === 0 ? classes.bar : ''} ${loginDetail.token === getTokenFromLocalStorage() ? classes.currentUser : ''}`} key={loginDetail.token}>
                    <div>{loginDetail.IP}</div>
                    <div>{loginDetail.lastIP}</div>
                    <div>{loginDetail['Login_date']}</div>
                    <div>{loginDetail['Last_used']}</div>
                    {index !== 0 && <Button className={classes.logout} onClick={handleLogout.bind(this, loginDetail.token)} disabled={isLoading}>Logout</Button>}
                    {index === 0 && <div>Actions</div>}
                </li>
            ))}
        </ul>
    </div>

}
export default ProfileLoginDetail;