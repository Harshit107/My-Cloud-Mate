import React from 'react';
import classes from './Profile.module.css';
import ProfileBasic from './ProfileBasic';
import ProfileLoginDetail from './ProfileLoginDetail';

const Profile = () => {

    
    return (
        <div className={classes.container}>
            <div className={classes.content}>
                <ProfileBasic showLoading/>
                <ProfileLoginDetail />
            </div>
            
        </div>
    );
};

export default Profile;
