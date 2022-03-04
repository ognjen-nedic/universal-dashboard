import React from 'react';
import { useState, useEffect } from 'react'

const ProfileInformation = ({ logoutHandler, currentUser }) => {
    const [profileUser, setProfileUser] = useState( )
    
    useEffect(() => {
        fetch(`http://localhost:8000/users/${currentUser.id}`)
        .then((response) => {
            if(!response.ok) {
                throw Error('Nešto nije u redu.');
            } else {
                return response.json();
            }
        })
        .then((data) => {
            setProfileUser(data);
        })
        .catch((error) => {
            console.log(error);
        })
    }, [currentUser.id]); 

  return (
      <>
    {profileUser && <div className="profile-details-container">
        <div className="profile-details">
            <img src="../icon/edit.svg" id="edit-profile-details" />
            <div className="profile-first-segment">
                {profileUser.avatar && <img src={profileUser.avatar.image_path} className="avatar_image" style={{width: 140, height: 140}}/>}

                {!profileUser.avatar && <img src="./images/profile-images/placeholder-image.jpg" alt="Placeholder Avatar Picture" className="avatar_image"/>}

                <h2>
                    {`${profileUser.first_name}
                    ${profileUser.last_name}`}
                </h2>
            </div>
            <div className="profile-information">
                <p><strong>First name: </strong> {profileUser.first_name} </p>
                <p><strong>Last name: </strong> {profileUser.last_name} </p>
                <p><strong>E-mail: </strong> {profileUser.email} </p>
                <p><strong>Role: </strong> {profileUser.role} </p>
                <p><strong>Bank account: </strong> {profileUser.tekuci_racun} </p>
                <p><strong>Status: </strong> {profileUser.status} </p>
            </div>
            <div className="profile-last-segment">
                <button class="blue-btn">Insert hours</button>
                <p><strong>This month: 120:16:45</strong></p>
                <button class="white-btn" onClick={logoutHandler}>Log out</button>
            </div>
        </div>
    </div>}
    </>
  )
}

export default ProfileInformation