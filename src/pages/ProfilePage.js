import { useEffect } from "react";
import Profile from "../components/profile/Profile";
import { bodyOverflow } from "../Helper/htmlAddHelper";

const ProfilePage = () => {

    useEffect(() => {
        bodyOverflow();
        return () => bodyOverflow();
    },[])

    return <>
        <Profile />
    </>

}
export default ProfilePage;